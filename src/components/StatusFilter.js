import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

import { colors, breakpoints } from "../assets/style/variables";

import { ReactComponent as ChevronDownIcon } from "../assets/svg/icon-chevron-down.svg";
import { ReactComponent as CheckIcon } from "../assets/svg/icon-check.svg";

export const StatusFilter = ({ isSmallViewport }) => {
  const dropdown = useRef();

  const [showDropdown, setShowDropdown] = useState(false);
  const [checkboxesStatus, setCheckboxesStatus] = useState([
    {
      id: 1,
      text: "Payée",
      checked: false,
    },
    {
      id: 2,
      text: "En attente",
      checked: false,
    },
    {
      id: 3,
      text: "Brouillon",
      checked: false,
    },
  ]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const changeCheckboxStatus = (id) => {
    const checkbox = checkboxesStatus.find((checkbox) => checkbox.id === id);

    checkbox.checked = !checkbox.checked;
    setCheckboxesStatus([...checkboxesStatus]);
  };

  /**
   * Transition style
   */
  const duration = 150;

  const defaultStyle = {
    transition: `transform ${duration}ms`,
    transform: "scale(0)",
  };

  const transitionStyles = {
    entering: { transform: "scale(1)" },
    entered: { transform: "scale(1)" },
  };

  return (
    <Container ref={dropdown}>
      <StatusFilterButton onClick={() => setShowDropdown(!showDropdown)}>
        {isSmallViewport ? "Filtrer" : "Filtrer par status"}
        <ChevronDownIconExtended showDropdown={showDropdown} />
      </StatusFilterButton>

      <Transition in={showDropdown} timeout={duration}>
        {(state) => (
          <StatusFilterDropdown
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {checkboxesStatus.map(({ id, text, checked }) => (
              <Label key={id} onClick={() => changeCheckboxStatus(id)}>
                <FakeCheckbox checked={checked}>
                  <CheckIconExtended checked={checked} />
                </FakeCheckbox>
                {text}
              </Label>
            ))}
          </StatusFilterDropdown>
        )}
      </Transition>
    </Container>
  );
};

StatusFilter.propTypes = {
  isSmallViewport: PropTypes.bool.isRequired,
};

const Container = styled.div`
  position: relative;
  margin: 0 1rem;

  @media ${breakpoints.md} {
    margin-right: 3rem;
  }
`;

const StatusFilterButton = styled.button`
  font-weight: 700;
  font-size: 1.2rem;
  padding: 1rem;
  color: ${(props) => props.theme.baseTextColor};
`;

const StatusFilterDropdown = styled.div`
  position: absolute;
  top: 45px;
  left: -10%;
  z-index: 1;
  min-width: 19.2rem;
  padding: 1.4rem;
  background: ${({ theme }) => theme.statusFilterDropdownBackground};
  box-shadow: ${({ theme }) => theme.statusFilterDropdownBoxShadow};
  border-radius: 8px;
`;

const FakeCheckbox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.6rem;
  width: 1.6rem;
  background: ${({ checked, theme }) =>
    checked ? colors.violet : theme.statusFilterCheckboxBackground};
  border-radius: 0.2rem;
  cursor: pointer;
  margin-right: 1.3rem;
`;

const CheckIconExtended = styled(CheckIcon)`
  display: ${({ checked }) => (checked ? "block" : "none")};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.baseTextColor};
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  padding: 1rem;

  &:hover {
    ${FakeCheckbox} {
      border: 2px solid ${colors.violet};
    }
  }
`;

const ChevronDownIconExtended = styled(ChevronDownIcon)`
  margin-left: 1.2rem;
  transition: transform 300ms;

  ${({ showDropdown }) =>
    showDropdown &&
    `
    transform: rotate(-180deg);
  `}

  @media ${breakpoints.md} {
    margin-left: 1.6rem;
  }
`;

export default StatusFilter;
