import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const FormTitle: React.FC<Props> = ({ children }) => <Title>{children}</Title>;

const Title = styled.h2`
  margin-bottom: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.darkToWhite};
`;

export default FormTitle;
