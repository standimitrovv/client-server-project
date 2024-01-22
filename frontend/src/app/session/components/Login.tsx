'use client';

import { LoadingSpinner } from '@/app/contact/components/LoadingSpinner';
import { useState } from 'react';
import { LoginModel } from '../api/Login';
import { useSessionContext } from '../state/UseSessionContext';

export const Login = () => {
  const { openSignUpPage, login } = useSessionContext();

  return (
    <div className='flex flex-col'>
      <span className='font-semibold'>Sign in</span>
      <span className='text-gray-100 text-sm mt-2 mb-6'>
        Please sign in to your account
      </span>

      <LoginForm submitForm={login} />

      <span
        className='mt-8 text-blue-400 cursor-pointer'
        onClick={openSignUpPage}
      >
        Need an account?
      </span>
    </div>
  );
};

const LoginForm: React.FunctionComponent<{
  submitForm: (formData: LoginModel) => Promise<void>;
}> = ({ submitForm }) => {
  const [username, setUsername] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitForm({ username, password });
    } catch (err) {
      // TODO: handle the error
    }
    setIsSubmitting(false);
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='username'>Username</label>
      <input
        className='p-2 rounded-md text-black outline-none'
        type='username'
        id='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isSubmitting}
      />
      <label htmlFor='password'>Password</label>
      <input
        className='p-2 rounded-md text-black outline-none'
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isSubmitting}
      />
      <button
        className='bg-blue-500 py-2 rounded-md mt-3 outline-none flex justify-center'
        onClick={handleFormSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingSpinner /> : 'Sign in'}
      </button>
    </form>
  );
};
