import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const AuthenticationContainer: React.FC<Props> = ({ children }) => (
  <Container
    as={motion.div}
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Subcontainer>{children}</Subcontainer>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Subcontainer = styled.div`
  width: 100%;
  max-width: 365px;
`;

export default AuthenticationContainer;
