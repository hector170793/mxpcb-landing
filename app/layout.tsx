import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mexicopcb.com"),
  title: "MXPCB — Soluciones en circuitos electrónicos, hechas en México",
  description:
    "Diseño, fabricación y ensamble de PCB en un solo proveedor. Montaje SMT y through-hole bajo IPC-A-610 y J-STD-001, con inspección unidad por unidad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
