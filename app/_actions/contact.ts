"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

// Server Functions are reachable via direct POST requests, not just through
// the rendered form (node_modules/next/dist/docs/01-app/01-getting-started/
// 07-mutating-data.md, WARNING under "What are Server Functions?"). Every
// check below — field shape, consent, Turnstile, env — runs in this file,
// never in the client component. The client-side `required`/`type="email"`
// attributes on ContactForm are a UX convenience only.

export type ContactFieldName =
  | "nombre"
  | "empresa"
  | "correo"
  | "comentarios"
  | "consent"
  | "turnstile"
  | "attachment";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactFieldName, string>>;
    };

// A file carrying the top-level 'use server' directive may only export async
// functions at runtime -- verified by testing, not documented in
// 07-mutating-data.md. Type-only exports above are erased at compile time and
// are fine; a runtime value export (e.g. a plain initial-state object) is
// not and breaks the build with "A 'use server' file can only export async
// functions, found object." ContactForm defines its own idle initial state.

// Kept free of the phone/email text on purpose: ContactForm renders those as
// real mailto:/tel: links next to this message whenever fieldErrors is
// absent, instead of unclickable text baked into the string.
const FALLBACK_MESSAGE =
  "No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Vercel caps server-side Server Action request bodies at 4.5MB regardless
// of Next's own `serverActions.bodySizeLimit` (verified, plugins/cache/
// claude-plugins-official/vercel/0.43.0/skills/next-forge/references/
// packages.md:148). This 4MB figure is the enforced, user-facing cap --
// it leaves headroom under Vercel's hard ceiling for the other form fields
// and multipart overhead. Do not raise it without also revisiting the
// Vercel limit.
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

// Extension and MIME type are both attacker-controlled (a direct POST can
// set either to anything). They are cheap first filters, not proof of
// content; the magic-byte check below is the actual content verification.
const ALLOWED_ZIP_MIME_TYPES = new Set([
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream",
]);

function readString(value: FormDataEntryValue | null): string {
  // A malicious or malformed direct POST can send a file part for any field
  // name; FormData.get() then returns a File instead of a string. Treat
  // anything that isn't a plain string as empty rather than letting it
  // through validation as some Object-coerced value.
  return typeof value === "string" ? value.trim() : "";
}

// A real ZIP file starts with the local-file-header signature `PK\x03\x04`,
// or `PK\x05\x06` for an empty archive (end-of-central-directory record with
// no entries). Checking these bytes is the only check in this file that
// verifies actual file content rather than attacker-supplied metadata.
function hasZipMagicBytes(bytes: Buffer): boolean {
  if (bytes.length < 4) return false;
  const isStandardZip =
    bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
  const isEmptyZip =
    bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x05 && bytes[3] === 0x06;
  return isStandardZip || isEmptyZip;
}

type AttachmentValidation =
  | { ok: true; file: { filename: string; buffer: Buffer; contentType: string } | null }
  | { ok: false; error: string };

// The attachment is optional: an untouched `<input type="file">` submits as
// an empty File (size 0, name ""), which must pass through as "no file",
// not an error.
async function readAttachment(
  entry: FormDataEntryValue | null,
): Promise<AttachmentValidation> {
  if (entry === null) return { ok: true, file: null };

  if (!(entry instanceof File)) {
    // A direct POST bypassing the UI can send a plain string under this
    // field name instead of a real file part.
    return { ok: false, error: "El archivo adjunto no es válido." };
  }

  // An untouched `<input type="file">` still submits a File entry. Verified
  // live (not documented anywhere): through Next's Server Action dispatch
  // this empty File arrives server-side with size 0 but name "blob" and
  // type "application/octet-stream" -- NOT name "" like a plain HTML form
  // POST would give. Checking size alone is correct either way: a genuine
  // 0-byte upload can never be a valid non-empty ZIP entry, so there is no
  // legitimate case this excludes.
  if (entry.size === 0) {
    return { ok: true, file: null };
  }

  if (entry.size > MAX_ATTACHMENT_BYTES) {
    return { ok: false, error: "El archivo no debe superar 4 MB." };
  }

  if (!entry.name.toLowerCase().endsWith(".zip")) {
    return { ok: false, error: "El archivo debe ser un .zip." };
  }

  if (!ALLOWED_ZIP_MIME_TYPES.has(entry.type)) {
    return { ok: false, error: "El archivo debe ser un .zip." };
  }

  const buffer = Buffer.from(await entry.arrayBuffer());
  if (!hasZipMagicBytes(buffer)) {
    return {
      ok: false,
      error: "El archivo parece dañado o no es un ZIP válido.",
    };
  }

  return {
    ok: true,
    file: { filename: entry.name, buffer, contentType: "application/zip" },
  };
}

async function verifyTurnstileToken(
  token: string,
  secret: string,
  remoteIp: string | undefined,
): Promise<boolean> {
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!verifyResponse.ok) {
      console.error(
        "[contact] Turnstile siteverify returned a non-OK status",
        verifyResponse.status,
      );
      return false;
    }

    const result = (await verifyResponse.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!result.success) {
      // Covers missing, malformed, expired, and already-used tokens alike --
      // Cloudflare reports a reused token as "timeout-or-duplicate".
      console.error(
        "[contact] Turnstile rejected the token",
        result["error-codes"],
      );
    }

    return result.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verification request failed", err);
    return false;
  }
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const nombre = readString(formData.get("nombre"));
  const empresa = readString(formData.get("empresa"));
  const correo = readString(formData.get("correo"));
  const comentarios = readString(formData.get("comentarios"));
  const consent = readString(formData.get("consent"));
  const turnstileToken = readString(formData.get("cf-turnstile-response"));
  const attachmentResult = await readAttachment(formData.get("attachment"));

  const fieldErrors: Partial<Record<ContactFieldName, string>> = {};

  if (nombre.length < 2 || nombre.length > 80) {
    fieldErrors.nombre = "Escribe tu nombre completo (2 a 80 caracteres).";
  }
  // Optional: an empty value is valid. Only a value that is present and
  // over-long is an error -- a direct POST can still send an unbounded string.
  if (empresa.length > 120) {
    fieldErrors.empresa = "El nombre de la empresa no debe superar 120 caracteres.";
  }
  if (correo.length === 0 || correo.length > 120 || !EMAIL_RE.test(correo)) {
    fieldErrors.correo = "Escribe un correo electrónico válido.";
  }
  if (comentarios.length < 10 || comentarios.length > 2000) {
    fieldErrors.comentarios =
      "Cuéntanos brevemente tu requerimiento (10 a 2000 caracteres).";
  }
  if (consent !== "on") {
    fieldErrors.consent =
      "Debes aceptar el aviso de privacidad para continuar.";
  }
  if (!attachmentResult.ok) {
    fieldErrors.attachment = attachmentResult.error;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Revisa los campos marcados antes de enviar el formulario.",
      fieldErrors,
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!resendApiKey || !fromEmail || !toEmail || !turnstileSecret) {
    // Never log the values themselves -- only which ones are missing.
    console.error("[contact] Missing required server configuration", {
      hasResendApiKey: Boolean(resendApiKey),
      hasFromEmail: Boolean(fromEmail),
      hasToEmail: Boolean(toEmail),
      hasTurnstileSecret: Boolean(turnstileSecret),
    });
    return { status: "error", message: FALLBACK_MESSAGE };
  }

  const forwardedFor = (await headers()).get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();

  const isHuman = await verifyTurnstileToken(
    turnstileToken,
    turnstileSecret,
    remoteIp,
  );

  if (!isHuman) {
    return {
      status: "error",
      message:
        "No pudimos verificar la comprobación de seguridad. Vuelve a intentarlo.",
      fieldErrors: {
        turnstile: "Completa la verificación de seguridad para continuar.",
      },
    };
  }

  // At this point fieldErrors is empty, so attachmentResult.ok is guaranteed
  // true (an attachment error above would already have returned).
  const attachmentFile = attachmentResult.ok ? attachmentResult.file : null;

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: correo,
      subject: `Nuevo contacto desde mexicopcb.com — ${nombre}`,
      text: [
        `Nombre: ${nombre}`,
        empresa ? `Empresa: ${empresa}` : null,
        `Correo: ${correo}`,
        "",
        "Comentarios:",
        comentarios,
      ]
        .filter((line) => line !== null)
        .join("\n"),
      // resend@6.x `Attachment` (node_modules/resend/dist/index.d.mts):
      // `content?: string | Buffer`, `filename?: string`, `contentType?`.
      // contentType is set explicitly to the verified type rather than
      // trusting the browser-supplied MIME the validation above already
      // treated as untrusted.
      ...(attachmentFile
        ? {
            attachments: [
              {
                filename: attachmentFile.filename,
                content: attachmentFile.buffer,
                contentType: attachmentFile.contentType,
              },
            ],
          }
        : {}),
    });

    if (error) {
      console.error("[contact] Resend rejected the message", error);
      return { status: "error", message: FALLBACK_MESSAGE };
    }
  } catch (err) {
    console.error("[contact] Unexpected error sending the message", err);
    return { status: "error", message: FALLBACK_MESSAGE };
  }

  return { status: "success" };
}
