import styled from "styled-components";

import { colors } from "../assets/style/variables";

interface Props {
  className?: string;
  children: React.ReactNode;
  hasIcon?: boolean;
  hasBoxShadow?: boolean;
  variant?: string;
  fullWidth?: boolean;
}

const Button: React.FC<Props> = ({
  className,
  children,
  hasIcon,
  hasBoxShadow,
  variant,
  fullWidth,
}) => {
  return (
    <StyledButton
      className={className}
      hasBoxShadow={hasBoxShadow}
      variant={variant}
      hasIcon={hasIcon}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
};

interface StyledButtonProps {
  hasBoxShadow: boolean | undefined;
  variant: string | undefined;
  hasIcon: boolean | undefined;
  fullWidth: boolean | undefined;
}

const StyledButton = styled.button<StyledButtonProps>`
  font-size: 1.2rem;
  transition: background-color 0.2s ease;
  font-weight: 600;
  padding: 1.6rem 2.8rem;
  border-radius: 24px;
  background: ${colors.violet};
  color: ${colors.white};
  white-space: nowrap;
  width: ${({ fullWidth }) => fullWidth && "100%"};
  ${({ variant }) =>
    variant === "red" &&
    `
    background: ${colors.red}
  `};
  ${({ variant, theme }) =>
    variant === "light" &&
    `
    background: ${theme.buttonVariantLightBackground};
    color: ${theme.buttonVariantLightColor};
  `};
  ${({ hasIcon }) => hasIcon && `padding: 0.8rem 0.8rem;`};
  ${({ hasBoxShadow }) =>
    hasBoxShadow && `box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;`};

  &:hover {
    background: ${colors.lightViolet};

    ${({ variant }) =>
      variant === "red" &&
      `
    background: #FF9797;
    `}

    ${({ variant, theme }) =>
      variant === "light" &&
      `
    background: ${theme.buttonVariantLightBackgroundHover};
    color: ${colors.paleViolet};
    `}
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default Button;
