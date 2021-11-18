import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as ChevronRightIcon } from "../assets/svg/icon-chevron-right.svg";
import {
  Card,
  NumberSign,
  InvoiceID,
  PaymentDue,
  ClientName,
  Total,
} from "../components/InvoiceCard";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

export const InvoiceCardLarge = ({ invoice }) => (
  <CardExtended to={`/facture/${invoice.id}`}>
    <InvoiceIDExtended>
      <NumberSign>#</NumberSign>
      {invoice.id}
    </InvoiceIDExtended>
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

const InvoiceIDExtended = styled(InvoiceID)`
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
