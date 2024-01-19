'use client';
import { Permanent_Marker } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PAGE_WIDTH } from '../CommonStyles';
import { useMobileMenu } from '../state/MobileMenuProvider';
import { HamburgerButton } from './HamburgerButton';
import { MobileMenu } from './MobileMenu';

const permanentMarkerFont = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
});

export const Navbar = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  const path = usePathname();

  return (
    <header className='relative border-b'>
      <section
        id='desktop-menu'
        className={`${PAGE_WIDTH} max-w-4xl mx-auto p-4 flex justify-between items-center`}
      >
        <Link href='/' className={`${permanentMarkerFont.className} text-lg`}>
          Stanimir Dimitrov
        </Link>

        <div>
          <HamburgerButton triggerAnimation={isMenuOpen} onClick={toggleMenu} />

          <nav className='hidden md:block space-x-8'>
            {renderLinks({
              path,
              additionalStyles: 'hover:border-b',
              itemSelectedStyles: 'border-b',
            })}
          </nav>
        </div>
      </section>

      {isMenuOpen && (
        <MobileMenu>
          {renderLinks({
            additionalStyles: 'w-full text-center py-6',
            onClick: closeMenu,
          })}
        </MobileMenu>
      )}
    </header>
  );
};

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

type Deps = {
  path?: string;
  additionalStyles?: string;
  itemSelectedStyles?: string;
  onClick?: () => void;
};

const renderLinks = ({
  path,
  additionalStyles,
  itemSelectedStyles,
  onClick,
}: Deps) =>
  links.map((l, index) => (
    <Link
      key={`${l.href}${l.text}${index}`}
      href={l.href}
      className={`${additionalStyles} ${
        path === l.href ? itemSelectedStyles : ''
      } py-1`}
      onClick={onClick}
    >
      {l.text}
    </Link>
  ));
