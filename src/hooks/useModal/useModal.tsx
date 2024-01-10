import React, { useCallback, useContext, createContext } from 'react';
import { Modal as MuiModal } from '@mui/material';
import { atom, useRecoilState } from 'recoil';

interface ModalOptions {
  body: React.ReactNode;
  onClose?: () => void;
}

interface ModalState {
  body: React.ReactNode | null;
  open: boolean;
  onClose: (() => void) | undefined;
}

const modalState = atom<ModalState>({
  key: 'modalState',
  default: {
    body: null,
    open: false,
    onClose: undefined,
  },
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const openModal = useCallback(({ body, onClose }: ModalOptions) => {
    setModalInfo({ body, open: true, onClose });
  }, [setModalInfo]);

  const closeModal = useCallback(() => {
    if (modalInfo.onClose) {
      modalInfo.onClose();
    }
    setModalInfo({ body: null, open: false, onClose: undefined });
  }, [modalInfo, setModalInfo]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <MuiModal open={modalInfo.open} onClose={closeModal}>
        <div>{modalInfo.body}</div>
      </MuiModal>
    </ModalContext.Provider>
  );
}

interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
