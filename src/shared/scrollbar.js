import { css } from "styled-components";

export const scrollbar = css`
  &::-webkit-scrollbar {
    display: block;
    width: 10px;
    height: 10px;
    background-color: var(--white);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--point);
    background-clip: padding-box;
    border-radius: 5px;
    border: 2px solid transparent;
  }
`;
