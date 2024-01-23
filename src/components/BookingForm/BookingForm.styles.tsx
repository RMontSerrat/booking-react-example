import styled from "@emotion/styled";
import { Button as BaseButton } from "@mui/material";

export const Form = styled.form`
  display: flex;
  gap: 20px;
  align-items: baseline;
  margin: 20px 0;
  justify-content: center;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Button = styled(BaseButton)`
  padding-top: 15px;
  padding-bottom: 15px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
