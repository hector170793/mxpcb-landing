export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "#servicios", label: "Servicios" },
  { href: "#capacidades", label: "Capacidades" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export const NAV_CTA: NavLink = { href: "#contacto", label: "Cotizar proyecto" };
