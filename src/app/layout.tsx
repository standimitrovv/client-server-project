import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PAGE_WIDTH } from './CommonStyles';
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
        className={`${inter.className} bg-gray-800 text-white text-md font-medium`}
      >
        <Navbar />

        <Divider />

        <main className={`${PAGE_WIDTH} mt-8`}>
          <CommentsProvider>{children}</CommentsProvider>
        </main>
      </body>
    </html>
  );
}
