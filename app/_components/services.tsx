const BADGES = [
  { label: "IPC-A-610", detail: "Criterios de aceptabilidad de ensambles electrónicos" },
  { label: "J-STD-001", detail: "Requisitos de soldadura para ensambles" },
  { label: "SMT & THT", detail: "Montaje superficial y por inserción" },
  { label: "TRAZABILIDAD", detail: "Inspección unidad por unidad" },
];

const CARDS = [
  {
    title: "Fabricación de PCB",
    description:
      "Gestionamos la placa desnuda con las especificaciones que tu diseño necesita, de prototipo a serie.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 12l9 4 9-4" />
        <path d="M3 17l9 4 9-4" />
      </svg>
    ),
  },
  {
    title: "Diseño y desarrollo",
    description:
      "Del esquemático al gerber: ruteo multicapa y revisión DFM para que sea fabricable al primer intento.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 3v3M16 3v3M8 18v3M16 18v3M3 8h3M3 16h3M18 8h3M18 16h3" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    title: "Reingeniería de circuitos",
    description:
      "Recuperamos, documentamos y mejoramos diseños existentes cuando ya no hay archivos o el componente se descontinuó.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 11A8 8 0 1 0 12 20" />
        <path d="M20 5v6h-6" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Proveeduría de partes",
    description: "Amplia gama de proveedores de componentes para que el abasto no detenga tu producción.",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 6l1.6 12.2a2 2 0 0 0 2 1.8h10.8a2 2 0 0 0 2-1.8L21 6" />
        <path d="M9 10v6M15 10v6" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section className="sec" id="servicios" style={{ paddingTop: "clamp(20px,2vw,32px)" }}>
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow mono">Servicios</p>
          <h2>Un solo proveedor, del esquemático a la placa poblada</h2>
          <p>
            El ensamble es nuestro núcleo de negocio. Alrededor de él resolvemos fabricación,
            diseño, reingeniería y abasto de componentes para que no coordines cuatro
            proveedores distintos.
          </p>
        </div>

        <div className="feature rv">
          <div>
            <p className="eyebrow mono">Servicio principal</p>
            <h3>Ensamble de PCB</h3>
            <p>
              Montaje SMT y through-hole ejecutado bajo estándares internacionales, con
              control de calidad e inspección en cada etapa del proceso.
            </p>
            <a className="btn btn-g" href="#contacto" style={{ marginTop: 30 }}>
              Hablar de tu ensamble <span className="arw">→</span>
            </a>
          </div>
          <div className="badges">
            {BADGES.map((badge) => (
              <div className="badge" key={badge.label}>
                <b className="mono">{badge.label}</b>
                <span>{badge.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="hint mono rv">Desliza →</p>
        <div className="cards" tabIndex={0} role="group" aria-label="Servicios de fabricación y diseño">
          {CARDS.map((card) => (
            <div className="card rv" key={card.title}>
              <div className="icn">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
