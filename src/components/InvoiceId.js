import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "../assets/style/variables";

export const InvoiceId = ({ id }) => (
  <Wrapper>
    <NumberSign>#</NumberSign>
    {id}
  </Wrapper>
);

InvoiceId.propTypes = {
  id: PropTypes.string.isRequired,
};

const NumberSign = styled.span`
  color: ${colors.paleViolet};
`;

const Wrapper = styled.div`
  color: ${({ theme }) => theme.baseTextColor};
  font-size: 1.2rem;
  font-weight: 700;
`;

export default InvoiceId;
