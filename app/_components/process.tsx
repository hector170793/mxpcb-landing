type Step = { title: string; description: string };

const TRACK_A: Step[] = [
  { title: "Envías tus archivos", description: "Gerbers, BOM y pick & place. Los revisamos tal como llegan." },
  {
    title: "Revisión DFM",
    description:
      "Te señalamos lo que puede complicar la fabricación o el ensamble antes de gastar en material.",
  },
  { title: "Cotización y confirmación", description: "Alcance, tiempos y costo por escrito. Nada arranca sin tu visto bueno." },
  { title: "Ensamble e inspección", description: "Montaje bajo J-STD-001 e inspección bajo IPC-A-610, unidad por unidad." },
  { title: "Entrega", description: "Placas pobladas, probadas electrónicamente y documentadas." },
];

const TRACK_B: Step[] = [
  {
    title: "Sesión de requerimientos",
    description: "Qué debe hacer el producto, en qué entorno opera y a qué volumen apuntas.",
  },
  { title: "Esquemático y selección", description: "Diseñamos el circuito y elegimos componentes disponibles, no solo los ideales." },
  { title: "Ruteo y DFM", description: "Layout multicapa revisado para fabricación y ensamble desde el primer intento." },
  { title: "Fabricación y ensamble", description: "Placa desnuda y montaje bajo los mismos estándares de la ruta A." },
  { title: "Prototipo validado", description: "Entrega con documentación lista para escalar a producción." },
];

function TrackColumn({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: Step[] }) {
  return (
    <div className="track-col rv">
      <p className="eyebrow mono">{eyebrow}</p>
      <h3>{title}</h3>
      {steps.map((step, index) => (
        <div className="step" key={step.title}>
          <div className="num mono">{index + 1}</div>
          <div>
            <b>{step.title}</b>
            <p>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Process() {
  return (
    <section className="sec" id="proceso" style={{ background: "#FFFFFF", borderTop: "1px solid #E4E0DA", borderBottom: "1px solid #E4E0DA" }}>
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow mono">Proceso</p>
          <h2>Dos caminos, según dónde estés</h2>
          <p>
            Ya tengas un diseño listo o apenas una idea en papel, el punto de entrada cambia
            pero la entrega es la misma: una placa que funciona.
          </p>
        </div>
        <div className="tracks">
          <TrackColumn eyebrow="Ruta A" title="Ya tienes el diseño" steps={TRACK_A} />
          <TrackColumn eyebrow="Ruta B" title="Empezamos desde cero" steps={TRACK_B} />
        </div>
      </div>
    </section>
  );
}
