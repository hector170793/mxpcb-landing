import { StatCounter } from "./stat-counter";

const STATS = [
  { value: 350, suffix: "+", label: "Clientes" },
  { value: 99, suffix: "%", label: "Tasa de satisfacción" },
  { value: 5, suffix: "+", label: "Años en el negocio" },
  { value: 2000, suffix: "", label: "Pedidos anuales" },
];

const CLIENT_LOGOS = [
  { src: "/clients/pemex.webp", alt: "Pemex", width: 301, height: 170 },
  { src: "/clients/tenaris.webp", alt: "Tenaris", width: 331, height: 112 },
  { src: "/clients/megger.webp", alt: "Megger", width: 383, height: 106 },
  { src: "/clients/chamberlain.webp", alt: "Chamberlain Group", width: 344, height: 98 },
  { src: "/clients/weidmann.webp", alt: "Weidmann", width: 247, height: 62 },
  { src: "/clients/usi.webp", alt: "USI", width: 239, height: 122 },
  { src: "/clients/biossmann.webp", alt: "Biossmann", width: 357, height: 62 },
];

export function Proof() {
  return (
    <section className="proof">
      <div className="wrap">
        <div className="stats rv">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="fig">
                <StatCounter value={stat.value} />
                {stat.suffix ? <i>{stat.suffix}</i> : null}
              </div>
              <div className="lb mono">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="logos-h rv">
          <span className="mono">Confían en nosotros</span>
          <i />
        </div>
        <div className="logos rv">
          {CLIENT_LOGOS.map((logo) => (
            <div key={logo.alt}>
              {/* eslint-disable-next-line @next/next/no-img-element -- 2-6KB
                  fixed-height WebP logos; next/image would add a resize
                  request for files already smaller than its output. */}
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
