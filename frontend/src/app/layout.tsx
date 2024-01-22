'use client';

import { Inter } from 'next/font/google';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PAGE_WIDTH } from './CommonStyles';
import { CommentsProvider } from './comments/state/CommentsProvider';
import { Navbar } from './components/Navbar';
import './globals.css';
import { useNotifications } from './hooks/UseNotifications';
import { SessionProvider } from './session/state/SessionProvider';
import { MobileMenuProvider } from './state/MobileMenuProvider';
import { ThemeProvider } from './state/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { containerConfiguration } = useNotifications();

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
          <ThemeProvider>
            <SessionProvider>
              <Navbar />

              <main className={`${PAGE_WIDTH} mt-8`}>
                <CommentsProvider>{children}</CommentsProvider>
              </main>
            </SessionProvider>
          </ThemeProvider>
        </body>

        <ToastContainer {...containerConfiguration} />
      </html>
    </MobileMenuProvider>
  );
}
