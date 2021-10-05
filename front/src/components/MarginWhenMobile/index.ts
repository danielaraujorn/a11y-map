import styled from "styled-components";

export const MarginWhenMobile = styled.div`
  margin: 0;
  box-sizing: border-box;
  ${({ theme }) => `@media screen and (max-width: ${
    theme.breakpoints.values.sm + 16
  }px) {
    margin: 0 ${theme.spacing(2)};
  }`}
`;
