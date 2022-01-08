import React from "react";
import styled from "styled-components";
import { breakpoints, priorities } from "../assets/style/variables";
import { getAuth } from "firebase/auth";

import Logo from "./Logo";
import SwitchThemeButton from "./SwitchThemeButton";
import LogoutButton from "./LogoutButton";

interface Props {
  theme: string;
  className?: string;
  toggleTheme: () => void;
  showLogoutModal: () => void;
  ref: HTMLDivElement;
}

const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ theme, className, toggleTheme, showLogoutModal }, ref) => {
    const auth = getAuth();

    return (
      <Container className={className} ref={ref}>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />
        {auth.currentUser && <LogoutButton onClick={showLogoutModal} />}
      </Container>
    );
  }
);

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.sidebarBackground};
  z-index: ${priorities.max};

  @media ${breakpoints.lg} {
    flex-direction: column;
    border-radius: 0 2rem 2rem 0;
    overflow: hidden;
  }
`;

const LogoContainer = styled.div`
  flex: 1;
`;

export default Sidebar;
