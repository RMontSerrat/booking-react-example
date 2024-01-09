import React, { useState, useContext, createContext, useCallback } from 'react';
import { Modal as MuiModal } from '@mui/material';

type OpenModalOption = {
  body: React.ReactNode;
  onClose?: () => void;
};

const ModalContext = createContext<{
  openModal: (option: OpenModalOption) => void;
  closeModal: () => void;
} | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [open, setOpen] = useState(false);
  const [onClose, setOnClose] = useState<(() => void) | undefined>(undefined);

  const openModal = useCallback(({ body, onClose: customOnClose }: OpenModalOption) => {
    setModalContent(body);
    setOpen(true);
    if (customOnClose) {
      setOnClose(() => customOnClose);
    }
  }, []);

  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
    setModalContent(null);
    setOnClose(undefined);
  }, [onClose]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <MuiModal open={open} onClose={closeModal}>
        <div>{modalContent}</div>
      </MuiModal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
