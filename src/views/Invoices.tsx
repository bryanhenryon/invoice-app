import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { ReactComponent as PlusIcon } from "../assets/svg/icon-plus.svg";
import { colors, breakpoints } from "../assets/style/variables";

import Button from "../components/Button";
import StatusFilter from "../components/StatusFilter";
import Searchbar from "../components/Searchbar";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceCardLarge from "../components/InvoiceCardLarge";
import NoInvoice from "../components/NoInvoice";

import { Invoice as InvoiceInterface } from "../models/Invoice";

import data from "../data.json";

interface LocationState {
  fromInvoice: boolean;
}

interface Props {
  isSmallViewport: boolean;
  isMediumViewport: boolean;
}

const Invoices: React.FC<Props> = ({ isSmallViewport, isMediumViewport }) => {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>(data);

  const location = useLocation<LocationState>();

  /**
   * Check if the last visited page is Invoice or not in order to trigger the correct animation on render
   */
  const isFromInvoicePage = location?.state?.fromInvoice;

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
    <motion.div
      initial={
        isFromInvoicePage ? { x: -100, opacity: 0 } : { scale: 0.9, opacity: 0 }
      }
      animate={
        isFromInvoicePage ? { x: 0, opacity: 1 } : { scale: 1, opacity: 1 }
      }
      transition={{
        duration: 0.8,
        type: "spring",
      }}
    >
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
    </motion.div>
  );
};

const Container = styled.div``;

const TitleContainer = styled.div`
  flex-grow: 2;
`;

interface TopProps {
  invoices: {}[];
}

const Top = styled.div<TopProps>`
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
  color: ${(props) => props.theme.blackToWhite};

  @media ${breakpoints.md} {
    margin-bottom: 1.4rem;
  }
`;

const TotalInvoices = styled.p`
  color: ${(props) => props.theme.greyToWhite};
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
