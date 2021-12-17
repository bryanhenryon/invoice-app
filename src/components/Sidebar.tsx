import styled from "styled-components";
import { breakpoints } from "../assets/style/variables";

import Logo from "./Logo";
import SwitchThemeButton from "./SwitchThemeButton";
import LogoutButton from "./LogoutButton";

interface Props {
  theme: string;
  className?: string;
  toggleTheme: () => void;
}

const Sidebar: React.FC<Props> = ({ theme, className, toggleTheme }) => {
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
