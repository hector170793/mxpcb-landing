import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MXPCB — Diseño, fabricación y ensamble de PCB',
    short_name: 'MXPCB',
    description:
      'Ensamble electrónico bajo IPC-A-610 y J-STD-001. Diseño, fabricación y ensamble de PCB en Mérida, Yucatán.',
    start_url: '/',
    display: 'standalone',
    lang: 'es-MX',
    background_color: '#FAF9F7',
    theme_color: '#1B3A4B',
    icons: [
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
