import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import CartInitializer from '@/components/CartInitializer';
import { ThemeProvider } from '@/components/ThemeProvider'; 
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-black selection:text-white font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartInitializer />

          <Header />

          <main className="flex-1 w-full relative">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
