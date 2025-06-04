'use client';

import { AppContextInterface } from '@/types/appContext';
import { createContext, useContext } from 'react';

export const AppContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const useSnakberContext = () => useContext(AppContext);

export default useSnakberContext;
