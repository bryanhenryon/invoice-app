import styled from "styled-components";
import PropTypes from "prop-types";
import { breakpoints } from "../assets/style/variables";

import Logo from "./Logo";
import SwitchThemeButton from "./SwitchThemeButton";

export const Sidebar = ({ theme, toggleTheme }) => {
  return (
    <Container>
      <Logo />
      <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />
    </Container>
  );
};

Sidebar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.sidebarBackground};

  @media ${breakpoints.md} {
    flex-direction: column;
    border-radius: 0 2rem 2rem 0;
    overflow: hidden;
  }
`;

export default Sidebar;
