import type { Metadata } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from 'next/font/google';
import { assetPath } from '@/data/foldyData';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-mono',
  display: 'swap'
});

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
    <html
      lang="es"
      className={`${bricolage.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
