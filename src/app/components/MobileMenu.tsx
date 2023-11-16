'use client';

interface Props {
  children: React.ReactNode;
}

export const MobileMenu: React.FunctionComponent<Props> = (props) => {
  return (
    <section
      id='mobile-menu'
      className='absolute bg-black w-full text-5xl origin-top animate-open-menu flex flex-col justify-center mobile-menu-height'
    >
      <nav className='flex flex-col items-center' area-label='mobile'>
        {props.children}
      </nav>
    </section>
  );
};
