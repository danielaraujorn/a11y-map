import styled from "styled-components";

export const ButtonContainer = styled.div`
  width: 100%;
  width: -webkit-fill-available;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  margin: ${({ theme }) => theme.spacing()};
  & > .MuiButton-root {
    margin: ${({ theme }) => theme.spacing()};
    margin-bottom: 0;
    &:last-of-type {
      margin-right: 0;
    }
  }
  margin-right: 0;
`;
