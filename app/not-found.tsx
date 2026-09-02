import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/brand/mxpcb-logo.png";

// See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md
// Next.js automatically injects <meta name="robots" content="noindex"> for
// pages that return a 404 status, so no explicit robots metadata is needed
// here.
export const metadata: Metadata = {
  title: "Página no encontrada — MXPCB",
  description: "La página que buscas no existe o fue movida.",
};

export default function NotFound() {
  return (
    <div className="page">
      <header className="hdr">
        <div className="wrap legal-hdr">
          <Link href="/">
            <Image className="brand" src={logo} alt="MXPCB" priority />
          </Link>
          <Link href="/" className="legal-back">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="wrap not-found">
        <p className="eyebrow mono">Error 404</p>
        <h1>Esta página no existe</h1>
        <p className="lead">
          Puede que el enlace esté roto o que la página se haya movido.
          Vuelve al inicio o escríbenos directamente para cotizar tu
          proyecto de PCB.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-p">
            Volver al inicio <span className="arw">→</span>
          </Link>
          <Link href="/#contacto" className="btn btn-s">
            Contactar a MXPCB
          </Link>
        </div>
      </main>
    </div>
  );
}
