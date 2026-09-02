const WHY_ITEMS = [
  {
    title: "Servicio exprés",
    description: "Envío a toda la república, con tiempos que puedes comprometer con tu propio cliente.",
  },
  {
    title: "Calidad garantizada",
    description: "Cada placa se prueba electrónicamente antes de salir. Comprobado por cientos de clientes.",
  },
  {
    title: "Soporte técnico profesional",
    description: "Hablas con ingenieros que entienden tu circuito, no con un mostrador de pedidos.",
  },
  {
    title: "Abasto sin cuellos de botella",
    description: "Amplia gama de proveedores de componentes para sostener la producción.",
  },
];

export function Why() {
  return (
    <section className="why">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow mono">Por qué elegirnos</p>
          <h2>Lo que un proveedor de electrónica debería darte</h2>
        </div>
        <div className="why-grid rv">
          {WHY_ITEMS.map((item) => (
            <div className="why-item" key={item.title}>
              <b>{item.title}</b>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
