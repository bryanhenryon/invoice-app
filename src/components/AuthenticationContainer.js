import styled from "styled-components";
import PropTypes from "prop-types";

export const AuthenticationContainer = ({ children, state }) => {
  return (
    <Container state={state}>
      <Subcontainer>{children}</Subcontainer>
    </Container>
  );
};

AuthenticationContainer.propTypes = {
  state: PropTypes.string.isRequired,
};

const Container = styled.div`
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
