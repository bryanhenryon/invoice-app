import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";

import AuthenticationContainer from "../components/AuthenticationContainer";
import FormTitle from "../components/FormTitle";
import FormInput from "../components/FormInput";
import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/Button";

import { colors } from "../assets/style/variables";

interface Props {
  startLoadingBar: () => void;
  endLoadingBar: () => void;
}

const PasswordReset: React.FC<Props> = ({ startLoadingBar, endLoadingBar }) => {
  const auth = getAuth();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;

    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      startLoadingBar();

      await sendPasswordResetEmail(auth, email, {
        url: "https://invoice-manager-f7e48.web.app/",
      });

      setShowConfirmation(true);
    } catch ({ code }) {
      switch (code) {
        case "auth/invalid-email":
          setError("Veuillez indiquer une adresse valide");
          break;
        case "auth/user-not-found":
          setError("Aucun compte ne correspond à cette adresse");
          break;
        case "auth/too-many-requests":
          setError(
            "La connexion a été bloquée suite à un trop grand nombre de tentatives de connexion, veuillez réessayer dans quelques minutes"
          );
      }
    } finally {
      endLoadingBar();
    }
  };

  return (
    <AuthenticationContainer>
      {showConfirmation ? (
        <Confirmation
          as={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          Un e-mail de réinitialisation vient de vous être envoyé (vérifiez vos
          spams)
        </Confirmation>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormTitle>Réinitialisation de mot de passe</FormTitle>
          <InputContainer>
            <FormInput
              showError={error ? true : false}
              name='email'
              value={email}
              handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
              placeholder='john.doe@gmail.com'
              required={true}
              type='email'
              id='email'
              label='Veuillez indiquer votre e-mail'
              spellcheck={false}
              autoComplete='email'
            />
            {error && (
              <InputErrorMessageExtended>{error}</InputErrorMessageExtended>
            )}
          </InputContainer>

          <CenterButtonContainer>
            <Button hasBoxShadow>Envoyer</Button>
          </CenterButtonContainer>
        </form>
      )}
      <Login to='/'>Retour à la connexion</Login>
    </AuthenticationContainer>
  );
};

const InputErrorMessageExtended = styled(InputErrorMessage)`
  margin-top: 1rem;
`;

const InputContainer = styled.div`
  margin-bottom: 3rem;
`;

const CenterButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 2.9rem;
`;

const Login = styled(Link)`
  color: ${colors.lightVioletSecondary};
  text-align: center;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const Confirmation = styled.p`
  color: ${({ theme }) => theme.darkToWhite};
  text-align: center;
  margin-bottom: 2.9rem;
`;

export default PasswordReset;
