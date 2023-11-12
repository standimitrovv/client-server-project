import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CommentsProvider } from './comments/state/CommentsProvider';
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
      <body
        className={`${inter.className} background text-white text-lg font-medium`}
      >
        <Navbar />

        <Divider />

        <main className='max-w-6xl m-auto sm:px-8 xs:px-8'>
          <CommentsProvider>{children}</CommentsProvider>
        </main>
      </body>
    </html>
  );
}
