import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "./AuthenticationContainer";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
import ButtonCenterContainer from "./ButtonCenterContainer";
import Button from "./Button";

export const Register = () => {
  const history = useHistory();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/factures");
  };

  return (
    <Transition in={mounted} timeout={250}>
      {(state) => (
        <AuthenticationContainer state={state}>
          <FormTitle>Création de compte</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder='john.doe@gmail.com'
              required={true}
              type='email'
              id='email'
              label='Adresse email'
            />
            <FormInput
              placeholder='•••••••••'
              required={true}
              type='password'
              id='password'
              label='Mot de passe'
            />
            <FormInput
              placeholder='•••••••••'
              required={true}
              type='password'
              id='confirm-password'
              label='Confirmation du mot de passe'
            />
            <ButtonCenterContainer>
              <Button>S'enregistrer</Button>
            </ButtonCenterContainer>
          </form>
          <AlreadyHaveAccount>
            Déjà un compte ? <Login to='/'>Se connecter</Login>
          </AlreadyHaveAccount>
        </AuthenticationContainer>
      )}
    </Transition>
  );
};

export default Register;

const AlreadyHaveAccount = styled.div`
  text-align: center;
  color: ${(props) => props.theme.baseTextColor};
`;

const Login = styled(Link)`
  color: ${colors.paleViolet};
`;
