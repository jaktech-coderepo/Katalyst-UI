'use client';

import { Box } from '@mui/material';
// ToggleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface ToggleContextType {
  isToggled: boolean;
  toggle: () => void;
}

// Create a context with a default value
const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

// Create a provider component
export const ToggleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isToggled, setIsToggled] = useState<boolean>(true);

  const toggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <ToggleContext.Provider value={{ isToggled, toggle }}>
      <Box sx={{ width: { xs: 0, md: isToggled ? 'fit-content' : 200 } }}>
        {children}
      </Box>
    </ToggleContext.Provider>
  );
};

// Custom hook to use the Toggle context
export const useSideBarToggle = (): ToggleContextType => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};
