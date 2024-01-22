import { useNotifications } from '@/app/hooks/UseNotifications';
import Cookies from 'js-cookie';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LoginModel, LoginResponse, loginRequest } from '../api/Login';
import { RegisterModel, registerRequest } from '../api/Register';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { User } from '../models/User';

const IS_SIGNING_IN_DEFAULT_VALUE = true;

const DEFAULT_SIGN_IN_FAIL_TEXT = 'Something went wrong with signing you in';

const DEFAULT_SIGN_UP_FAIL_TEXT = 'Something went wrong with signing you up';

interface Session {
  user?: User;
  isSigningIn: boolean;
  openSignInPage: () => void;
  openSignUpPage: () => void;
  login: (req: LoginModel) => Promise<void>;
  register: (req: RegisterModel) => Promise<void>;
}

export const SessionContext = createContext<Session>({
  user: undefined,
  isSigningIn: IS_SIGNING_IN_DEFAULT_VALUE,
  openSignInPage: () => {},
  openSignUpPage: () => {},
  login: async (req: LoginModel) => {},
  register: async (req: RegisterModel) => {},
});

interface Props {
  children: JSX.Element[];
}

export const SessionProvider: React.FunctionComponent<Props> = (props) => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(
    IS_SIGNING_IN_DEFAULT_VALUE
  );

  const [user, setUser] = useState<LoginResponse | undefined>(undefined);

  const { createErrorNotification, createSuccessNotification } =
    useNotifications();

  const openSignInPage = () => {
    setIsSigningIn(true);
  };

  const openSignUpPage = () => {
    setIsSigningIn(false);
  };

  const login = useCallback(async (req: LoginModel) => {
    try {
      const res = await loginRequest(req);

      if (!res.ok) {
        createErrorNotification(DEFAULT_SIGN_IN_FAIL_TEXT);

        return;
      }

      const loginResponse: LoginResponse = await res.json();

      setUser(loginResponse);

      Cookies.set('user', JSON.stringify(loginResponse), { expires: 1 });
    } catch (err) {
      createErrorNotification(DEFAULT_SIGN_IN_FAIL_TEXT);
    }
  }, []);

  const register = useCallback(async (req: RegisterModel) => {
    try {
      const res = await registerRequest(req);

      if (res.statusCode < 200 || res.statusCode > 226) {
        createErrorNotification(DEFAULT_SIGN_UP_FAIL_TEXT);

        return;
      }

      if (res.result) {
        createSuccessNotification(
          'Sign up completed successfully! Please, sign in now.'
        );

        setIsSigningIn(true);
      }
    } catch (err) {
      createErrorNotification(DEFAULT_SIGN_UP_FAIL_TEXT);
    }
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
    user: user?.user,
    isSigningIn,
    openSignInPage,
    openSignUpPage,
    login,
    register,
  };

  return (
    <SessionContext.Provider value={context}>
      {isLoggedIn ? props.children : <AuthenticationForm />}
    </SessionContext.Provider>
  );
};
