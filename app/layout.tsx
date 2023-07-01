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

export const metadata: Metadata = {
  title: 'Nextjs.13',
  description: 'Next.js13 Template',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(inter.variable, krabbyPatty.variable)}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  );
}
