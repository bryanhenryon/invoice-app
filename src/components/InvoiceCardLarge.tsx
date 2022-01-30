import styled from "styled-components";

import { ReactComponent as ChevronRightIcon } from "../assets/svg/icon-chevron-right.svg";

import { Card, PaymentDue, ClientName, Total } from "./InvoiceCard";
import InvoiceId from "./InvoiceId";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

import { Invoice as InvoiceInterface } from "../models/Invoice";

interface Props {
  invoice: InvoiceInterface;
}

const InvoiceCardLarge: React.FC<Props> = ({ invoice }) => (
  <CardExtended to={`/factures/${invoice.id}`} state='fromInvoices'>
    <InvoiceIdExtended id={invoice.id} fontWeight='bold' />
    <PaymentDueExtended>Due le {invoice.paymentDue}</PaymentDueExtended>
    <ClientNameExtended>{invoice.clientName}</ClientNameExtended>
    <TotalExtended>{invoice.total}€</TotalExtended>
    <InvoiceStatusBadgeExtended status={invoice.status} />
    <ChevronRightIcon />
  </CardExtended>
);

const CardExtended = styled(Card)`
  display: grid;
  grid-template-columns: 1fr max-content 2fr 1fr max-content min-content;
  align-items: center;
`;

const InvoiceIdExtended = styled(InvoiceId)`
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const PaymentDueExtended = styled(PaymentDue)`
  margin-bottom: 0;
`;

const ClientNameExtended = styled(ClientName)`
  text-align: left;
  margin: 0 3.7rem;
`;

const TotalExtended = styled(Total)`
  margin-right: 4rem;
`;

const InvoiceStatusBadgeExtended = styled(InvoiceStatusBadge)`
  margin-right: 2rem;
`;

export default InvoiceCardLarge;
