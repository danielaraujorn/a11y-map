import styled from "styled-components";
import { alpha } from "@mui/material/styles";

export const Search = styled.div`
  position: relative;
  border-radius: theme.shape.borderRadius;
  background-color: ${({ theme }) => alpha(theme.palette.common.white, 0.15)};
  "&:hover": {
    backgroundcolor: ${({ theme }) => alpha(theme.palette.common.white, 0.25)};
  }
  marginright: ${({ theme }) => theme.spacing(2)};
  marginleft: 0;
  width: 100%;
`;
