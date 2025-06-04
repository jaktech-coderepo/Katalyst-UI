'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextInterface {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface
);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ open, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
