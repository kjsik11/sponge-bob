import '@/styles/global.css';

import { Inter } from '@next/font/google';
import clsx from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const krabbyPatty = localFont({
  src: [
    {
      path: './fonts/KrabbyPatty.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-krabbyPatty',
});

const spongeBoy = localFont({
  src: [
    {
      path: './fonts/SpongeBoy.otf',
      style: 'normal',
    },
  ],
  variable: '--font-spongeBoy',
});

const someTimeLater = localFont({
  src: [
    {
      path: './fonts/SomeTimeLater.otf',
      style: 'normal',
    },
  ],
  variable: '--font-someTimeLater',
});

export const metadata: Metadata = {
  title: 'Nextjs.13',
  description: 'Next.js13 Template',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(
        inter.variable,
        krabbyPatty.variable,
        someTimeLater.variable,
        spongeBoy.variable,
      )}
    >
      <head />
      <body>{children}</body>
    </html>
  );
}
