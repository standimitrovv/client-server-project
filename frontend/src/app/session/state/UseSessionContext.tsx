import { useContext } from 'react';
import { SessionContext } from './SessionProvider';

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('No SessionContext nearby!');
  }

  return context;
};
