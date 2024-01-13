import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  @media (max-width: 600px) {
    width: 70%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
