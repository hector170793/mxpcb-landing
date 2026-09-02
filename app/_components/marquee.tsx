const STANDARDS = [
  "IPC-A-610",
  "J-STD-001",
  "Montaje SMT",
  "Through-hole",
  "Diseño de PCB",
  "Reingeniería",
  "Proveeduría de partes",
  "Servicio exprés",
  "Mérida, Yucatán",
];

export function Marquee() {
  return (
    <div className="strip" aria-hidden="true">
      <div className="track">
        {STANDARDS.map((item) => (
          <span key={`a-${item}`}>{item}</span>
        ))}
        {STANDARDS.map((item) => (
          <span key={`b-${item}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
