import styled from "styled-components";

import { colors } from "../assets/style/variables";

interface Props {
  children: React.ReactNode;
}

const InputErrorMessage: React.FC<Props> = ({ children }) => (
  <Message>{children}</Message>
);

const Message = styled.p`
  color: ${colors.red};
  font-weight: 500;
  font-size: 1.3rem;
  margin-top: 1rem;
`;

export default InputErrorMessage;
