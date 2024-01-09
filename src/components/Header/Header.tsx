import React from "react";
import { Typography } from "@mui/material";

export function Header({ children }: { children: React.ReactNode }) {
  return <Typography variant="h4">{children}</Typography>;
}
