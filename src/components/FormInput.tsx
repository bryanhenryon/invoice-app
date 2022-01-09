import { useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";

import { ReactComponent as EyeOffLineIcon } from "../assets/svg/eye-off-line.svg";
import { ReactComponent as EyeLineIcon } from "../assets/svg/eye-line.svg";
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
  displayEye?: boolean;
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
  displayEye,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormGroup>
      <Label htmlFor={id}>{label}</Label>
      <Input
        displayEye={displayEye}
        showError={showError}
        className={className}
        id={id}
        placeholder={placeholder}
        type={showPassword ? "text" : type}
        required={required}
        spellCheck={spellcheck}
        autoComplete={autoComplete}
        value={value}
        name={name}
        onChange={(e) => handleInputChange(e)}
      />
      {displayEye && type === "password" && (
        <button type='button' onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeLineIconExtended as={EyeLineIcon} />
          ) : (
            <EyeOffLineIconExtended />
          )}
        </button>
      )}
    </FormGroup>
  );
};

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
`;

interface InputProps {
  showError: boolean | undefined;
  displayEye: boolean | undefined;
}

const Input = styled.input<InputProps>`
  background: ${({ theme }) => theme.whiteToLightDark};
  color: ${({ theme }) => theme.darkToWhite};
  width: 100%;
  padding: 1.6rem 2rem;

  ${({ displayEye }) =>
    displayEye &&
    css`
      padding: 1.6rem 5rem 1.6rem 2rem;
    `};

  border-radius: 0.4rem;
  border: 1px solid
    ${({ theme }) => theme.lightGreySecondaryToLightDarkSecondary};

  ${({ showError }) =>
    showError &&
    css`
      border: 1px solid ${colors.red};
    `}

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.violetToLightDarkSecondary};

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

const EyeOffLineIconExtended = styled(EyeOffLineIcon)`
  position: absolute;
  right: 15px;
  top: 50%;
  fill: ${colors.grey};
  transform: scale(0.8);
`;

const EyeLineIconExtended = styled(EyeOffLineIconExtended)``;

export default FormInput;
