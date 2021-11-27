import { useState } from "react";
import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";
import data from "../data.json";

import { ReactComponent as PlusIcon } from "../assets/svg/icon-plus.svg";
import Button from "../components/Button";
import StatusFilter from "../components/StatusFilter";
import Searchbar from "../components/Searchbar";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceCardLarge from "../components/InvoiceCardLarge";
import NoInvoice from "../components/NoInvoice";

export const Invoices = ({ isSmallViewport, isMediumViewport }) => {
  const [invoices, setInvoices] = useState(data);

  const totalInvoicesText = () => {
    switch (invoices.length) {
      case 0:
        return "Aucune facture";
      case 1:
        return isSmallViewport ? "1 facture" : "Il y a 1 facture au total";
      default:
        return isSmallViewport
          ? `${invoices.length} factures`
          : `Il y a ${invoices.length} factures au total`;
    }
  };

  return (
    <Container>
      <Top invoices={invoices}>
        <TitleContainer>
          <Title>Factures</Title>
          <TotalInvoices>{totalInvoicesText()}</TotalInvoices>
        </TitleContainer>

        <StatusFilter isSmallViewport={isSmallViewport} />

        <Button hasIcon hasBoxShadow>
          <PlusIconContainer>
            <PlusIcon />
          </PlusIconContainer>
          <NewInvoice>
            {isSmallViewport ? "Nouv." : "Nouvelle facture"}
          </NewInvoice>
        </Button>
      </Top>

      {invoices.length ? (
        <InvoicesList>
          <Searchbar />
          {invoices.map((invoice) =>
            isMediumViewport ? (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ) : (
              <InvoiceCardLarge key={invoice.id} invoice={invoice} />
            )
          )}
        </InvoicesList>
      ) : (
        <NoInvoice isSmallViewport={isSmallViewport} />
      )}
    </Container>
  );
};

const Container = styled.div``;

const TitleContainer = styled.div`
  flex-grow: 2;
`;

const Top = styled.div`
  display: flex;
  align-items: center;

  ${({ invoices }) =>
    invoices.length &&
    `
    margin-bottom: 3.2rem;
    
    @media ${breakpoints.lg} {
      margin-bottom: 6.5rem;
    }
  `}
`;

const Title = styled.h1`
  margin-bottom: 0.4rem;
  color: ${(props) => props.theme.baseTextColor};

  @media ${breakpoints.md} {
    margin-bottom: 1.4rem;
  }
`;

const TotalInvoices = styled.p`
  color: ${(props) => props.theme.baseGreyTextColor};
  font-weight: 500;
  font-size: 1.2rem;
`;

const PlusIconContainer = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
  border-radius: 50%;
  padding: 1rem;
`;

const NewInvoice = styled.span`
  padding: 0 0.8rem;

  @media ${breakpoints.md} {
    padding: 0 1.6rem;
  }
`;

const InvoicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export default Invoices;
