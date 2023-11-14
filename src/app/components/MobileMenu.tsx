'use client';

interface Props {
  children: React.ReactNode;
}

export const MobileMenu: React.FunctionComponent<Props> = (props) => {
  return (
    <section
      id='mobile-menu'
      className={`absolute top-68 bg-black w-full text-5xl flex flex-col justify-center origin-top animate-open-menu section-min-height overflow-hidden`}
    >
      <nav className='flex flex-col items-center py-8' area-label='mobile'>
        {props.children}
      </nav>
    </section>
  );
};
