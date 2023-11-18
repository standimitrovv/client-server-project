'use client';

import { useNotifications } from '../hooks/UseNotifications';
import { useSendEmail } from '../hooks/UseSendEmail';
import { ContactForm } from './components/ContactForm';
import { Contact } from './models/Contact';

export default function Contact() {
  const { sendEmail } = useSendEmail();

  const { createSuccessNotification, createErrorNotification } =
    useNotifications();

  const onFormSubmit = async ({ from, message, senderEmail }: Contact) => {
    try {
      await sendEmail({ from, message, senderEmail });

      createSuccessNotification('Email successfully sent!');
    } catch (error) {
      createErrorNotification('Something went wrong with sending the email...');
    }
  };

  return (
    <section id='contact' className='max-w-3xl m-auto'>
      <ContactForm onFormSubmit={onFormSubmit} />
    </section>
  );
}
