import { ChangeEvent } from "react";
import styled, { css } from "styled-components";

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
  className?: string;
  showError?: boolean;
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
  className,
  showError,
}) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        showError={showError}
        className={className}
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

interface InputProps {
  showError: boolean | undefined;
}

const Input = styled.input<InputProps>`
  background: ${({ theme }) => theme.inputBackgroundColor};
  color: ${({ theme }) => theme.blackToWhite};
  width: 100%;
  padding: 1.6rem 2rem;
  border-radius: 0.4rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};

  ${({ showError }) =>
    showError &&
    css`
      border: 1px solid ${colors.red};
    `}

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.activeInputBorderColor};

    ${({ showError }) =>
      showError &&
      css`
        border: 1px solid ${colors.red};
      `}
  }

  &::placeholder {
    font-weight: 500;
    color: ${colors.grey};
  }
`;

export default FormInput;
