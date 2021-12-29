import styled from "styled-components";

import { breakpoints } from "../assets/style/variables";

import Button from "../components/Button";

interface Props {
  isMediumViewport?: boolean;
}

const InvoiceActionButtons: React.FC<Props> = ({ isMediumViewport }) => (
  <ActionButtons>
    <MarkAsPaid fullWidth={isMediumViewport}>Marquer comme Payée</MarkAsPaid>

    <Button fullWidth={isMediumViewport} variant='light'>
      Editer
    </Button>

    <Button fullWidth={isMediumViewport} variant='red'>
      Supprimer
    </Button>
  </ActionButtons>
);

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

export default InvoiceActionButtons;
