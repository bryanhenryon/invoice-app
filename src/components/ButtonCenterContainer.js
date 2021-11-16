import styled from 'styled-components';

export const ButtonCenterContainer = ({ children }) => {
  return <SubmitButtonContainer>{children}</SubmitButtonContainer>;
};

const SubmitButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export default ButtonCenterContainer;
