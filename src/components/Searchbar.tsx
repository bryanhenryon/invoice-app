import { useState, useEffect } from "react";
import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";

import { ReactComponent as SearchIcon } from "../assets/svg/icon-search.svg";
import { ReactComponent as CloseIcon } from "../assets/svg/icon-close.svg";

const Searchbar: React.FC = () => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    inputValue !== "" ? setShowDeleteIcon(true) : setShowDeleteIcon(false);
  }, [inputValue]);

  return (
    <InputContainer>
      <SearchInput
        type='text'
        placeholder='Rechercher par client'
        spellCheck='false'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {showDeleteIcon ? (
        <ResetInputButton onClick={() => setInputValue("")}>
          <CloseIconExtended />
        </ResetInputButton>
      ) : (
        <SearchIconExtended />
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  transition: 100ms ease-in;
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.inputBackgroundColor};
  border-radius: 0.4rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  padding-left: 1.2rem;
  min-height: 4rem;

  @media ${breakpoints.sm} {
    max-width: 27.5rem;
  }
`;

const SearchInput = styled.input`
  transition: 100ms ease-in;
  color: ${({ theme }) => theme.blackToWhite};
  background: ${({ theme }) => theme.inputBackgroundColor};
  padding-right: 1.2rem;
  width: 100%;
  outline: none;
  border: none;

  &::placeholder {
    color: ${colors.grey};
  }

  &:focus {
    ${InputContainer} {
      border-color: ${colors.violet};
    }
  }
`;

const ResetInputButton = styled.div`
  display: flex;
  margin-right: 1.2rem;
  cursor: pointer;
`;

const CloseIconExtended = styled(CloseIcon)`
  fill: ${colors.red};
  height: 1.8rem;
  width: 1.8rem;
`;

const SearchIconExtended = styled(SearchIcon)`
  fill: ${colors.grey};
  margin-right: 1.2rem;
  height: 100%;
`;

export default Searchbar;
