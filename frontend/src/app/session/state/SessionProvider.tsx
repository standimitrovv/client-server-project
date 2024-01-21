import { createContext, useState } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';

const IS_SIGNING_IN_DEFAULT_VALUE = true;

interface Session {
  isSigningIn: boolean;
  openSignInPage: () => void;
  openSignUpPage: () => void;
}

export const SessionContext = createContext<Session>({
  isSigningIn: IS_SIGNING_IN_DEFAULT_VALUE,
  openSignInPage: () => {},
  openSignUpPage: () => {},
});

interface Props {
  children: JSX.Element[];
}

export const SessionProvider: React.FunctionComponent<Props> = (props) => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(
    IS_SIGNING_IN_DEFAULT_VALUE
  );

  const openSignInPage = () => {
    setIsSigningIn(true);
  };

  const openSignUpPage = () => {
    setIsSigningIn(false);
  };

  const isLoggedIn = false;

  const context: Session = {
    isSigningIn,
    openSignInPage,
    openSignUpPage,
  };

  return (
    <SessionContext.Provider value={context}>
      {isLoggedIn ? props.children : <AuthenticationForm />}
    </SessionContext.Provider>
  );
};
