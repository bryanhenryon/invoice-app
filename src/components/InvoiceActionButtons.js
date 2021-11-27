import styled from "styled-components";

import Button from "../components/Button";

const InvoiceActionButtons = () => (
  <ActionButtons>
    <Button variant='light'>Editer</Button>
    <Button variant='red'>Supprimer</Button>
    <Button>Marquer comme Payée</Button>
  </ActionButtons>
);

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export default InvoiceActionButtons;
