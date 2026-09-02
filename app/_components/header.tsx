import Image from "next/image";
import logo from "../../public/brand/mxpcb-logo.png";
import { NAV_CTA, NAV_LINKS } from "../_data/nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="hdr">
      <div className="wrap">
        <a href="#top">
          {/* Explicit display size so next/image serves a ~165w variant instead of
           the 1024w intrinsic. It is the LCP element; the source renders at 23px
           tall, so shipping the full-size asset was pure waste. */}
          <Image className="brand" src={logo} alt="MXPCB" width={165} height={23} priority />
        </a>
        <nav className="nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a
            className="btn btn-p"
            href={NAV_CTA.href}
            style={{ padding: "12px 20px", fontSize: 14 }}
          >
            {NAV_CTA.label}
          </a>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
