"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import Script from "next/script";
import {
  submitContact,
  type ContactState,
  type ContactFieldName,
} from "../_actions/contact";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const INITIAL_STATE: ContactState = { status: "idle" };

// UX convenience only -- mirrors the server's real limit
// (app/_actions/contact.ts, MAX_ATTACHMENT_BYTES) so the user sees a
// same-shape message before submitting, but the server enforces it
// regardless of what runs here.
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const FALLBACK_CHANNELS = (
  <>
    Escríbenos a{" "}
    <a href="mailto:contacto@mexicopcb.com">contacto@mexicopcb.com</a> o
    llámanos al <a href="tel:+529995933235">+52 999 593 3235</a>.
  </>
);

// Takes ContactFieldName rather than a local copy of the union: the literal
// list here had already drifted from the action's, so adding a field failed
// the type check instead of just working.
function fieldError(state: ContactState, name: ContactFieldName) {
  return state.status === "error" ? state.fieldErrors?.[name] : undefined;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    INITIAL_STATE,
  );

  const formTitleId = useId();
  const attachmentHintId = useId();
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Turnstile pulls ~550KB (api.js plus the challenge document and its XHRs) --
  // more than the rest of the page combined. The form sits at the very bottom,
  // so loading it eagerly spends a mobile visitor's bandwidth on a widget most
  // of them never reach, delaying fonts and the LCP image on a saturated
  // connection. Arm it when the card approaches the viewport, or as soon as
  // anything inside it receives focus, so a keyboard user tabbing straight
  // down is not left waiting.
  const [turnstileArmed, setTurnstileArmed] = useState(false);

  useEffect(() => {
    if (turnstileArmed) return;
    const card = cardRef.current;
    if (!card) return;

    const arm = () => setTurnstileArmed(true);
    card.addEventListener("focusin", arm, { once: true });

    if (typeof IntersectionObserver === "undefined") {
      // No observer: load immediately rather than leave the widget missing.
      arm();
      return () => card.removeEventListener("focusin", arm);
    }

    // 600px of lead time: the script is fetching while the visitor is still
    // reading the section above, so it is ready by the time they type.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          arm();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(card);

    return () => {
      observer.disconnect();
      card.removeEventListener("focusin", arm);
    };
  }, [turnstileArmed]);

  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number } | null>(
    null,
  );
  const [clientAttachmentWarning, setClientAttachmentWarning] = useState<string | null>(
    null,
  );

  const nombreError = fieldError(state, "nombre");
  const empresaError = fieldError(state, "empresa");
  const correoError = fieldError(state, "correo");
  const comentariosError = fieldError(state, "comentarios");
  const consentError = state.status === "error" ? state.fieldErrors?.consent : undefined;
  const turnstileError = state.status === "error" ? state.fieldErrors?.turnstile : undefined;
  const serverAttachmentError =
    state.status === "error" ? state.fieldErrors?.attachment : undefined;
  const attachmentError = serverAttachmentError ?? clientAttachmentWarning ?? undefined;

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setClientAttachmentWarning(null);
      return;
    }

    setSelectedFile({ name: file.name, size: file.size });

    if (file.size > MAX_ATTACHMENT_BYTES) {
      setClientAttachmentWarning("El archivo no debe superar 4 MB.");
    } else if (!file.name.toLowerCase().endsWith(".zip")) {
      setClientAttachmentWarning("El archivo debe ser un .zip.");
    } else {
      setClientAttachmentWarning(null);
    }
  }

  function clearAttachment() {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedFile(null);
    setClientAttachmentWarning(null);
  }

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") errorRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="contact-form" role="status">
        <p className="eyebrow mono">Enviado</p>
        <h3 tabIndex={-1} ref={successRef}>
          Gracias, recibimos tu mensaje
        </h3>
        <p className="form-lead">
          Un especialista revisará tu solicitud y te contactará a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-form" ref={cardRef}>
      {TURNSTILE_SITE_KEY && turnstileArmed ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      ) : null}
      <p className="eyebrow mono" id={formTitleId}>
        Escríbenos
      </p>
      <h3>Cuéntanos sobre tu proyecto</h3>

      {state.status === "error" ? (
        <div className="form-alert" role="alert" tabIndex={-1} ref={errorRef}>
          <p>{state.message}</p>
          {!state.fieldErrors ? <p>{FALLBACK_CHANNELS}</p> : null}
        </div>
      ) : null}

      <form action={formAction} aria-labelledby={formTitleId} noValidate>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            aria-invalid={nombreError ? "true" : undefined}
            aria-describedby={nombreError ? "nombre-error" : undefined}
          />
          {nombreError ? (
            <p className="field-error" id="nombre-error">
              {nombreError}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="empresa">
            Empresa <span className="label-optional">(opcional)</span>
          </label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            maxLength={120}
            aria-invalid={empresaError ? "true" : undefined}
            aria-describedby={empresaError ? "empresa-error" : undefined}
          />
          {empresaError ? (
            <p className="field-error" id="empresa-error">
              {empresaError}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            name="correo"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            aria-invalid={correoError ? "true" : undefined}
            aria-describedby={correoError ? "correo-error" : undefined}
          />
          {correoError ? (
            <p className="field-error" id="correo-error">
              {correoError}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="comentarios">Comentarios</label>
          <textarea
            id="comentarios"
            name="comentarios"
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            aria-invalid={comentariosError ? "true" : undefined}
            aria-describedby={comentariosError ? "comentarios-error" : undefined}
          />
          {comentariosError ? (
            <p className="field-error" id="comentarios-error">
              {comentariosError}
            </p>
          ) : null}
        </div>

        <div className="field field-file">
          <label htmlFor="attachment-trigger">Archivo adjunto (opcional)</label>
          <div className="file-picker">
            {/* The real <input type="file"> stays in the DOM for form
                submission but is not part of the tab order or the a11y
                tree: `attachment-trigger` below is the single focusable,
                keyboard-operable control for this field, matching how the
                other fields expose exactly one interactive element each. */}
            <input
              ref={fileInputRef}
              id="attachment"
              name="attachment"
              type="file"
              accept=".zip"
              className="file-input"
              tabIndex={-1}
              aria-hidden="true"
              onChange={handleAttachmentChange}
            />
            <button
              type="button"
              id="attachment-trigger"
              className="btn btn-s file-picker-btn"
              onClick={() => fileInputRef.current?.click()}
              aria-describedby={
                attachmentError
                  ? `${attachmentHintId} attachment-error`
                  : attachmentHintId
              }
            >
              Elegir archivo
            </button>
            <span className="file-status">
              {selectedFile
                ? `${selectedFile.name} · ${formatFileSize(selectedFile.size)}`
                : "Sin archivo seleccionado"}
            </span>
            {selectedFile ? (
              <button
                type="button"
                className="file-clear"
                onClick={clearAttachment}
                aria-label="Quitar archivo adjunto"
              >
                ✕
              </button>
            ) : null}
          </div>
          <p id={attachmentHintId} className="field-hint">
            Gerbers, BOM o Pick&amp;Place en un .zip de hasta 4 MB.
          </p>
          {attachmentError ? (
            <p className="field-error" id="attachment-error">
              {attachmentError}
            </p>
          ) : null}
        </div>

        <div className="field field-consent">
          <label>
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={consentError ? "true" : undefined}
              aria-describedby={consentError ? "consent-error" : undefined}
            />
            <span>
              Acepto el{" "}
              <a href="/aviso-de-privacidad">aviso de privacidad</a>
            </span>
          </label>
          {consentError ? (
            <p className="field-error" id="consent-error">
              {consentError}
            </p>
          ) : null}
        </div>

        {TURNSTILE_SITE_KEY ? (
          <div className="field">
            <div
              className="cf-turnstile"
              data-sitekey={TURNSTILE_SITE_KEY}
              aria-describedby={turnstileError ? "turnstile-error" : undefined}
            />
            {turnstileError ? (
              <p className="field-error" id="turnstile-error">
                {turnstileError}
              </p>
            ) : null}
          </div>
        ) : null}

        <button type="submit" className="btn btn-p" disabled={pending}>
          {pending ? "Enviando…" : "Enviar mensaje"}
          <span className="arw">→</span>
        </button>
      </form>
    </div>
  );
}
