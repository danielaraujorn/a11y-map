import styled from 'styled-components';

export const MaxWidthContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.values.sm}px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;
