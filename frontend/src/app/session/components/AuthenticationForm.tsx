import { useSessionContext } from '../state/UseSessionContext';
import { Login } from './Login';
import { Register } from './Register';

export const AuthenticationForm = () => {
  const { isSigningIn } = useSessionContext();

  return (
    <div className='max-w-xl m-auto p-16 border rounded-md'>
      {isSigningIn ? <Login /> : <Register />}
    </div>
  );
};
