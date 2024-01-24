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

const DEFAULT_STATE_VALUES = {
  USER: undefined,
  IS_SIGNING_IN: true,
  IS_PROCESSING: false,
  ERROR_MESSAGE: '',
};

const NOTIFICATION_MESSAGES = {
  SIGN_IN_FAIL: 'Something went wrong with signing you in',
  SIGN_UP_FAIL: 'Something went wrong with signing you up',
  SIGN_UP_SUCCESS: 'Sign up completed successfully! Please, sign in now.',
};

interface Session {
  user?: User;
  isSigningIn: boolean;
  isProcessing: boolean;
  errorMessage: string;
  openSignInPage: () => void;
  openSignUpPage: () => void;
  login: (req: LoginModel) => Promise<void>;
  register: (req: RegisterModel) => Promise<void>;
}

export const SessionContext = createContext<Session>({
  user: DEFAULT_STATE_VALUES.USER,
  isSigningIn: DEFAULT_STATE_VALUES.IS_SIGNING_IN,
  isProcessing: DEFAULT_STATE_VALUES.IS_PROCESSING,
  errorMessage: DEFAULT_STATE_VALUES.ERROR_MESSAGE,
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
    DEFAULT_STATE_VALUES.IS_SIGNING_IN
  );

  const [user, setUser] = useState<LoginResponse | undefined>(
    DEFAULT_STATE_VALUES.USER
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(
    DEFAULT_STATE_VALUES.IS_PROCESSING
  );

  const [errorMessage, setErrorMessage] = useState<string>(
    DEFAULT_STATE_VALUES.ERROR_MESSAGE
  );

  const { createErrorNotification, createSuccessNotification } =
    useNotifications();

  const openSignInPage = () => {
    setIsSigningIn(true);
    defaultProcessingAndErrorStates();
  };

  const openSignUpPage = () => {
    setIsSigningIn(false);
    defaultProcessingAndErrorStates();
  };

  const defaultProcessingAndErrorStates = () => {
    setIsProcessing(DEFAULT_STATE_VALUES.IS_PROCESSING);
    setErrorMessage(DEFAULT_STATE_VALUES.ERROR_MESSAGE);
  };

  const login = useCallback(async (req: LoginModel) => {
    setIsProcessing(true);
    try {
      const res = await loginRequest(req);

      if (!res.token) {
        setErrorMessage('Invalid username or password');

        return;
      }

      setUser(res);

      Cookies.set('user', JSON.stringify(res), { expires: 1 });
    } catch (err) {
      createErrorNotification(NOTIFICATION_MESSAGES.SIGN_IN_FAIL, {
        autoClose: false,
      });
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const register = useCallback(async (req: RegisterModel) => {
    setIsProcessing(true);
    try {
      const res = await registerRequest(req);

      if (!res.ok) {
        const result = await res.json();

        if (result) {
          if (result.errors) {
            setErrorMessage(Object.values(result.errors)[0] as string);
          } else {
            setErrorMessage(Object.values(result)[0] as string);
          }
        }

        return;
      }

      createSuccessNotification(NOTIFICATION_MESSAGES.SIGN_UP_SUCCESS);

      openSignInPage();
    } catch (err) {
      createErrorNotification(NOTIFICATION_MESSAGES.SIGN_UP_FAIL, {
        autoClose: false,
      });
    } finally {
      setIsProcessing(false);
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
    isProcessing,
    errorMessage,
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
