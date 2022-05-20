import styled from 'styled-components';

export const ButtonContainer = styled.div`
  width: 100%;
  width: -webkit-fill-available;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  margin: ${({ theme }) => theme.spacing(3)} 0;
  gap: ${({ theme }) => theme.spacing()};
`;
