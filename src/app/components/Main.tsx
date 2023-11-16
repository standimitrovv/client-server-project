'use client';

import { Inter } from 'next/font/google';
import { PAGE_WIDTH } from '../CommonStyles';
import { CommentsProvider } from '../comments/state/CommentsProvider';
import { useMobileMenu } from '../state/MobileMenuProvider';
import { Divider } from './Divider';
import { Navbar } from './Navbar';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
}

export const Main: React.FunctionComponent<Props> = ({ children }) => {
  const { isMenuOpen } = useMobileMenu();

  return (
    <section
      className={` bg-gray-800 text-white text-md font-medium ${
        isMenuOpen ? 'h-screen overflow-hidden' : ''
      }`}
    >
      <Navbar />

      <Divider />

      <main className={`${PAGE_WIDTH} mt-8`}>
        <CommentsProvider>{children}</CommentsProvider>
      </main>
    </section>
  );
};
