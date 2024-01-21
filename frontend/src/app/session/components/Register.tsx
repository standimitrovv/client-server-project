import { useState } from 'react';
import { useSessionContext } from '../state/UseSessionContext';

export const Register = () => {
  const { openSignInPage } = useSessionContext();

  return (
    <div className='flex flex-col'>
      <span className='font-semibold'>Sign up</span>
      <span className='text-gray-100 text-sm mt-2 mb-6'>
        Please create your account
      </span>

      <RegisterForm submitForm={() => {}} />

      <span
        className='mt-8 text-blue-400 cursor-pointer'
        onClick={openSignInPage}
      >
        Already a user?
      </span>
    </div>
  );
};

const RegisterForm: React.FunctionComponent<{
  submitForm: () => void;
}> = ({ submitForm }) => {
  const [username, setUsername] = useState<string>('');

  const [email, setEmail] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  return (
    <form className='flex flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='username'>Username</label>
      <input
        className='p-2 rounded-md text-black outline-none'
        type='username'
        id='username'
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor='email'>E-mail</label>
      <input
        className='p-2 rounded-md text-black outline-none'
        type='email'
        id='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor='password'>Password</label>
      <input
        className='p-2 rounded-md text-black outline-none'
        type='password'
        id='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className='bg-blue-500 py-2 rounded-md mt-3 outline-none'
        onClick={submitForm}
      >
        Sign up
      </button>
    </form>
  );
};