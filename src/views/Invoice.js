import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import invoices from "../data.json";

import { ReactComponent as ChevronLeftIcon } from "../assets/svg/icon-chevron-left.svg";
import StatusBadge from "../components/InvoiceStatusBadge";
import InvoiceActionButtons from "../components/InvoiceActionButtons";

export const Invoice = ({ isMediumViewport }) => {
  const { id } = useParams();
  const history = useHistory();
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    const invoice = invoices.find((invoice) => invoice.id === id);
    if (!invoice) return history.push("/factures");

    setInvoice(invoice);
  }, [id, history]);

  return (
    <Container>
      <GoBackButton to='/factures'>
        <ChevronLeftIconExtended />
        <GoBackButtonLabel>Retour</GoBackButtonLabel>
      </GoBackButton>

      <Top>
        <Status isMediumViewport={isMediumViewport}>
          <StatusText>Status</StatusText>
          {invoice.status && <StatusBadge status={invoice.status} />}
        </Status>
        {!isMediumViewport && <InvoiceActionButtons />}
      </Top>
    </Container>
  );
};

export default Invoice;
const Container = styled.div``;

const ChevronLeftIconExtended = styled(ChevronLeftIcon)`
  transition: transform 0.2s ease-out;
`;

const GoBackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 3.2rem;

  &:hover {
    ${ChevronLeftIconExtended} {
      transform: translateX(-0.5rem);
    }
  }
`;

const GoBackButtonLabel = styled.div`
  margin-left: 2.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.baseTextColor};
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.invoiceCard};
  border-radius: 8px;
  padding: 2.4rem 3.2rem;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border: 2px solid transparent;
  transition: background-color 100ms ease-in;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 2;

  ${({ isMediumViewport }) =>
    isMediumViewport &&
    `
    justify-content: space-between;
  `}
`;

const StatusText = styled.div`
  margin-right: 1.6rem;
  color: ${({ theme }) => theme.baseGreyTextColor};
  font-weight: 500;
  font-size: 1.2rem;
`;
