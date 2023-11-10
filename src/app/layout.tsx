import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Divider } from './components/Divider';
import { Navbar } from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} background text-white text-lg`}>
        <Navbar />

        <Divider />

        <main className='xl:max-w-7xl m-auto'>{children}</main>
      </body>
    </html>
  );
}
