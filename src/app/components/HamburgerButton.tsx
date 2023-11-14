interface Props {
  triggerAnimation: boolean;
  onClick: () => void;
}

export const HamburgerButton: React.FunctionComponent<Props> = (props) => {
  return (
    <button
      id='hamburger-button'
      className={`text-3xl md:hidden cursor-pointer relative w-8 h-8  ${
        props.triggerAnimation ? 'toggle-btn' : ''
      }`}
      onClick={props.onClick}
    >
      <div className='bg-white w-8 h-1 rounded absolute top-4 -mt-0.5 transition-all duration-500 before:countent-[""] before:bg-white before:w-8 before:h-1 before:rounded before:absolute before:-translate-x-4 before:-translate-y-3 before:transition-all before:duration-500 after:countent-[""] after:bg-white after:w-8 after:h-1 after:rounded after:absolute after:transition-all after:duration-500 after:-translate-x-4 after:translate-y-3' />
    </button>
  );
};
