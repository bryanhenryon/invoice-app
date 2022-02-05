import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/Button";

interface Props {
  startLoadingBar: () => void;
  endLoadingBar: () => void;
}

const Register: React.FC<Props> = ({ startLoadingBar, endLoadingBar }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const isFormValid = handleErrorsAndValidateForm();

    e.preventDefault();

    if (!isFormValid) return;

    try {
      startLoadingBar();

      await createUserWithEmailAndPassword(
        auth,
        formInputs.email,
        formInputs.password
      );

      await setPersistence(auth, browserLocalPersistence);

      navigate("/factures");
    } catch ({ code }) {
      if (typeof code === "string") handleErrorsAndValidateForm(code);
    } finally {
      endLoadingBar();
    }
  };

  const handleErrorsAndValidateForm = (code?: string) => {
    type ErrorsObject = {
      email: string;
      password: string;
      confirmPassword: string;
    };

    const errorsObject: ErrorsObject = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (code) {
      if (code === "auth/invalid-email") {
        errorsObject.email = "Veuillez indiquer une adresse valide";
      }

      if (code === "auth/email-already-in-use") {
        errorsObject.email = "Cette adresse est déjà associée à un compte";
      }

      if (code === "auth/weak-password") {
        errorsObject.password =
          "Le mot de passe doit être d'au moins 6 caractères";
      }
    }

    if (formInputs.password !== formInputs.confirmPassword) {
      errorsObject.confirmPassword = "Les mots de passe ne sont pas identiques";
    }

    setFormErrors(errorsObject);

    return Object.values(errorsObject).every((val) => val === "");
  };

  return (
    <AuthenticationContainer>
      <FormTitle>Création de compte</FormTitle>

      <form onSubmit={handleSubmit}>
        <InputsContainer>
          <InputContainer>
            <FormInput
              showError={formErrors.email ? true : false}
              name='email'
              value={formInputs.email}
              handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
              placeholder='john.doe@gmail.com'
              required
              type='email'
              id='email'
              label='Adresse email'
              spellcheck={false}
              autoComplete='email'
            />
            {formErrors.email && (
              <InputErrorMessageExtended>
                {formErrors.email}
              </InputErrorMessageExtended>
            )}
          </InputContainer>

          <InputContainer>
            <FormInput
              showError={formErrors.password ? true : false}
              name='password'
              value={formInputs.password}
              handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
              placeholder='•••••••••'
              required
              type='password'
              id='password'
              label='Mot de passe'
              spellcheck={false}
              autoComplete='new-password'
              displayEye
            />
            {formErrors.password && (
              <InputErrorMessageExtended>
                {formErrors.password}
              </InputErrorMessageExtended>
            )}
          </InputContainer>
          <FormInput
            showError={formErrors.confirmPassword ? true : false}
            name='confirmPassword'
            value={formInputs.confirmPassword}
            handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
            placeholder='•••••••••'
            required
            type='password'
            id='confirm-password'
            label='Confirmation du mot de passe'
            spellcheck={false}
            autoComplete='new-password'
            displayEye
          />
          {formErrors.confirmPassword && (
            <InputErrorMessageExtended>
              {formErrors.confirmPassword}
            </InputErrorMessageExtended>
          )}
        </InputsContainer>

        <CenterButtonContainer>
          <Button hasBoxShadow>S'enregistrer</Button>
        </CenterButtonContainer>
      </form>

      <AlreadyHaveAccount>
        Déjà un compte ? <Login to='/'>Se connecter</Login>
      </AlreadyHaveAccount>
    </AuthenticationContainer>
  );
};

const InputErrorMessageExtended = styled(InputErrorMessage)`
  margin-top: 1rem;
`;

const InputsContainer = styled.div`
  margin-bottom: 3rem;
`;

const InputContainer = styled.div`
  margin-bottom: 3rem;
`;

const CenterButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 2.9rem;
`;

const AlreadyHaveAccount = styled.div`
  text-align: center;
  color: ${(props) => props.theme.darkToWhite};
`;

const Login = styled(Link)`
  color: ${colors.lightVioletSecondary};

  &:hover {
    text-decoration: underline;
  }
`;

export default Register;
