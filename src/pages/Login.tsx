import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [error, setError] = useState("");
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        formInputs.email,
        formInputs.password
      );

      await setPersistence(auth, browserLocalPersistence);
      navigate("/factures");
    } catch ({ code }) {
      switch (code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Les identifiants indiqués sont incorrects");
          break;
        case "auth/user-disabled":
          setError("Ce compte a été désactivé");
          break;
        case "auth/too-many-requests":
          setError(
            "La connexion a été bloquée suite à un trop grand nombre de tentatives de connexion, veuillez réessayer dans quelques minutes"
          );
      }
    }
  };

  return (
    <AuthenticationContainer>
      <FormTitle>Connexion</FormTitle>

      <form onSubmit={handleSubmit}>
        <InputsContainer>
          <FormInputExtended
            showError={error ? true : false}
            name='email'
            value={formInputs.email}
            handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
            placeholder='john.doe@gmail.com'
            required={true}
            type='email'
            id='email'
            label='Adresse email'
            spellcheck={false}
            autoComplete='email'
          />

          <FormInput
            showError={error ? true : false}
            name='password'
            value={formInputs.password}
            handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
            placeholder='•••••••••'
            required={true}
            type='password'
            id='password'
            label='Mot de passe'
            spellcheck={false}
            autoComplete='current-password'
          />
          {error && <InputErrorMessage>{error}</InputErrorMessage>}
        </InputsContainer>

        <CenterButtonContainer>
          <Button hasBoxShadow>Se connecter</Button>
        </CenterButtonContainer>
      </form>

      <NewUser>
        Nouvel utilisateur ?{" "}
        <CreateNewAccount to='/inscription'>Créer un compte</CreateNewAccount>
      </NewUser>

      <ForgottenPasswordContainer>
        <ForgottenPassword to='/reinitialisation'>
          Mot de passe oublié
        </ForgottenPassword>
      </ForgottenPasswordContainer>
    </AuthenticationContainer>
  );
};

const InputsContainer = styled.div`
  margin-bottom: 3rem;
`;

const FormInputExtended = styled(FormInput)`
  margin-bottom: 3rem;
`;

const CenterButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 2.9rem;
`;

const NewUser = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.blackToWhite};
`;

const CreateNewAccount = styled(Link)`
  color: ${colors.paleViolet};

  &:hover {
    text-decoration: underline;
  }
`;

const ForgottenPasswordContainer = styled.div`
  text-align: center;
`;

const ForgottenPassword = styled(Link)`
  display: inline-block;
  color: ${colors.paleViolet};

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
