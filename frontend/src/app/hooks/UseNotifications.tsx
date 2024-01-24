import { ToastContainerProps, toast } from 'react-toastify';

const commonProps: ToastContainerProps = {
  position: 'bottom-left',
  autoClose: 4000,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'light',
  hideProgressBar: true,
};

const containerConfiguration: ToastContainerProps = {
  ...commonProps,
  newestOnTop: true,
  rtl: false,
};

export const useNotifications = () => {
  const createSuccessNotification = (text: string) => {
    toast.success(text, {
      ...commonProps,
    });
  };

  const createErrorNotification = (
    text: string,
    options?: ToastContainerProps
  ) => {
    toast.error(text, {
      ...commonProps,
      ...options,
    });
  };

  return {
    containerConfiguration,
    createSuccessNotification,
    createErrorNotification,
  };
};
