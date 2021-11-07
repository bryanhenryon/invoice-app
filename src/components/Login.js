import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from '../assets/style/variables';

const handleSubmit = (e) => {
  e.preventDefault();
};

export const Login = () => {
  return (
    <Container>
      <Subcontainer>
        <Title>Connexion</Title>
        <form onSubmit={handleSubmit}>
          <Label>Adresse email</Label>
          <Input
            type='email'
            spellcheck='false'
            placeholder='john.doe@gmail.com'
            required
          />
          <Label>Mot de passe</Label>
          <Input type='password' placeholder='•••••••••' required />
          <SubmitButtonContainer>
            <SubmitButton>Se connecter</SubmitButton>
          </SubmitButtonContainer>
        </form>

        <NewUser>
          Nouvel utilisateur ?{' '}
          <CreateNewAccount to='/inscription'>Créer un compte</CreateNewAccount>
        </NewUser>

        <ForgottenPasswordContainer>
          <ForgottenPassword to='/reinitialisation'>
            Mot de passe oublié
          </ForgottenPassword>
        </ForgottenPasswordContainer>
      </Subcontainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Subcontainer = styled.div`
  width: 100%;
  max-width: 365px;
  padding: 3.2rem 2.4rem;
`;

const Title = styled.h2`
  margin-bottom: 3rem;
  text-align: center;
  color: ${(props) => props.theme.baseTextColor};
`;

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

const SubmitButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SubmitButton = styled.button`
  transition: background 0.2s ease;
  font-weight: 600;
  border-radius: 24px;
  background: ${colors.violet};
  padding: 1.6rem 2.8rem;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  &:hover {
    background: ${colors.lightViolet};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const NewUser = styled.div`
  display: block;
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
