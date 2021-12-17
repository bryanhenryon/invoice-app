import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";

import { ReactComponent as SearchIcon } from "../assets/svg/icon-search.svg";

const Searchbar: React.FC = () => (
  <InputContainer>
    <SearchInput
      type='text'
      placeholder='Rechercher par client'
      spellCheck='false'
    />
    <SearchIconExtended />
  </InputContainer>
);

const InputContainer = styled.div`
  width: 100%;
  position: relative;

  @media ${breakpoints.sm} {
    max-width: 27.5rem;
  }
`;

const SearchInput = styled.input`
  transition: 100ms ease-in;
  background: ${({ theme }) => theme.inputBackgroundColor};
  color: ${({ theme }) => theme.blackToWhite};
  padding: 1.2rem 3.5rem 1rem 1.2rem;
  border-radius: 0.4rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  outline: none;

  &::placeholder {
    color: ${colors.grey};
  }

  &:focus {
    border-color: ${colors.violet};
  }
`;

const SearchIconExtended = styled(SearchIcon)`
  position: absolute;
  right: 1.3rem;
  top: 1rem;
  fill: ${colors.grey};
`;

export default Searchbar;
