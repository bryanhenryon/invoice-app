import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formInputs.email,
        formInputs.password
      );
      const user = userCredential.user;

      console.log(user); // TODO: save object to the store
      navigate("/factures");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticationContainer>
      <FormTitle>Connexion</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormInput
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
