'use client';
import { Permanent_Marker } from 'next/font/google';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { PAGE_WIDTH } from '../CommonStyles';
import { useMediaQuery } from '../hooks/UseMediaQuery';
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
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  const isMobile = !useMediaQuery('768');

  const renderLinks = useCallback(
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

  useEffect(() => {
    if (!isMobile && isMenuShown) {
      setIsMenuShown(false);
    }
  }, [isMenuShown, isMobile]);

  return (
    <header className='relative'>
      <section
        className={`${PAGE_WIDTH} max-w-4xl mx-auto p-4 flex justify-between items-center`}
      >
        <Link href='/' className={`${permanentMarkerFont.className} text-lg`}>
          Stanimir Dimitrov
        </Link>

        <div>
          <HamburgerButton
            triggerAnimation={isMenuShown}
            onClick={() => setIsMenuShown(!isMenuShown)}
          />

          <nav className='hidden md:block space-x-8'>{renderLinks()}</nav>
        </div>
      </section>

      {isMenuShown && isMobile && (
        <MobileMenu>
          {renderLinks('w-full text-center py-6', () => setIsMenuShown(false))}
        </MobileMenu>
      )}
    </header>
  );
};
