import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as SunIcon } from "../assets/svg/icon-sun.svg";
import { ReactComponent as MoonIcon } from "../assets/svg/icon-moon.svg";

export const SwitchThemeButton = ({ theme, toggleTheme }) => (
  <StyledSwitchThemeButton onClick={toggleTheme}>
    {theme === "light" ? <StyledMoonIcon /> : <StyledSunIcon />}
  </StyledSwitchThemeButton>
);

SwitchThemeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

const StyledMoonIcon = styled(MoonIcon)`
  fill: #7e88c3;
  transition: 0.2s ease;
`;

const StyledSunIcon = styled(SunIcon)`
  fill: #858bb2;
  transition: 0.2s ease;
`;

const StyledSwitchThemeButton = styled.button`
  padding: 3.2rem;

  &:hover ${StyledMoonIcon} {
    fill: #f0c420;
  }

  &:hover ${StyledSunIcon} {
    fill: #f0c420;
  }
`;

export default SwitchThemeButton;
