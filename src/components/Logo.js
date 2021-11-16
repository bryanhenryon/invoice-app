import styled from "styled-components";

import { colors } from "../assets/style/variables";

export const Logo = () => (
  <LogoContainer>
    <StyledLogo>
      <svg xmlns='http://www.w3.org/2000/svg' width='28' height='26'>
        <path
          fill='#FFF'
          fillRule='evenodd'
          d='M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z'
        />
      </svg>
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
