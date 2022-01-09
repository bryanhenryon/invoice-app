import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "../assets/style/variables";

import InvoiceStatusBadge from "./InvoiceStatusBadge";
import InvoiceId from "./InvoiceId";

import { Invoice as InvoiceInterface } from "../models/Invoice";

interface Props {
  invoice: InvoiceInterface;
}

const whiteToLightDarkTertiary: React.FC<Props> = ({ invoice }) => (
  <Card to={`/factures/${invoice.id}`} state='fromInvoices'>
    <TopContainer>
      <InvoiceIdExtended id={invoice.id} fontWeight='bold' />
      <ClientName>{invoice.clientName}</ClientName>
    </TopContainer>

    <BottomContainer>
      <div>
        <PaymentDue>Due {invoice.paymentDue}</PaymentDue>
        <Total>{invoice.total}€</Total>
      </div>

      <InvoiceStatusBadge status={invoice.status} />
    </BottomContainer>
  </Card>
);

export const Card = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.whiteToLightDark};
  border-radius: 8px;
  padding: 2.4rem;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border: 2px solid transparent;
  transition: 100ms ease-in;

  &:hover {
    border: 2px solid ${colors.violet};
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopContainer = styled(BottomContainer)`
  margin-bottom: 2.4rem;
`;

const InvoiceIdExtended = styled(InvoiceId)`
  font-size: 1.2rem;
`;

export const PaymentDue = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.greyToWhite};
  margin-bottom: 0.8rem;
`;

export const ClientName = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.greyToWhite};
  text-align: right;
`;

export const Total = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.darkToWhite};
`;

export default whiteToLightDarkTertiary;
