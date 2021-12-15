import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "../assets/style/variables";

export const InvoiceId = ({ id, className, fontSize, fontWeight }) => (
  <Id className={className} fontSize={fontSize} fontWeight={fontWeight}>
    {id}
  </Id>
);

InvoiceId.propTypes = {
  id: PropTypes.string.isRequired,
};

const Id = styled.div`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ theme }) => theme.blackToWhite};

  &::before {
    content: "#";
    color: ${colors.grey};
  }
`;

export default InvoiceId;
