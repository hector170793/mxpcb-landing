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
  | "correo"
  | "comentarios"
  | "consent"
  | "turnstile";

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

function readString(value: FormDataEntryValue | null): string {
  // A malicious or malformed direct POST can send a file part for any field
  // name; FormData.get() then returns a File instead of a string. Treat
  // anything that isn't a plain string as empty rather than letting it
  // through validation as some Object-coerced value.
  return typeof value === "string" ? value.trim() : "";
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
  const correo = readString(formData.get("correo"));
  const comentarios = readString(formData.get("comentarios"));
  const consent = readString(formData.get("consent"));
  const turnstileToken = readString(formData.get("cf-turnstile-response"));

  const fieldErrors: Partial<Record<ContactFieldName, string>> = {};

  if (nombre.length < 2 || nombre.length > 80) {
    fieldErrors.nombre = "Escribe tu nombre completo (2 a 80 caracteres).";
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

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: correo,
      subject: `Nuevo contacto desde mexicopcb.com — ${nombre}`,
      text: `Nombre: ${nombre}\nCorreo: ${correo}\n\nComentarios:\n${comentarios}`,
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
