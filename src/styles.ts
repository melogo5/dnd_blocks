// @ts-nocheck
import styled, { css } from "styled-components";
export const ContextMenu = styled.div`
  position: absolute;
  width: 200px;
  color: white;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  ul li {
    border-radius: 5px;
    padding: 18px 12px;
    margin: 4px 0px;
    background-color: #6d6d6d;
  }
  /* hover */
  ul li:hover {
    border-radius: 5px;
    cursor: pointer;
    background-color: #000000;
  }
`;