import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "../assets/style/variables";

export const FormInput = ({
  label,
  id,
  placeholder,
  type,
  required,
  spellcheck,
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
      />
    </>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  required: PropTypes.string,
};

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.inputLabelColor};
`;

const Input = styled.input`
  background: ${(props) => props.theme.inputBackgroundColor};
  color: ${(props) => props.theme.baseTextColor};
  width: 100%;
  margin-bottom: 3rem;
  padding: 1.6rem 2rem;
  border-radius: 0.4rem;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.activeInputBorderColor};
  }

  &::placeholder {
    font-weight: 500;
    color: ${colors.grey};
  }
`;

export default FormInput;
