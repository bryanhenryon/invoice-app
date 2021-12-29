import styled from "styled-components";

import { colors } from "../assets/style/variables";

interface Props {
  id: string | undefined;
  className?: string;
  fontWeight: string;
}

const InvoiceId: React.FC<Props> = ({ id, className, fontWeight }) => (
  <Id className={className} fontWeight={fontWeight}>
    {id}
  </Id>
);

interface IdProps {
  fontWeight: string;
}

const Id = styled.div<IdProps>`
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ theme }) => theme.blackToWhite};

  &::before {
    content: "#";
    color: ${colors.grey};
  }
`;

export default InvoiceId;
