import ModalBase from "@mui/material/Modal";
import React from "react";
import { Container } from "./Modal.styles";

interface CustomModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

export const Modal = ({ children, onClose, open }: CustomModalProps) => {
  return (
    <ModalBase open={open} onClose={onClose}>
      <Container>{children}</Container>
    </ModalBase>
  );
};
