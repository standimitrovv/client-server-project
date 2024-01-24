'use client';

import { LoadingSpinner } from '@/app/contact/components/LoadingSpinner';
import { useState } from 'react';
import { LoginModel } from '../api/Login';
import { useSessionContext } from '../state/UseSessionContext';

export const Login = () => {
  const { openSignUpPage, login, isProcessing, errorMessage } =
    useSessionContext();

  return (
    <div className='flex flex-col'>
      <span className='font-semibold'>Sign in</span>
      <span className='text-gray-100 text-sm mt-2'>
        Please sign in to your account
      </span>

      <div className='my-6'>
        {errorMessage && (
          <div className='bg-red-600 py-2 px-4 rounded-md'>{errorMessage}</div>
        )}
      </div>

      <LoginForm
        submitForm={login}
        isProcessing={isProcessing}
        hasError={!!errorMessage}
      />

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
  isProcessing: boolean;
  hasError: boolean;
}> = ({ submitForm, isProcessing, hasError }) => {
  const [username, setUsername] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const handleFormSubmit = () => {
    submitForm({ username, password });
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='username'>Username</label>
      <input
        className={`${
          hasError ? 'border-2 border-red-600' : ''
        } p-2 rounded-md text-black outline-none`}
        type='username'
        id='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isProcessing}
        required
      />
      <label htmlFor='password'>Password</label>
      <input
        className={`${
          hasError ? 'border-2 border-red-600' : ''
        } p-2 rounded-md text-black outline-none`}
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isProcessing}
        required
      />
      <button
        className='bg-blue-500 py-2 rounded-md mt-3 outline-none flex justify-center'
        onClick={handleFormSubmit}
        disabled={isProcessing}
      >
        {isProcessing ? <LoadingSpinner /> : 'Sign in'}
      </button>
    </form>
  );
};
