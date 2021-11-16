import styled from "styled-components";

import { colors } from "../assets/style/variables";

export const Button = ({ children, hasIcon }) => {
  return <StyledButton hasIcon={hasIcon}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  font-size: 1.2rem;
  transition: background 0.2s ease;
  font-weight: 600;
  border-radius: 24px;
  background: ${colors.violet};
  padding: 1.6rem 2.8rem;
  ${({ hasIcon }) => hasIcon && `padding: 0.8rem 0.8rem;`}
  color: ${colors.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  &:hover {
    background: ${colors.lightViolet};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default Button;
