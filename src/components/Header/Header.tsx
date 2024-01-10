import { Typography } from "@mui/material";
import React from "react";
import { Container } from "./Header.styles";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Typography color="black" variant="h3">
        {children}
      </Typography>
    </Container>
  );
}
