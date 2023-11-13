'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PAGE_WIDTH } from '../CommonStyles';

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
  const [isMenuShow, setIsMenuShown] = useState<boolean>(false);

  return (
    <header className='relative'>
      <section
        className={`${PAGE_WIDTH} max-w-4xl mx-auto p-4 flex justify-between items-center`}
      >
        <Link href='/'>Stanimir Dimitrov</Link>

        <div>
          <button
            id='hamburger-button'
            className={`text-3xl md:hidden cursor-pointer relative w-8 h-8  ${
              isMenuShow ? 'toggle-btn' : ''
            }`}
            onClick={() => setIsMenuShown(!isMenuShow)}
          >
            <div className='bg-white w-8 h-1 rounded absolute top-4 -mt-0.5 transition-all duration-500 before:countent-[""] before:bg-white before:w-8 before:h-1 before:rounded before:absolute before:-translate-x-4 before:-translate-y-3 before:transition-all before:duration-500 after:countent-[""] after:bg-white after:w-8 after:h-1 after:rounded after:absolute after:transition-all after:duration-500 after:-translate-x-4 after:translate-y-3' />
          </button>

          <nav className='hidden md:block space-x-8 text-xl'>
            {links.map((l, index) => (
              <Link
                key={`${l.href}${l.text}${index}`}
                href={l.href}
                className='hover:opacity-90'
              >
                {l.text}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <section
        id='mobile-menu'
        className={`absolute top-68 bg-black w-full text-5xl ${
          isMenuShow ? 'flex' : 'hidden'
        } flex-col justify-center origin-top animate-open-menu section-min-height overflow-hidden`}
      >
        <nav className='flex flex-col items-center py-8' area-label='mobile'>
          {links.map((l, index) => (
            <Link
              key={`${l.href}${l.text}${index}`}
              href={l.href}
              className='w-full text-center py-6 hover:opacity-90'
              onClick={() => setIsMenuShown(false)}
            >
              {l.text}
            </Link>
          ))}
        </nav>
      </section>
    </header>
  );
};
