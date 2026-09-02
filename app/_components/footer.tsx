import Image from "next/image";
import logo from "../../public/brand/mxpcb-logo.png";
import { NAV_LINKS } from "../_data/nav";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div>
            <span className="ftr-logo">
              <Image src={logo} alt="MXPCB" />
            </span>
            <p style={{ marginTop: 18, maxWidth: "38ch", fontSize: 14.5, lineHeight: 1.6 }}>
              Diseño, fabricación y ensamble de PCB bajo estándares internacionales.
              <br />
              C. 15 No. 503, Col. Altabrisa, Mérida, Yucatán, México.
            </p>
          </div>
          <nav className="ftr-nav">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href="https://mexicopcb.com">mexicopcb.com</a>
          </nav>
        </div>
        <div className="ftr-bot">
          <span>© 2026 MXPCB — México PCB. Todos los derechos reservados.</span>
          <span className="mono" style={{ letterSpacing: "0.1em" }}>
            IPC-A-610 · J-STD-001
          </span>
        </div>
      </div>
    </footer>
  );
}
