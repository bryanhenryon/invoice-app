import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as ChevronDownIcon } from "../assets/svg/icon-chevron-down.svg";
import { ReactComponent as CheckIcon } from "../assets/svg/icon-check.svg";
import { colors, breakpoints } from "../assets/style/variables";

interface Props {
  isSmallViewport: boolean;
}

const StatusFilter: React.FC<Props> = ({ isSmallViewport }) => {
  const dropdown = useRef<HTMLDivElement>(null);

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

  /**
   * Close the dropdown when clicking away
   */
  const handleOutsideClick = (e: Event) => {
    if (
      dropdown.current &&
      !dropdown.current.contains(e.target as HTMLDivElement)
    ) {
      setShowDropdown(false);
    }
  };

  /**
   * Change the `checked` status of a selected checkbox
   * @param id A checkbox identifier
   */
  const changeCheckboxStatus = (id: number) => {
    const checkbox = checkboxesStatus.find((checkbox) => checkbox.id === id);

    if (!checkbox) throw new Error("Undefined checkbox");

    checkbox.checked = !checkbox.checked;
    setCheckboxesStatus([...checkboxesStatus]);
  };

  return (
    <Container ref={dropdown}>
      <StatusFilterButton onClick={() => setShowDropdown(!showDropdown)}>
        {isSmallViewport ? "Filtrer" : "Filtrer par status"}
        <ChevronDownIconContainer showDropdown={showDropdown}>
          <ChevronDownIconExtended />
        </ChevronDownIconContainer>
      </StatusFilterButton>
      <AnimatePresence>
        {showDropdown && (
          <StatusFilterDropdown
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
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
      </AnimatePresence>
    </Container>
  );
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
  color: ${(props) => props.theme.blackToWhite};
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

interface FakeCheckboxProps {
  checked: boolean;
}

const FakeCheckbox = styled.span<FakeCheckboxProps>`
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

interface CheckIconExtendedProps {
  checked: boolean;
}

const CheckIconExtended = styled(CheckIcon)<CheckIconExtendedProps>`
  display: ${({ checked }) => (checked ? "block" : "none")};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.blackToWhite};
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

interface ChevronDownIconExtendedProps {
  showDropdown: boolean;
}

const ChevronDownIconContainer = styled.span<ChevronDownIconExtendedProps>`
  display: inline-block;
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

const ChevronDownIconExtended = styled(ChevronDownIcon)``;

export default StatusFilter;
