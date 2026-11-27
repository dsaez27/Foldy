import type { Metadata } from 'next';
import { assetPath } from '@/data/foldyData';
import './globals.css';

export const metadata: Metadata = {
  title: 'Foldy v4.2.5 — Carpetas inteligentes y Bóveda de Prompts para tus IAs',
  description:
    'Organiza Gemini, ChatGPT, Claude, DeepSeek, OpenCode y Antigravity CLI con carpetas inteligentes, Bóveda de Prompts {{var}}, 10 estilos visuales, candados, exportación Markdown y sincronización foldy1:.',
  icons: {
    icon: assetPath('/foldy-icon.svg')
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=JetBrains+Mono:wght@400;600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
