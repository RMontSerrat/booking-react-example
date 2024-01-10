import styled from "@emotion/styled";

import {
  Card as CardBase,
  CardContent as CardContentBase,
} from "@mui/material";

export const Card = styled(CardBase)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CardContent = styled(CardContentBase)`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
