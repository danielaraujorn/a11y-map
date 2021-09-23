import styled from "styled-components";

export const Form = styled.form`
  margin: ${({ theme }) => theme.spacing()};
  box-sizing: border-box;
  & > .MuiFormControl-root {
    width: -webkit-fill-available;
    box-sizing: border-box;
    margin: ${({ theme }) => theme.spacing()};
  }
`;
