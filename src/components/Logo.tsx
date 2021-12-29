import styled from "styled-components";

import { ReactComponent as LogoIcon } from "../assets/svg/logo.svg";
import { colors } from "../assets/style/variables";

const Logo: React.FC = () => (
  <LogoContainer>
    <StyledLogo>
      <LogoIcon />
    </StyledLogo>
    
    <Shade />
  </LogoContainer>
);

const LogoContainer = styled.div`
  display: inline-block;
  position: relative;
  background: ${colors.violet};
  border-radius: 0 2rem 2rem 0;
  overflow: hidden;
`;

const StyledLogo = styled.div`
  position: relative;
  z-index: 1;
  padding: 3.2rem;
`;

const Shade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${colors.lightViolet};
  border-radius: 2rem 0 2rem;
  height: 50%;
`;

export default Logo;
