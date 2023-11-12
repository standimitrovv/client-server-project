import Link from 'next/link';

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
  return (
    <nav className='flex justify-between py-4 max-w-6xl sm:px-8 xs:px-8 m-auto'>
      <Link href='/'>Stanimir Dimitrov</Link>

      <ul className='flex space-x-8'>
        {links.map((l, index) => (
          <li key={`${l.href}${l.text}${index}`}>
            <Link href={l.href}>{l.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
