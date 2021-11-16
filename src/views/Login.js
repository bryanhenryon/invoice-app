import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import ButtonCenterContainer from "../components/ButtonCenterContainer";
import Button from "../components/Button";

export const Login = () => {
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
          <FormTitle>Connexion</FormTitle>
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
            <ButtonCenterContainer>
              <Button>Se connecter</Button>
            </ButtonCenterContainer>
          </form>

          <NewUser>
            Nouvel utilisateur ?{" "}
            <CreateNewAccount to='/inscription'>
              Créer un compte
            </CreateNewAccount>
          </NewUser>

          <ForgottenPasswordContainer>
            <ForgottenPassword to='/reinitialisation'>
              Mot de passe oublié
            </ForgottenPassword>
          </ForgottenPasswordContainer>
        </AuthenticationContainer>
      )}
    </Transition>
  );
};

const NewUser = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.baseTextColor};
`;

const CreateNewAccount = styled(Link)`
  color: ${colors.paleViolet};
`;

const ForgottenPasswordContainer = styled.div`
  text-align: center;
`;

const ForgottenPassword = styled(Link)`
  display: inline-block;
  color: ${colors.paleViolet};
`;

export default Login;
