import styled from "styled-components";

type Props = {
  vertical?: "top" | "bottom";
  horizontal?: "left" | "right" | "center";
};

export const FloatingView = styled.div<Props>`
  position: fixed;
  z-index: 2000;
  ${({ vertical = "bottom", theme }) => `${vertical}: ${theme.spacing(3)};`}
  ${({ horizontal = "right", theme }) => {
    if (horizontal === "center")
      return `
        padding: 0 ${theme.spacing(3)};
        left: 50%;
        transform: translate(-50%, 0);
      `;
    return `${horizontal}: ${theme.spacing(3)};`;
  }}
`;
