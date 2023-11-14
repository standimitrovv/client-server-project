'use client';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { PAGE_WIDTH } from '../CommonStyles';
import { useMediaQuery } from '../hooks/UseMediaQuery';
import { HamburgerButton } from './HamburgerButton';
import { MobileMenu } from './MobileMenu';

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
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  const isMobile = !useMediaQuery('768');

  const pages = useCallback(
    (additionalStyles?: string, onClick?: () => void) =>
      links.map((l, index) => (
        <Link
          key={`${l.href}${l.text}${index}`}
          href={l.href}
          className={`${additionalStyles} hover:opacity-90`}
          onClick={onClick}
        >
          {l.text}
        </Link>
      )),
    []
  );

  return (
    <header className='relative'>
      <section
        className={`${PAGE_WIDTH} max-w-4xl mx-auto p-4 flex justify-between items-center`}
      >
        <Link href='/'>Stanimir Dimitrov</Link>

        <div>
          <HamburgerButton
            triggerAnimation={isMenuShown}
            onClick={() => setIsMenuShown(!isMenuShown)}
          />

          <nav className='hidden md:block space-x-8 text-xl'>{pages()}</nav>
        </div>
      </section>

      {isMenuShown && isMobile && (
        <MobileMenu>
          {pages('w-full text-center py-6', () => setIsMenuShown(false))}
        </MobileMenu>
      )}
    </header>
  );
};
