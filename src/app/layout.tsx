'use client';

import { Inter } from 'next/font/google';
import { useState } from 'react';
import { PAGE_WIDTH } from './CommonStyles';
import { CommentsProvider } from './comments/state/CommentsProvider';
import { Navbar } from './components/Navbar';
import './globals.css';
import { MobileMenuProvider } from './state/MobileMenuProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <MobileMenuProvider rootState={{ isMenuOpen, setIsMenuOpen }}>
      <html lang='en'>
        <body
          className={`${
            inter.className
          } bg-gray-800 text-white text-md font-medium ${
            isMenuOpen ? 'h-screen overflow-hidden' : 'h-full'
          }`}
        >
          <Navbar />

          <main className={`${PAGE_WIDTH} mt-8`}>
            <CommentsProvider>{children}</CommentsProvider>
          </main>
        </body>
      </html>
    </MobileMenuProvider>
  );
}
