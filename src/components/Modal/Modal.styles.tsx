import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 24px;
  padding: 40px;

  @media (max-width: 600px) {
    width: 70%;
  }
`;
