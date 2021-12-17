import { TransitionStatus } from "react-transition-group";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  state: TransitionStatus;
}

const AuthenticationContainer: React.FC<Props> = ({ children, state }) => (
  <Container state={state}>
    <Subcontainer>{children}</Subcontainer>
  </Container>
);

interface ContainerProps {
  state: TransitionStatus;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  opacity: ${({ state }) =>
    state === "entering" || state === "entered" ? 1 : 0};
  transition: opacity 250ms ease-out;
`;

const Subcontainer = styled.div`
  width: 100%;
  max-width: 365px;
`;

export default AuthenticationContainer;
