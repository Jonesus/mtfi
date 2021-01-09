import { CommonData, LanguageCode } from 'api/types';
import { createContext, useContext } from 'react';

type AppContext = {
  language: LanguageCode;
  commonData: CommonData;
};

const context = createContext({} as AppContext);

export const AppContextProvider = context.Provider;

export const useAppContext = () => useContext(context);
