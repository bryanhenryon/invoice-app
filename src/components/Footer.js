import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";

const currentYear = new Date().getFullYear();

export const Footer = () => (
  <StyledFooter>
    <CopyrightText>© {currentYear} Bryan Henryon — </CopyrightText>
    <PortfolioLink
      href='https://bryanhenryon.fr'
      target='_blank'
      rel='noopener'
    >
      www.bryanhenryon.fr
    </PortfolioLink>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  text-align: center;
`;

const CopyrightText = styled.span`
  color: ${({ theme }) => theme.baseTextColor};
`;

const PortfolioLink = styled.a`
  color: ${colors.paleViolet};

  &:hover {
    text-decoration: underline;
  }
`;
export default Footer;
