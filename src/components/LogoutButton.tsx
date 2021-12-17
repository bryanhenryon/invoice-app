import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";

import { ReactComponent as LogoutIcon } from "../assets/svg/shut-down.svg";

const LogoutButton: React.FC = () => (
  <Button>
    <LogoutIcon />
  </Button>
);

const Button = styled.button`
  padding: 3.2rem;
  fill: #858bb2;
  border-left: 1px solid rgba(133, 139, 178, 0.2);

  &:hover {
    fill: ${colors.white};
  }

  &:active {
    transform: translateY(1px);
  }

  @media ${breakpoints.lg} {
    border-left: none;
    border-top: 1px solid rgba(133, 139, 178, 0.2);
  }
`;

export default LogoutButton;
