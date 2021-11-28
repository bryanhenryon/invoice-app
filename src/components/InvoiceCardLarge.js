import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as ChevronRightIcon } from "../assets/svg/icon-chevron-right.svg";
import { Card, PaymentDue, ClientName, Total } from "../components/InvoiceCard";
import InvoiceId from "./InvoiceId";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

export const InvoiceCardLarge = ({ invoice }) => (
  <CardExtended to={`/factures/${invoice.id}`}>
    <InvoiceIdExtended id={invoice.id} />
    <PaymentDueExtended>Due {invoice.paymentDue}</PaymentDueExtended>
    <ClientNameExtended>{invoice.clientName}</ClientNameExtended>
    <TotalExtended>{invoice.total}€</TotalExtended>
    <InvoiceStatusBadgeExtended status={invoice.status} />
    <ChevronRightIcon />
  </CardExtended>
);

InvoiceCardLarge.propTypes = {
  invoice: PropTypes.object.isRequired,
};

const CardExtended = styled(Card)`
  display: grid;
  grid-template-columns: 1fr max-content 2fr 1fr max-content min-content;
  align-items: center;
`;

const InvoiceIdExtended = styled(InvoiceId)`
  margin-right: 1rem;
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
