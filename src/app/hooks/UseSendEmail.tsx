import emailjs from '@emailjs/browser';

interface FormValues {
  from: string;
  senderEmail: string;
  message: string;
}

export const useSendEmail = () => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';

  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';

  const apiKey = process.env.NEXT_PUBLIC_EMAILJS_API_KEY || '';

  const sendEmail = async (formValues: Record<keyof FormValues, string>) =>
    emailjs.send(serviceId, templateId, formValues, apiKey);

  return { sendEmail };
};
