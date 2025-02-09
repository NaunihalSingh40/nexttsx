import styled from "styled-components";
import { theme } from "@/styles/Theme";

interface ButtonVariants {
  variant:
    | "contained"
    | "contained1"
    | "contained2"
    | "disabled"
    | "outline"
    | "outline1"
    | "text";
}
const getButtonStyles = ({ variant }: ButtonVariants) => {
  switch (variant) {
    case "contained":
      return `
        border-radius: 8px;
        background: #EBB935;
        color: #1A1A1A;
        border: none;
        cursor: pointer;  
      `;
    case "contained1":
      return `
        border-radius: 8px;
        background: #EBB935;
        color:#FFFFFF; 
        border: none;
        cursor: pointer;  
      `;
    case "contained2":
      return `
        border-radius: 8px;
        background: ${theme.HPSECONDARYCOLOR};
        color:#FFFFFF; 
        border: none;
        cursor: pointer;  
      `;

    case "disabled":
      return `
        background:transparent;
        color: #282828;
        border: 1px solid;
        cursor: not-allowed;
     `;
    case "outline":
      return `
      background:transparent;
      color:#282828; 
      border: 1px solid #282828 ;
      cursor: pointer; 
    `;
    case "outline1":
      return `
      background:transparent;
      color:#282828; 
      border: 1px solid #EBB935 ;
      cursor: pointer; 
    `;
    case "text":
      return `
        background:transparent; 
        color:#21ADE8; 
        border: none; 
        cursor: pointer;  
`;
    default:
      return `
      background: #EBB935;
      color:#FFFFFF; 
      border: none;
      cursor: pointer;  
      `;
  }
};

export const StyledButton = styled.button<ButtonVariants>`
  ${({ variant }) => getButtonStyles({ variant })};
  width: 100%;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
`;
