import { ChangeEvent } from "react";
import styled from "styled-components";

import { colors } from "../assets/style/variables";

interface Props {
  label: string;
  id: string;
  placeholder: string;
  type: string;
  required: boolean;
  spellcheck: boolean;
  autoComplete: string;
  value: string;
  name: string;
  handleInputChange: (e: ChangeEvent) => void;
}

const FormInput: React.FC<Props> = ({
  label,
  id,
  placeholder,
  type,
  required,
  spellcheck,
  autoComplete,
  value,
  name,
  handleInputChange,
}) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        required={required}
        spellCheck={spellcheck}
        autoComplete={autoComplete}
        value={value}
        name={name}
        onChange={(e) => handleInputChange(e)}
      />
    </>
  );
};

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.inputLabelColor};
`;

const Input = styled.input`
  background: ${({ theme }) => theme.inputBackgroundColor};
  color: ${({ theme }) => theme.blackToWhite};
  width: 100%;
  margin-bottom: 3rem;
  padding: 1.6rem 2rem;
  border-radius: 0.4rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.activeInputBorderColor};
  }

  &::placeholder {
    font-weight: 500;
    color: ${colors.grey};
  }
`;

export default FormInput;
