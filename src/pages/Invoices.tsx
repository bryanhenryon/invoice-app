import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { ReactComponent as PlusIcon } from "../assets/svg/icon-plus.svg";
import { colors, breakpoints } from "../assets/style/variables";
import { InvoicesContainer } from "../assets/style/mixins";

import { CenteredSpinner } from "../assets/style/mixins";

import Button from "../components/Button";
import StatusFilter from "../components/StatusFilter";
import Searchbar from "../components/Searchbar";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceCardLarge from "../components/InvoiceCardLarge";
import NoInvoice from "../components/NoInvoice";
import SpinnerRoller from "../components/SpinnerRoller";

import { Invoice as InvoiceInterface } from "../models/Invoice";
import checkboxStatus from "../models/checkboxStatus";

import "../firebase/config";

interface Props {
  isSmallViewport: boolean;
  isMediumViewport: boolean;
  showForm: () => void;
  invoices: InvoiceInterface[];
}

const Invoices: React.FC<Props> = ({
  isSmallViewport,
  isMediumViewport,
  showForm,
  invoices,
}) => {
  const { state } = useLocation();

  const [searchbarInputValue, setSearchbarInputValue] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [filteredByStatusInvoices, setFilteredByStatusInvoices] = useState<
    InvoiceInterface[] | null
  >(null);

  // Reset the history state so the correct animation can trigger on refresh
  useEffect(() => {
    window.history.replaceState({}, "");
    setFilteredInvoices(invoices);
  }, [invoices]);

  /** Checks if the last visited page is Invoice or not in order to trigger the correct animation on render */
  const isFromInvoicePage = state === "fromInvoice";

  const totalInvoicesText = () => {
    switch (filteredInvoices?.length) {
      case 0:
        return "Aucune facture";
      case 1:
        return isSmallViewport ? "1 facture" : "Il y a 1 facture au total";
      default:
        return isSmallViewport
          ? `${filteredInvoices?.length} factures`
          : `Il y a ${filteredInvoices?.length} factures au total`;
    }
  };

  const filterByStatus = (checkboxesStatus: checkboxStatus[]) => {
    const isAnyFilterApplied = checkboxesStatus.some(
      (checkbox) => checkbox.checked
    );

    if (isAnyFilterApplied) {
      const newArr = invoices.filter((invoice) =>
        checkboxesStatus.find(
          (checkboxStatus) =>
            checkboxStatus.checked && invoice.status === checkboxStatus.name
        )
      );
      setFilteredByStatusInvoices(newArr);
      return setFilteredInvoices(newArr);
    }

    setFilteredByStatusInvoices(invoices);
    return setFilteredInvoices(invoices);
  };

  useEffect(() => {
    const inv = filteredByStatusInvoices?.length
      ? filteredByStatusInvoices
      : invoices;

    const newInvoices = inv?.filter((invoice: InvoiceInterface) =>
      invoice.clientName
        .toLowerCase()
        .includes(searchbarInputValue.toLowerCase().trim())
    );

    searchbarInputValue === ""
      ? setFilteredInvoices(
          filteredByStatusInvoices?.length ? filteredByStatusInvoices : invoices
        )
      : setFilteredInvoices(newInvoices);
  }, [searchbarInputValue, invoices, filteredByStatusInvoices]);

  return !invoices ? (
    <CenteredSpinner>
      <SpinnerRoller />
    </CenteredSpinner>
  ) : (
    <InvoicesContainer
      as={motion.div}
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
      <Top invoices={invoices}>
        <TitleContainer>
          <Title>Factures</Title>
          <TotalInvoices>{totalInvoicesText()}</TotalInvoices>
        </TitleContainer>

        <StatusFilter
          isSmallViewport={isSmallViewport}
          filterByStatus={(checkboxesStatus) =>
            filterByStatus(checkboxesStatus)
          }
        />

        <Button hasIcon hasBoxShadow onClick={() => showForm()}>
          <PlusIconContainer>
            <PlusIconExtended />
          </PlusIconContainer>

          <NewInvoice>
            {isSmallViewport ? "Nouv." : "Nouvelle facture"}
          </NewInvoice>
        </Button>
      </Top>

      {!invoices?.length && !searchbarInputValue ? (
        <NoInvoice isSmallViewport={isSmallViewport} />
      ) : (
        <InvoicesList>
          <Searchbar
            setSearchbarInputValue={(value: string) =>
              setSearchbarInputValue(value)
            }
            searchbarInputValue={searchbarInputValue}
          />

          {filteredInvoices?.map((invoice) =>
            isMediumViewport ? (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ) : (
              <InvoiceCardLarge key={invoice.id} invoice={invoice} />
            )
          )}
        </InvoicesList>
      )}
    </InvoicesContainer>
  );
};

const TitleContainer = styled.div`
  flex-grow: 2;
`;

interface TopProps {
  invoices: InvoiceInterface[] | null;
}

const Top = styled.div<TopProps>`
  display: flex;
  align-items: center;
  margin-bottom: 3.2rem;

  @media ${breakpoints.lg} {
    margin-bottom: 6.5rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 0.4rem;
  color: ${(props) => props.theme.darkToWhite};

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

const PlusIconExtended = styled(PlusIcon)`
  fill: ${colors.violet};
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
