import styled from "styled-components";

export const FormTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

const Title = styled.h2`
  margin-bottom: 3rem;
  text-align: center;
  color: ${(props) => props.theme.blackToWhite};
`;

export default FormTitle;
