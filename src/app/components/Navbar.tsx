'use client';
import { Permanent_Marker } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { PAGE_WIDTH } from '../CommonStyles';
import { useMobileMenu } from '../state/MobileMenuProvider';
import { HamburgerButton } from './HamburgerButton';
import { MobileMenu } from './MobileMenu';

const permanentMarkerFont = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
});

const links = [
  {
    href: '/gallery',
    text: 'Gallery',
  },
  {
    href: '/comments',
    text: 'Comments',
  },
  {
    href: '/contact',
    text: 'Contact',
  },
];

export const Navbar = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  const path = usePathname();

  const renderLinks = useCallback(
    (additionalStyles?: string, onClick?: () => void) =>
      links.map((l, index) => (
        <Link
          key={`${l.href}${l.text}${index}`}
          href={l.href}
          className={`${additionalStyles} ${
            path === l.href ? 'border-b' : ''
          } hover:border-b py-1`}
          onClick={onClick}
        >
          {l.text}
        </Link>
      )),
    [path]
  );

  return (
    <header className='relative'>
      <section
        className={`${PAGE_WIDTH} max-w-4xl mx-auto p-4 flex justify-between items-center`}
      >
        <Link href='/' className={`${permanentMarkerFont.className} text-lg`}>
          Stanimir Dimitrov
        </Link>

        <div>
          <HamburgerButton triggerAnimation={isMenuOpen} onClick={toggleMenu} />

          <nav className='hidden md:block space-x-8'>{renderLinks()}</nav>
        </div>
      </section>

      {isMenuOpen && (
        <MobileMenu>
          {renderLinks('w-full text-center py-6', closeMenu)}
        </MobileMenu>
      )}
    </header>
  );
};
