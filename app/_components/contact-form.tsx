"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import Script from "next/script";
import { submitContact, type ContactState } from "../_actions/contact";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const INITIAL_STATE: ContactState = { status: "idle" };

const FALLBACK_CHANNELS = (
  <>
    Escríbenos a{" "}
    <a href="mailto:contacto@mexicopcb.com">contacto@mexicopcb.com</a> o
    llámanos al <a href="tel:+529995933235">+52 999 593 3235</a>.
  </>
);

function fieldError(state: ContactState, name: "nombre" | "correo" | "comentarios") {
  return state.status === "error" ? state.fieldErrors?.[name] : undefined;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    INITIAL_STATE,
  );

  const formTitleId = useId();
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const nombreError = fieldError(state, "nombre");
  const correoError = fieldError(state, "correo");
  const comentariosError = fieldError(state, "comentarios");
  const consentError = state.status === "error" ? state.fieldErrors?.consent : undefined;
  const turnstileError = state.status === "error" ? state.fieldErrors?.turnstile : undefined;

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
        <p>
          Un especialista revisará tu solicitud y te contactará a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <div className="contact-form">
      {TURNSTILE_SITE_KEY ? (
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
