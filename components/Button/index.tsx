import React from "react";
import { StyledButton } from "@/styles/Button";

// Define the interface for ButtonParams
interface ButtonParams {
  label: string;
  variant:
    | "contained"
    | "contained1"
    | "contained2"
    | "disabled"
    | "outline"
    | "outline1"
    | "text";
  type: "button" | "submit" | "reset"; // For valid button types
  icon?: React.ReactNode; // The icon can be any valid React node, like <Icon /> or an image element
  disabled?: boolean; // Optional disabled prop
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // onClick handler for button
  className?: string; // Optional className prop
  style?: React.CSSProperties; // Optional style prop
  // Use React.ButtonHTMLAttributes<HTMLButtonElement> to type the rest of the button-related props
}

const CustomButton: React.FC<ButtonParams> = ({
  label,
  variant,
  type,
  icon,
  disabled,
  onClick,
  className,
  style,
  ...rest
}) => (
  <StyledButton
    variant={variant}
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={className}
    style={style}
    {...rest} // Spread the rest of the props into the button
  >
    {icon && <span>{icon}</span>} {/* Render icon if it exists */}
    {label}
  </StyledButton>
);

export default CustomButton;
