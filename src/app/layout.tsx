import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://maral-qyz-uzatu.vercel.app';

export const metadata: Metadata = {
  title: 'Марал | Қыз ұзату',
  description: 'Маралдың қыз ұзату тойына арналған шақыру сайты. 5 қараша 2026 ж. Aisha мейрамханасы.',
  applicationName: 'Марал Қыз ұзату',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Марал | Қыз ұзату',
    description: 'Маралдың қыз ұзату тойына арналған шақыру сайты. 5 қараша 2026 ж. Aisha мейрамханасы.',
    type: 'website',
    locale: 'kk_KZ',
    siteName: 'Марал Қыз ұзату',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Марал | Қыз ұзату',
    description: 'Маралдың қыз ұзату тойына арналған шақыру сайты. 5 қараша 2026 ж.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#faf6f0',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Literata:ital,wght@0,400;0,500;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,700&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/media/photos/maral-11.jpg" />
        <link rel="preload" as="image" href="/media/photos/maral-2.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
