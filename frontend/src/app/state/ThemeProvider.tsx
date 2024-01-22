import { Permanent_Marker } from 'next/font/google';
import { createContext, useEffect, useState } from 'react';

const permanentMarkerFont = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
});

const ThemeContext = createContext({});

interface Props {
  children: JSX.Element;
}

export const ThemeProvider: React.FunctionComponent<Props> = (props) => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsPageLoading(true);

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const context = {};

  return (
    <ThemeContext.Provider value={context}>
      {isPageLoading ? (
        <div
          className={`${permanentMarkerFont.className} text-5xl m-auto flex justify-center items-center w-full h-screen`}
        >
          <div className='animate-typing-cursor border-r-2 px-2 whitespace-nowrap overflow-hidden w-[430px]'>
            Stanimir Dimitrov
          </div>
        </div>
      ) : (
        props.children
      )}
    </ThemeContext.Provider>
  );
};
