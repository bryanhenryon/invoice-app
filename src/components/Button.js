import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "../assets/style/variables";

export const Button = ({ children, hasIcon, hasBoxShadow, variant }) => {
  return (
    <StyledButton
      hasBoxShadow={hasBoxShadow}
      variant={variant}
      hasIcon={hasIcon}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  hasIcon: PropTypes.bool,
  hasBoxShadow: PropTypes.bool,
};

const StyledButton = styled.button`
  font-size: 1.2rem;
  transition: background-color 0.2s ease;
  font-weight: 600;
  padding: 1.6rem 2.8rem;
  border-radius: 24px;
  background: ${colors.violet};
  color: ${colors.white};
  white-space: nowrap;
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
