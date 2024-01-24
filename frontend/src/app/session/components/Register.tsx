'use client';

import { LoadingSpinner } from '@/app/contact/components/LoadingSpinner';
import { useState } from 'react';
import { RegisterModel } from '../api/Register';
import { useSessionContext } from '../state/UseSessionContext';

export const Register = () => {
  const { openSignInPage, register, isProcessing, errorMessage } =
    useSessionContext();

  return (
    <div className='flex flex-col'>
      <span className='font-semibold'>Sign up</span>
      <span className='text-gray-100 text-sm mt-2 mb-6'>
        Create your account
      </span>

      <div className='my-6'>
        {errorMessage && (
          <div className='bg-red-600 py-2 px-4 rounded-md'>{errorMessage}</div>
        )}
      </div>

      <RegisterForm
        submitForm={register}
        isProcessing={isProcessing}
        hasError={!!errorMessage}
      />

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
  submitForm: (formData: RegisterModel) => Promise<void>;
  isProcessing: boolean;
  hasError: boolean;
}> = ({ submitForm, isProcessing, hasError }) => {
  const [username, setUsername] = useState<string>('');

  const [email, setEmail] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const handleFormSubmit = () => {
    submitForm({ username, password, email });
  };

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
        disabled={isProcessing}
      />

      <label htmlFor='email'>E-mail</label>
      <input
        className='p-2 rounded-md text-black outline-none'
        type='email'
        id='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isProcessing}
      />

      <label htmlFor='password'>Password</label>
      <input
        className='p-2 rounded-md text-black outline-none'
        type='password'
        id='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isProcessing}
      />
      <button
        className='bg-blue-500 py-2 rounded-md mt-3 outline-none flex justify-center'
        onClick={handleFormSubmit}
        disabled={isProcessing}
      >
        {isProcessing ? <LoadingSpinner /> : 'Sign up'}
      </button>
    </form>
  );
};
