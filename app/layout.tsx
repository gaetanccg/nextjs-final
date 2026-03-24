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
        <header className="bg-dark px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="DEV"
              width={80}
              height={21}
              className="invert brightness-0 invert"
            />
          </Link>
          <Link href="/profil">
            <Image
              src="/icons/account.svg"
              alt="Profil"
              width={28}
              height={28}
              className="invert"
            />
          </Link>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
