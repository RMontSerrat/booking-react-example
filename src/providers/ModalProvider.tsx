import { Modal } from "@/components/Modal";
import React, { createContext } from "react";
import { atom, useRecoilState } from "recoil";

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
  key: "modalState",
  default: {
    body: null,
    open: false,
    onClose: undefined,
  },
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  const openModal = ({ body, onClose }: ModalOptions) => {
    setModalInfo({ body, open: true, onClose });
  };

  const closeModal = () => {
    if (modalInfo.onClose) {
      modalInfo.onClose();
    }
    setModalInfo({ body: null, open: false, onClose: undefined });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal open={modalInfo.open} onClose={closeModal}>
        {modalInfo.body}
      </Modal>
    </ModalContext.Provider>
  );
}

export interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
