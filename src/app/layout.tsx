import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'J Fox Ink | Precision Vinyl, Raw Custom Graphics & Digital Fabrication',
  description:
    'High-octane creative workshop & commercial atelier specializing in precision vinyl decals, custom apparel printing, rapid 3D digital fabrication, and vector brand identity.',
  keywords: [
    'J Fox Ink',
    'Precision Vinyl',
    'Commercial Decals',
    'Custom Apparel',
    '3D Fabrication',
    'Vector Graphics',
    'Brand Identity',
    'Screenprint',
    'Fleet Lettering',
  ],
  authors: [{ name: 'Josh Fox' }],
  creator: 'J Fox Ink',
  publisher: 'J Fox Ink',
  metadataBase: new URL('https://jfox.ink'),
  openGraph: {
    title: 'J Fox Ink | Precision Vinyl & Digital Fabrication',
    description:
      'High-octane creative workshop & commercial atelier for precision vinyl decals, apparel printing, rapid 3D fabrication, and vector art.',
    url: 'https://jfox.ink',
    siteName: 'J Fox Ink',
    images: [
      {
        url: '/images/hero_workshop_art_1790801737897.jpg',
        width: 1200,
        height: 675,
        alt: 'J Fox Ink Workshop & Digital Fabrication',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J Fox Ink | Precision Vinyl & Digital Fabrication',
    description:
      'High-octane creative workshop & commercial atelier for precision vinyl decals, custom apparel, and rapid 3D fabrication.',
    images: ['/images/hero_workshop_art_1790801737897.jpg'],
    creator: '@jfoxink',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#070A0F" />
      </head>
      <body className="min-h-screen bg-[#070A0F] font-sans text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
