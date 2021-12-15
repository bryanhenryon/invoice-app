import styled from "styled-components";
import PropTypes from "prop-types";

import { breakpoints } from "../assets/style/variables";

import Button from "../components/Button";

const InvoiceActionButtons = ({ isMediumViewport }) => (
  <ActionButtons>
    <MarkAsPaid fullWidth={isMediumViewport}>Marquer comme Payée</MarkAsPaid>
    <Edit fullWidth={isMediumViewport} variant='light'>
      Editer
    </Edit>
    <Delete fullWidth={isMediumViewport} variant='red'>
      Supprimer
    </Delete>
  </ActionButtons>
);

InvoiceActionButtons.propTypes = {
  isMediumViewport: PropTypes.bool.isRequired,
};

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media ${breakpoints.md} {
    gap: 0.8rem;
  }
`;

const MarkAsPaid = styled(Button)`
  @media ${breakpoints.md} {
    order: 3;
  }
`;

const Edit = styled(Button)``;
const Delete = styled(Button)``;

export default InvoiceActionButtons;
