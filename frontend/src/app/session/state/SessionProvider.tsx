import Cookies from 'js-cookie';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LoginModel, LoginResponse, loginRequest } from '../api/Login';
import { AuthenticationForm } from '../components/AuthenticationForm';

const IS_SIGNING_IN_DEFAULT_VALUE = true;

interface Session {
  isSigningIn: boolean;
  openSignInPage: () => void;
  openSignUpPage: () => void;
  login: (req: LoginModel) => Promise<void>;
}

export const SessionContext = createContext<Session>({
  isSigningIn: IS_SIGNING_IN_DEFAULT_VALUE,
  openSignInPage: () => {},
  openSignUpPage: () => {},
  login: async (req: LoginModel) => {},
});

interface Props {
  children: JSX.Element[];
}

export const SessionProvider: React.FunctionComponent<Props> = (props) => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(
    IS_SIGNING_IN_DEFAULT_VALUE
  );

  const [user, setUser] = useState<LoginResponse | undefined>(undefined);

  const openSignInPage = () => {
    setIsSigningIn(true);
  };

  const openSignUpPage = () => {
    setIsSigningIn(false);
  };

  const login = useCallback(async (req: LoginModel) => {
    const res = await loginRequest(req);

    if (!res.ok) {
      //TODO: display a snackbar

      return;
    }

    const loginResponse: LoginResponse = await res.json();

    setUser(loginResponse);

    Cookies.set('user', JSON.stringify(loginResponse), { expires: 1 });
  }, []);

  useEffect(() => {
    const userCookieData = Cookies.get('user');

    if (!userCookieData) {
      return;
    }

    const parsedCookieUser = JSON.parse(userCookieData) as LoginResponse;

    setUser(parsedCookieUser);
  }, []);

  const isLoggedIn = useMemo(() => user?.token, [user]);

  const context: Session = {
    isSigningIn,
    openSignInPage,
    openSignUpPage,
    login,
  };

  return (
    <SessionContext.Provider value={context}>
      {isLoggedIn ? props.children : <AuthenticationForm />}
    </SessionContext.Provider>
  );
};
