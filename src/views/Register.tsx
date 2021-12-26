import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { colors } from "../assets/style/variables";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate();

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
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
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
      <FormTitle>Création de compte</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormInput
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
        <FormInput
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
        />
        <FormInput
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
        />
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

const CenterButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 2.9rem;
`;

const AlreadyHaveAccount = styled.div`
  text-align: center;
  color: ${(props) => props.theme.blackToWhite};
`;

const Login = styled(Link)`
  color: ${colors.paleViolet};

  &:hover {
    text-decoration: underline;
  }
`;

export default Register;
