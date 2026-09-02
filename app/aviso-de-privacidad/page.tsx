import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/mxpcb-logo.png";

export const metadata: Metadata = {
  title: "Aviso de privacidad — MXPCB",
};

// This page intentionally carries NO legal content. Under Mexico's LFPDPPP,
// an aviso de privacidad is a legal document; plausible-sounding filler text
// would be worse than an obvious gap. Only a visible placeholder marker and
// an honest note ship here until the client supplies real legal copy.
export default function AvisoDePrivacidadPage() {
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
      <main className="wrap legal">
        <p className="eyebrow mono">Aviso legal</p>
        <h1>Aviso de privacidad</h1>
        <p className="legal-marker">[PENDIENTE: texto legal a redactar]</p>
        <p className="legal-note">
          El aviso de privacidad conforme a la Ley Federal de Protección de
          Datos Personales en Posesión de los Particulares (LFPDPPP) está
          pendiente de redacción por el equipo legal de MXPCB. Esta página no
          contiene texto legal vigente; es un espacio reservado hasta que se
          entregue el contenido definitivo.
        </p>
        <p className="legal-contact">
          Mientras tanto, para dudas sobre el manejo de tus datos escríbenos a{" "}
          <a href="mailto:contacto@mexicopcb.com">contacto@mexicopcb.com</a>.
        </p>
      </main>
    </div>
  );
}
