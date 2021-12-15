import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Transition } from "react-transition-group";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
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
            <CenterButtonContainer>
              <Button hasBoxShadow>Se connecter</Button>
            </CenterButtonContainer>
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
