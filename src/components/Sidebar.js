import styled from "styled-components";
import PropTypes from "prop-types";
import { breakpoints } from "../assets/style/variables";

import Logo from "./Logo";
import SwitchThemeButton from "./SwitchThemeButton";
import LogoutButton from "./LogoutButton";

export const Sidebar = ({ theme, className, toggleTheme }) => {
  return (
    <Container className={className}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />
      <LogoutButton />
    </Container>
  );
};

Sidebar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.sidebarBackground};

  @media ${breakpoints.lg} {
    flex-direction: column;
    border-radius: 0 2rem 2rem 0;
    overflow: hidden;
  }
`;

const LogoContainer = styled.div`
  flex-grow: 2;
`;

export default Sidebar;
