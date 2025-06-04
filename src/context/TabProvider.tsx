'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabType {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<TabType | undefined>(undefined);

// Create a provider component
const TabProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
  );
};

// Custom hook to use the context
const useTabContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useTabContext must be used within a TabValueProvider');
  }
  return context;
};

export { TabProvider, useTabContext };
