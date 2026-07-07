import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MEGASTORE | Everything You Need',
  description:
    'Premium marketplace for electronics, apparel, home essentials, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white flex flex-col text-black selection:bg-black selection:text-white">
        {/* Шапка теперь сквозная для всего сайта */}
        <Header />

        {/* flex-1 заставит контент занимать все свободное место, прижимая футер к низу */}
        <div className="flex-1">{children}</div>

        {/* Подвал тоже всегда на месте */}
        <Footer />
      </body>
    </html>
  );
}
