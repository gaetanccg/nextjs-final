import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DEV - Offres d\'emploi',
  description: 'Plateforme de gestion d\'offres d\'emploi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header>
          <div className="bg-dark px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="DEV"
                width={80}
                height={21}
                className="brightness-0 invert"
              />
            </Link>
            <Link href="/profil" className="flex items-center gap-3">
              <Image
                src="/icons/account.svg"
                alt="Profil"
                width={28}
                height={28}
                className="invert"
              />
            </Link>
          </div>
          <div className="h-1 bg-primary" />
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
