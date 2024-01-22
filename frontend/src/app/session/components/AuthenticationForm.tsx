import { useSessionContext } from '../state/UseSessionContext';
import { Login } from './Login';
import { Register } from './Register';

export const AuthenticationForm = () => {
  const { isSigningIn } = useSessionContext();

  return (
    <div className='max-w-xl m-auto h-screen flex flex-col justify-center items-center'>
      <div className='h-fit p-10 md:p-16 border rounded-md w-full'>
        {isSigningIn ? <Login /> : <Register />}
      </div>
    </div>
  );
};
