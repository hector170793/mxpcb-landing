import { Traces } from "./traces";

export function Hero() {
  return (
    <section className="hero" id="top">
      <Traces />
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow mono in d1">Mérida, Yucatán · Envíos a toda la república</p>
          <h1 className="in d2">
            Soluciones en circuitos electrónicos, <span className="hl">hechas en México</span>
          </h1>
          <p className="lead in d3">
            Diseño, fabricación y ensamble de PCB en un solo proveedor. Montaje SMT y
            through-hole bajo IPC-A-610 y J-STD-001, con inspección unidad por unidad.
          </p>
          <div className="hero-cta in d4">
            <a className="btn btn-p" href="#contacto">
              Cotizar mi proyecto <span className="arw">→</span>
            </a>
            <a className="btn btn-s" href="#capacidades">
              Ver capacidades
            </a>
          </div>
          <p className="hero-note mono in d5">
            SERVICIO EXPRÉS · PROTOTIPO O PRODUCCIÓN · SOPORTE TÉCNICO
          </p>
        </div>
        <div className="spec in d6">
          <div className="spec-h">
            <b>Estándares de trabajo</b>
            <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.1em", color: "#5F6E75" }}>
              REF · 01
            </span>
          </div>
          <div className="spec-row">
            <div className="k mono">IPC-A-610</div>
            <div className="v">
              Criterios de aceptabilidad
              <span>Aplicados en cada ensamble entregado</span>
            </div>
          </div>
          <div className="spec-row">
            <div className="k mono">J-STD-001</div>
            <div className="v">
              Requisitos de soldadura
              <span>Proceso controlado, SMT y THT</span>
            </div>
          </div>
          <div className="spec-row">
            <div className="k mono">QC</div>
            <div className="v">
              Trazabilidad por unidad
              <span>Inspección en cada etapa del proceso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
