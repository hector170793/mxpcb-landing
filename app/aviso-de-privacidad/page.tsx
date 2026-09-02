import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/brand/mxpcb-logo.png";

const title = "Aviso de Privacidad — MXPCB";
const description =
  "Aviso de privacidad de MXPCB conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP): datos que recabamos, finalidades, transferencias, derechos ARCO y uso de cookies de Google Ads y Google Analytics.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/aviso-de-privacidad",
  },
  openGraph: {
    title,
    description,
    url: "/aviso-de-privacidad",
    type: "website",
    // The root `app/opengraph-image.tsx` file convention only generates
    // og:image tags for the segment it's defined in (the site root).
    // This page defines its own `openGraph` object, which replaces --
    // rather than merges with -- the parent's resolved openGraph fields
    // (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/
    // generate-metadata.md, section "Overwriting fields"), so the shared
    // image is referenced explicitly here to keep it on this page too.
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

// Legal text below is carried verbatim from the client-supplied source
// (aviso-privacidad.html) under the LFPDPPP. Only markup and styling were
// adapted to the site's design system -- no clause was reworded, reordered,
// shortened, or translated.
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
        <h1>Aviso de Privacidad</h1>
        <p className="legal-lead">
          Integral, conforme a la Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares
        </p>

        <div className="legal-meta">
          <p>
            <span className="legal-meta-k">Responsable del tratamiento</span>
            DISEÑO Y DESARROLLO DE PROYECTOS ELECTRÓNICOS, S.A.P.I. DE C.V.
            (en lo sucesivo, “MXPCB”), con domicilio en Mérida, Yucatán,
            México.
          </p>
          <p>
            <span className="legal-meta-k">Correo de contacto</span>
            <a href="mailto:contacto@mexicopcb.com">contacto@mexicopcb.com</a>
          </p>
          <p>
            <span className="legal-meta-k">Teléfono</span>
            <a href="tel:+529995933235">+52 999 593 3235</a>
          </p>
        </div>

        <div className="legal-copy">
          <h2>1. Identidad y domicilio del responsable</h2>
          <p>
            DISEÑO Y DESARROLLO DE PROYECTOS ELECTRÓNICOS, S.A.P.I. DE C.V.,
            con nombre comercial MXPCB y domicilio en Mérida, Yucatán,
            México, es responsable del uso, tratamiento y protección de los
            datos personales que usted proporcione, en términos de la Ley
            Federal de Protección de Datos Personales en Posesión de los
            Particulares (la “Ley”), su Reglamento y demás normativa
            aplicable.
          </p>

          <h2>2. Datos personales que se recaban</h2>
          <p>
            Para las finalidades descritas en este aviso, MXPCB puede
            recabar los siguientes datos personales cuando usted nos
            contacta de forma voluntaria a través del formulario de
            contacto de este sitio, de nuestro correo electrónico o de
            nuestro número telefónico:
          </p>
          <ul>
            <li>Nombre completo.</li>
            <li>Datos de contacto: correo electrónico y número telefónico.</li>
            <li>
              Nombre de la empresa o razón social que representa (en su
              caso).
            </li>
            <li>
              Información relacionada con el proyecto, servicio o
              cotización que solicita.
            </li>
            <li>
              Archivos que usted decida adjuntar de forma voluntaria en el
              formulario de contacto (por ejemplo, archivos Gerber, listas
              de materiales o documentación técnica del proyecto), en
              formato .zip y con un tamaño máximo de 4 MB.
            </li>
          </ul>
          <p>
            MXPCB <strong>no recaba datos personales sensibles</strong> a
            través de este sitio.
          </p>
          <p>
            Los archivos que usted adjunte pueden contener información
            técnica o comercial confidencial, propia o de sus clientes.
            MXPCB los trata con carácter confidencial, los utiliza
            únicamente para atender y cotizar la solicitud correspondiente,
            y no los divulga a terceros distintos de los encargados
            señalados en la sección 4, salvo que exista una obligación
            legal.
          </p>
          <p>
            Adicionalmente, cuando usted navega en este sitio se recaban de
            forma automática ciertos datos a través de cookies y
            tecnologías similares de Google (ver la sección 7): dirección
            IP, identificadores de dispositivo y de navegador, páginas
            visitadas e información sobre su interacción con el sitio y con
            nuestros anuncios.
          </p>

          <h2>3. Finalidades del tratamiento</h2>
          <p>
            <strong>Finalidades primarias</strong> (necesarias para la
            relación con usted):
          </p>
          <ul>
            <li>
              Atender sus solicitudes de información, contacto, cotización
              o soporte.
            </li>
            <li>
              Elaborar propuestas comerciales y dar seguimiento a proyectos
              de diseño de PCB, ensamble electrónico y desarrollo de
              hardware/firmware.
            </li>
            <li>
              Establecer, mantener y dar cumplimiento a la relación
              comercial que, en su caso, se genere.
            </li>
          </ul>
          <p>
            <strong>Finalidades secundarias</strong> (no necesarias,
            requieren su consentimiento):
          </p>
          <ul>
            <li>
              Envío de información sobre servicios, novedades o
              comunicaciones de tipo comercial.
            </li>
          </ul>
          <p>
            Si no desea que sus datos se traten para las finalidades
            secundarias, puede manifestarlo enviando un correo a{" "}
            <a href="mailto:contacto@mexicopcb.com">
              contacto@mexicopcb.com
            </a>
            . Su negativa no será motivo para negarle los servicios que
            solicite.
          </p>

          <h2>4. Transferencia de datos</h2>
          <p>
            MXPCB no transfiere sus datos personales a terceros sin su
            consentimiento, salvo en los casos previstos en el artículo 22
            de la Ley (por ejemplo, cuando la transferencia sea necesaria
            para el cumplimiento de una obligación legal o requerida por
            autoridad competente). En caso de recurrir a proveedores que
            traten datos por cuenta de MXPCB (encargados), estos quedan
            obligados a guardar confidencialidad conforme a la normativa
            aplicable.
          </p>
          <p>
            Para el envío y la protección del formulario de contacto, MXPCB
            recurre a los siguientes encargados, que tratan datos por
            cuenta de MXPCB conforme a sus propias políticas de privacidad:
          </p>
          <ul>
            <li>
              <strong>Cloudflare, Inc.</strong> — servicio Turnstile,
              utilizado para verificar que el formulario sea enviado por
              una persona y no por un sistema automatizado. Trata la
              dirección IP y señales técnicas del navegador.
            </li>
            <li>
              <strong>Resend</strong> — servicio de entrega de correo
              electrónico, mediante el cual se transmite a MXPCB el
              contenido del formulario, incluidos los archivos que usted
              adjunte.
            </li>
          </ul>
          <p>
            Para las finalidades de medición y publicidad descritas en la
            sección 7, los datos recabados automáticamente son tratados por
            Google LLC como proveedor de los servicios de Google Ads y
            Google Analytics, conforme a sus propias políticas de
            privacidad, disponibles en{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </a>
            .
          </p>

          <h2>5. Medios para ejercer los derechos ARCO</h2>
          <p>
            Usted tiene derecho a Acceder a sus datos personales,
            Rectificarlos cuando sean inexactos, Cancelarlos cuando
            considere que no se requieren para alguna de las finalidades
            señaladas, así como a Oponerse a su tratamiento para fines
            específicos (derechos ARCO).
          </p>
          <p>
            Para ejercer cualquiera de estos derechos, envíe una solicitud
            al correo{" "}
            <a href="mailto:contacto@mexicopcb.com">
              contacto@mexicopcb.com
            </a>
            , indicando su nombre completo, medio para recibir respuesta, y
            una descripción clara de los datos y del derecho que desea
            ejercer. MXPCB dará respuesta en los plazos establecidos por la
            Ley.
          </p>

          <h2>6. Revocación del consentimiento</h2>
          <p>
            Usted puede revocar en cualquier momento el consentimiento que,
            en su caso, nos haya otorgado para el tratamiento de sus datos
            personales, enviando su solicitud al correo antes indicado. Es
            posible que, por obligaciones legales, MXPCB deba seguir
            tratando ciertos datos aun después de la revocación.
          </p>

          <h2>7. Cookies, Google Ads y Google Analytics</h2>
          <p>
            Este sitio utiliza cookies y tecnologías similares
            proporcionadas por Google para medir el rendimiento de nuestra
            publicidad y analizar el uso del sitio, mediante los servicios{" "}
            <strong>Google Ads</strong> y <strong>Google Analytics</strong>.
          </p>
          <p>
            Terceros proveedores, incluido Google, utilizan cookies e
            identificadores para mostrar y medir anuncios con base en las
            visitas previas del usuario a este u otros sitios de internet.
            El uso de cookies de publicidad por parte de Google le permite,
            a él y a sus socios, servir anuncios a los usuarios según
            dichas visitas. A través de estas herramientas se pueden
            recabar datos como la dirección IP, identificadores de
            dispositivo y navegador, páginas visitadas, tiempo de
            navegación e interacción con los anuncios.
          </p>
          <p>
            MXPCB{" "}
            <strong>
              no comparte con Google datos de identificación personal
            </strong>{" "}
            (como nombre o correo electrónico) a través de estas etiquetas
            de medición; dichos datos se recaban únicamente cuando usted
            nos contacta de forma voluntaria, conforme a las secciones
            anteriores.
          </p>
          <p>
            Usted puede desactivar o administrar la publicidad
            personalizada y el uso de estas cookies mediante las siguientes
            opciones:
          </p>
          <ul>
            <li>
              Configuración de anuncios de Google:{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                adssettings.google.com
              </a>
            </li>
            <li>
              Cómo usa Google la información de sitios o apps que utilizan
              sus servicios:{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/technologies/partner-sites
              </a>
            </li>
            <li>
              Complemento del navegador para inhabilitar Google Analytics:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                tools.google.com/dlpage/gaoptout
              </a>
            </li>
            <li>
              Opciones de terceros para publicidad basada en intereses:{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutads.info
              </a>
            </li>
          </ul>
          <p>
            Adicionalmente, el servicio Turnstile de Cloudflare instala
            cookies de carácter estrictamente funcional (
            <code>__cf_bm</code> y <code>_cfuvid</code>) cuyo único fin es
            distinguir solicitudes legítimas de tráfico automatizado y
            proteger el formulario de contacto. Estas cookies{" "}
            <strong>no se utilizan con fines publicitarios ni de
            perfilado</strong>.
          </p>
          <p>
            Asimismo, la mayoría de los navegadores permiten bloquear o
            eliminar cookies desde su configuración. La desactivación de
            cookies no impide el uso del sitio, aunque puede afectar
            algunas funciones.
          </p>

          <h2>8. Cambios al aviso de privacidad</h2>
          <p>
            El presente aviso de privacidad puede sufrir modificaciones
            derivadas de cambios legales, de nuestras prácticas o del
            sitio. Cualquier actualización será puesta a su disposición a
            través de esta misma página.
          </p>
        </div>

        <p className="legal-footer">
          Última actualización: 2 de septiembre de 2026.
          <br />
          Autoridad en materia de protección de datos: Secretaría
          Anticorrupción y Buen Gobierno.
        </p>
        <p className="legal-copyright">
          © 2026 MXPCB —{" "}
          <a href="https://mexicopcb.com">mexicopcb.com</a>
        </p>
      </main>
    </div>
  );
}
