import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

import { colors } from "../assets/style/variables";

const PasswordReset: React.FC = () => {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000",
    });

    setShowConfirmation(true);
  };

  return (
    <AuthenticationContainer>
      {showConfirmation ? (
        <Confirmation
          as={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          Un email de réinitialisation vient de vous être envoyé (vérifiez vos
          spams)
        </Confirmation>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormTitle>Réinitialisation de mot de passe</FormTitle>
          <FormInput
            name='email'
            value={email}
            handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
            placeholder='john.doe@gmail.com'
            required={true}
            type='email'
            id='email'
            label='Veuillez indiquer votre email'
            spellcheck={false}
            autoComplete='email'
          />

          <CenterButtonContainer>
            <Button hasBoxShadow>Envoyer</Button>
          </CenterButtonContainer>
        </form>
      )}
      <Login to='/'>Retour à la connexion</Login>
    </AuthenticationContainer>
  );
};

const CenterButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 2.9rem;
`;

const Login = styled(Link)`
  color: ${colors.paleViolet};
  text-align: center;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const Confirmation = styled.p`
  color: ${({ theme }) => theme.blackToWhite};
  text-align: center;
  margin-bottom: 2.9rem;
`;

export default PasswordReset;
