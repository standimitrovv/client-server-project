'use client';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMediaQuery } from '../hooks/UseMediaQuery';

interface Context {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const MobileMenuContext = createContext<Context>({
  isMenuOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
});

export const useMobileMenu = () => {
  if (!MobileMenuContext) {
    throw new Error('No Mobile Menu context found nearby!');
  }

  return useContext(MobileMenuContext);
};

interface Props {
  children: React.ReactNode;
  rootState: {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export const MobileMenuProvider: React.FunctionComponent<Props> = ({
  children,
  rootState,
}) => {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(rootState.isMenuOpen);

  const isMobile = !useMediaQuery('768');

  const isMenuOpen = isMenuShown && isMobile;

  const toggleMenu = useCallback(() => {
    setIsMenuShown((prevState) => !prevState);
    rootState.setIsMenuOpen(!rootState.isMenuOpen);
  }, [rootState]);

  const closeMenu = useCallback(() => {
    setIsMenuShown(false);
    rootState.setIsMenuOpen(false);
  }, [rootState]);

  useEffect(() => {
    if (!isMobile && isMenuShown) {
      closeMenu();
    }
  }, [closeMenu, isMenuShown, isMobile]);

  const value = {
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
    </MobileMenuContext.Provider>
  );
};
