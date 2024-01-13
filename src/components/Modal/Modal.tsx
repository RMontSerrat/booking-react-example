import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import ModalBase from "@mui/material/Modal";
import React from "react";
import { ActionsContainer, Container, TitleContainer } from "./Modal.styles";

interface CustomModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <IconButton
      onClick={onClose}
      style={{ position: "absolute", top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
  );
}

export function Modal({ children, onClose, open }: CustomModalProps) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <Container>
        <CloseButton onClose={onClose} />
        {children}
      </Container>
    </ModalBase>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <TitleContainer>
      <Typography color="black" variant="h5" align="center">
        {children}
      </Typography>
    </TitleContainer>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <ActionsContainer>{children}</ActionsContainer>;
}

Modal.Title = Title;
Modal.Actions = Actions;
Modal.IconContainer = Actions;
