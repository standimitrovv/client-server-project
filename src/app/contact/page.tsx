'use client';

import { useNotifications } from '../hooks/UseNotifications';
import { useSendEmail } from '../hooks/UseSendEmail';
import { ContactForm } from './components/ContactForm';

export default function Contact() {
  const { sendEmail } = useSendEmail();

  const { createSuccessNotification, createErrorNotification } =
    useNotifications();

  const onFormSubmit = async (
    from: string,
    message: string,
    senderEmail: string
  ) => {
    try {
      await sendEmail({ from, message, senderEmail });

      createSuccessNotification('Email successfully sent!');
    } catch (error) {
      createErrorNotification('Something went wrong with sending the email...');
    }
  };

  return (
    <section className='max-w-3xl m-auto'>
      <ContactForm onFormSubmit={onFormSubmit} />
    </section>
  );
}
