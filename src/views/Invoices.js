import { useState, useEffect } from "react";
import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";
import data from "../data.json";

import { ReactComponent as PlusIcon } from "../assets/svg/icon-plus.svg";
import { ReactComponent as ChevronDownIcon } from "../assets/svg/icon-chevron-down.svg";
import Button from "../components/Button";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceCardLarge from "../components/InvoiceCardLarge";

export const Invoices = () => {
  const [invoices, setInvoices] = useState(data);

  const [isSmallViewport, setIsSmallViewport] = useState(
    window.innerWidth < 576
  );

  const [isMediumViewport, setIsMediumViewport] = useState(
    window.innerWidth < 576
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsSmallViewport(window.innerWidth < 576);
      setIsMediumViewport(window.innerWidth < 768);
    });
  }, []);

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
    <StyledInvoices>
      <Top>
        <TitleContainer>
          <Title>Factures</Title>
          <TotalInvoices>{totalInvoicesText()}</TotalInvoices>
        </TitleContainer>

        <StatusFilterButton>
          {isSmallViewport ? "Filtrer" : "Filtrer par status"}
          <StyledChevronDownIcon />
        </StatusFilterButton>

        <Button hasIcon>
          <PlusIconContainer>
            <PlusIcon />
          </PlusIconContainer>
          <NewInvoice>
            {isSmallViewport ? "Nouv." : "Nouvelle facture"}
          </NewInvoice>
        </Button>
      </Top>

      <InvoicesList>
        {invoices.map((invoice) =>
          isMediumViewport ? (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ) : (
            <InvoiceCardLarge key={invoice.id} invoice={invoice} />
          )
        )}
      </InvoicesList>
    </StyledInvoices>
  );
};

const TitleContainer = styled.div`
  flex-grow: 2;
`;

const StyledInvoices = styled.main`
  width: 100%;
  max-width: 730px;
  margin: 0 auto;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;

  @media ${breakpoints.lg} {
    margin-bottom: 6.5rem;
  }
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

const StatusFilterButton = styled.button`
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: 1.8rem;
  color: ${(props) => props.theme.baseTextColor};

  @media ${breakpoints.md} {
    margin-right: 4rem;
  }
`;

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  margin-left: 1.2rem;

  @media ${breakpoints.md} {
    margin-left: 1.6rem;
  }
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
