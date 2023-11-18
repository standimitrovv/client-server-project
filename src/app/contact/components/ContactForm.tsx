'use client';

import { useState } from 'react';
import { Contact } from '../models/Contact';

interface Props {
  onFormSubmit: (contact: Contact) => void;
}

export const ContactForm: React.FunctionComponent<Props> = ({
  onFormSubmit,
}) => {
  const [fullName, setFullName] = useState<string>('');

  const [email, setEmail] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  const isSubmitButtonDisabled =
    !fullName ||
    !email ||
    !!email.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$') === false ||
    !message ||
    !!message.match('^\\s+$');

  const resetFormFields = () => {
    setFullName('');

    setEmail('');

    setMessage('');
  };

  const handleFormSubmit = () => {
    onFormSubmit({ from: fullName, message, senderEmail: email });

    resetFormFields();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className='flex flex-col'>
      <label htmlFor='name' className='mb-2'>
        Full Name
      </label>
      <input
        id='name'
        name='name'
        type='text'
        required
        placeholder='What is your name?'
        className='mb-6 rounded-md text-black p-2'
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <label htmlFor='email' className='mb-2'>
        E-mail
      </label>
      <input
        id='email'
        name='email'
        type='email'
        required
        placeholder='What is your email?'
        className='mb-6 rounded-md text-black p-2'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor='message' className='mb-2'>
        Message
      </label>
      <textarea
        required
        name='message'
        id='message'
        placeholder='What do you want to tell/ask me?'
        rows={4}
        cols={20}
        className='rounded-md mb-6 text-black p-2'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type='submit'
        disabled={isSubmitButtonDisabled}
        onClick={handleFormSubmit}
        className={`border rounded-md py-2 ${
          isSubmitButtonDisabled ? 'bg-gray-400 text-black' : 'bg-green-400'
        }`}
      >
        Send
      </button>
    </form>
  );
};
