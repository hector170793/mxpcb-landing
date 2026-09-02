"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NAV_CTA, NAV_LINKS } from "../_data/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`burger${open ? " on" : ""}`}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          stroke="#1B3A4B"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path className="l1" d="M1 1h18" />
          <path className="l2" d="M1 7h18" />
          <path className="l3" d="M1 13h18" />
        </svg>
      </button>
      <div
        id={drawerId}
        ref={drawerRef}
        className={`drawer ${open ? "open" : "closed"}`}
        inert={!open}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label} <span className="arw">→</span>
          </a>
        ))}
        <div className="cta-row">
          <a className="btn btn-p" href={NAV_CTA.href} onClick={() => setOpen(false)}>
            {NAV_CTA.label}
          </a>
        </div>
      </div>
    </>
  );
}
