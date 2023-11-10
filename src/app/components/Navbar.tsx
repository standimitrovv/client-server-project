import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex justify-between py-4 xl:max-w-7xl sm:px-8 m-auto'>
      <Link href='/'>Stanimir Dimitrov</Link>

      <ul className='flex space-x-8'>
        <li>
          <Link href='/gallery'> Gallery</Link>
        </li>
        <li>
          <Link href='/comments'>Comments</Link>
        </li>
        <li>
          <Link href='/contact'>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
