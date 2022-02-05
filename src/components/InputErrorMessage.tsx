import styled from "styled-components";

import { colors } from "../assets/style/variables";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const InputErrorMessage: React.FC<Props> = ({ children, className }) => (
  <Message className={className}>{children}</Message>
);

const Message = styled.p`
  color: ${colors.red};
  font-weight: 500;
  font-size: 1.3rem;
`;

export default InputErrorMessage;
