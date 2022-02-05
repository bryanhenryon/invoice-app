import styled from "styled-components";

import { breakpoints } from "../assets/style/variables";

import Button from "./Button";

import { Invoice } from "../models/Invoice";

interface Props {
  invoice: Invoice;
  isMediumViewport?: boolean;
  editInvoice: () => void;
  deleteInvoice: () => void;
  markAsPaid: () => void;
}

const InvoiceActionButtons: React.FC<Props> = ({
  isMediumViewport,
  editInvoice,
  deleteInvoice,
  markAsPaid,
  invoice,
}) => (
  <ActionButtons>
    {invoice.status === "pending" && (
      <MarkAsPaid fullWidth={isMediumViewport} onClick={markAsPaid}>
        Marquer comme Payée
      </MarkAsPaid>
    )}

    {invoice.status !== "paid" && (
      <Button
        fullWidth={isMediumViewport}
        variant='light-to-dark'
        onClick={editInvoice}
      >
        Editer
      </Button>
    )}

    <Button fullWidth={isMediumViewport} variant='red' onClick={deleteInvoice}>
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
