import { ContactForm } from "./contact-form";

const CONTACT_LINKS = [
  {
    href: "mailto:contacto@mexicopcb.com",
    label: "Correo",
    value: "contacto@mexicopcb.com",
  },
  {
    href: "tel:+529995933235",
    label: "Teléfono",
    value: "+52 999 593 3235",
  },
  {
    href: "tel:+529851050432",
    label: "Teléfono alterno",
    value: "985 105 0432",
  },
  {
    href: "#top",
    label: "Dirección",
    value: (
      <>
        C. 15 No. 503, Col. Altabrisa
        <br />
        Mérida, Yucatán, México
      </>
    ),
  },
];

export function Cta() {
  return (
    <section className="cta" id="contacto">
      <svg className="traces" viewBox="0 0 760 620" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
        <path d="M760 120 H560 L500 180 H300" style={{ animationDelay: ".1s" }} />
        <path d="M760 240 H640 L580 300 H380" style={{ animationDelay: ".3s" }} />
        <path d="M760 380 H600 L540 440 H340" style={{ animationDelay: ".5s" }} />
        <circle cx="500" cy="180" r="4" />
        <circle cx="580" cy="300" r="4" style={{ animationDelay: "1.2s" }} />
        <circle cx="540" cy="440" r="4" style={{ animationDelay: ".6s" }} />
      </svg>
      <div className="wrap cta-grid">
        <div className="rv">
          <p className="eyebrow mono">Contacto</p>
          <h2>Ponte en contacto con nosotros</h2>
          <p className="cta-lead">
            Un especialista te contactará para platicar sobre tus requerimientos. Envíanos
            tus archivos o descríbenos la idea.
          </p>
        </div>
        <div className="contact rv">
          {CONTACT_LINKS.map((link) => (
            <a href={link.href} key={link.label}>
              <span>
                <span className="cl mono">{link.label}</span>
                <span className="cv">{link.value}</span>
              </span>
              <span className="arw">→</span>
            </a>
          ))}
        </div>
        <div className="rv">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
