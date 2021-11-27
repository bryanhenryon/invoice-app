import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

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
              spellcheck='false'
            />
            <FormInput
              placeholder='•••••••••'
              required={true}
              type='password'
              id='password'
              label='Mot de passe'
              spellcheck='false'
            />
            <FormInput
              placeholder='•••••••••'
              required={true}
              type='password'
              id='confirm-password'
              label='Confirmation du mot de passe'
              spellcheck='false'
            />
            <CenterButtonContainer>
              <Button hasBoxShadow>S'enregistrer</Button>
            </CenterButtonContainer>
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

const CenterButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 2.9rem;
`;

const AlreadyHaveAccount = styled.div`
  text-align: center;
  color: ${(props) => props.theme.baseTextColor};
`;

const Login = styled(Link)`
  color: ${colors.paleViolet};

  &:hover {
    text-decoration: underline;
  }
`;
