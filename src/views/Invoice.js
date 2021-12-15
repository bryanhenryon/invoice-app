import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import invoices from "../data.json";

import { ReactComponent as ChevronLeftIcon } from "../assets/svg/icon-chevron-left.svg";
import { colors, breakpoints } from "../assets/style/variables";

import InvoiceId from "../components/InvoiceId";
import StatusBadge from "../components/InvoiceStatusBadge";
import InvoiceActionButtons from "../components/InvoiceActionButtons";

export const Invoice = ({ isMediumViewport }) => {
  const { id } = useParams();
  const history = useHistory();
  const [invoice, setInvoice] = useState({});

  const invoiceGrandTotal = invoice.items
    ?.map((item) => item.price * item.quantity)
    .reduce((prev, curr) => prev + curr)
    .toFixed(2);

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
          <StatusBadge status={invoice.status} />
        </Status>
        {!isMediumViewport && <InvoiceActionButtons />}
      </Top>

      <InvoiceInfos>
        <Container2>
          <InvoiceIdAndDescription>
            <InvoiceIdExtended
              id={invoice.id}
              fontSize='2.4rem'
              fontWeight='bold'
            />
            <InvoiceDescription>{invoice.description}</InvoiceDescription>
          </InvoiceIdAndDescription>
          <Container3>
            {invoice.senderAddress &&
              Object.keys(invoice.senderAddress).map((index) => (
                <SenderAddress key={index}>
                  {invoice.senderAddress[index]}
                </SenderAddress>
              ))}
          </Container3>
        </Container2>

        <Container4>
          <Container5>
            <InvoiceDateContainer>
              <Label>Date de facturation</Label>
              <InvoiceDate>{invoice.createdAt}</InvoiceDate>
            </InvoiceDateContainer>
            <PaymentDueContainer>
              <Label>Paiement dû</Label>
              <PaymentDue>{invoice.paymentDue}</PaymentDue>
            </PaymentDueContainer>
          </Container5>

          <Container6>
            <BillTo>Facturé à</BillTo>
            <ClientName>{invoice.clientName}</ClientName>
            {invoice.clientAddress &&
              Object.keys(invoice.clientAddress).map((index) => (
                <ClientAddress key={index}>
                  {invoice.clientAddress[index]}
                </ClientAddress>
              ))}
          </Container6>

          {!isMediumViewport && (
            <SentTo>
              <Label>Envoyé à</Label>
              <ClientEmailAddress>{invoice.clientEmail}</ClientEmailAddress>
            </SentTo>
          )}
        </Container4>

        {isMediumViewport && (
          <SentTo>
            <Label>Envoyé à</Label>
            <ClientEmailAddress>{invoice.clientEmail}</ClientEmailAddress>
          </SentTo>
        )}

        <OrderSummary>
          <Items>
            {!isMediumViewport && (
              <ItemValuesDescriptions>
                <ItemNameLabel>Prestation</ItemNameLabel>
                <ItemQuantityLabel>Quantité</ItemQuantityLabel>
                <ItemPriceLabel>Prix</ItemPriceLabel>
                <ItemTotalLabel>Total</ItemTotalLabel>
              </ItemValuesDescriptions>
            )}

            {invoice.items &&
              invoice.items.map((item) =>
                isMediumViewport ? (
                  <ItemContainer>
                    <div>
                      <ItemName>{item.name}</ItemName>
                      <ItemPriceAndQuantity>
                        <ItemQuantity>{item.quantity}</ItemQuantity>
                        <MultiplySymbol>x</MultiplySymbol>
                        <ItemPrice>{item.price.toFixed(2)}€</ItemPrice>
                      </ItemPriceAndQuantity>
                    </div>
                    <ItemTotalPrice>
                      {(item.price * item.quantity).toFixed(2)}€
                    </ItemTotalPrice>
                  </ItemContainer>
                ) : (
                  <ItemContainerDesktop>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantityDesktop>{item.quantity}</ItemQuantityDesktop>
                    <ItemPriceDesktop>
                      {item.price.toFixed(2)}€
                    </ItemPriceDesktop>
                    <ItemTotalPrice>
                      {(item.price * item.quantity).toFixed(2)}€
                    </ItemTotalPrice>
                  </ItemContainerDesktop>
                )
              )}
          </Items>

          <GrandTotal>
            <GrandTotalText>Grand Total</GrandTotalText>
            <GrandTotalValue>{invoiceGrandTotal}€</GrandTotalValue>
          </GrandTotal>
        </OrderSummary>
      </InvoiceInfos>

      {isMediumViewport && (
        <Bottom>
          <InvoiceActionButtons isMediumViewport={isMediumViewport} />
        </Bottom>
      )}
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
  color: ${({ theme }) => theme.blackToWhite};
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
  margin-bottom: 1.6rem;

  @media ${breakpoints.md} {
    margin-bottom: 2.4rem;
  }
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
  color: ${({ theme }) => theme.greyToWhite};
  font-weight: 500;
  font-size: 1.2rem;
`;

const Container2 = styled.div`
  justify-content: space-between;
  margin-bottom: 3.1rem;

  @media ${breakpoints.md} {
    display: flex;
  }
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Container4 = styled.div`
  display: flex;
  margin-bottom: 4rem;

  @media ${breakpoints.md} {
    justify-content: space-between;
    margin-right: 6rem;
    margin-bottom: 4.8rem;
  }
`;

const Container5 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 4rem;
`;

const Container6 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InvoiceInfos = styled.div`
  padding: 2.4rem;
  background: ${({ theme }) => theme.invoiceCard};
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border: 2px solid transparent;
  transition: background-color 100ms ease-in;
  margin-bottom: 1.6rem;

  @media ${breakpoints.sm} {
    padding: 4.8rem;
  }

  @media ${breakpoints.md} {
    margin-bottom: 0;
    padding: 4.8rem;
  }
`;

const SenderAddress = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.paleVioletToWhite};

  @media ${breakpoints.md} {
    text-align: right;
  }
`;

const ClientAddress = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.paleVioletToWhite};
`;

const InvoiceIdAndDescription = styled.div`
  margin-bottom: 3rem;

  @media ${breakpoints.md} {
    margin-bottom: 0;
  }
`;

const InvoiceIdExtended = styled(InvoiceId)`
  margin-bottom: 0.5rem;
`;

const InvoiceDescription = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.paleVioletToWhite};
`;

const InvoiceDateContainer = styled.div`
  margin-bottom: 1rem;
`;

const PaymentDueContainer = styled.div``;

const InvoiceDate = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.blackToWhite};
`;

const PaymentDue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.blackToWhite};
`;

const Label = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.paleVioletToWhite};
  margin-bottom: 1.2rem;

  @media ${breakpoints.md} {
    margin-bottom: 1rem;
  }
`;

const BillTo = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.paleVioletToWhite};
  margin-bottom: 1.2rem;
`;

const SentTo = styled.div`
  margin-bottom: 4rem;
`;

const ClientName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.blackToWhite};
`;

const ClientEmailAddress = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.blackToWhite};
`;

const OrderSummary = styled.div``;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
  background: ${({ theme }) => theme.invoiceItemsBackground};
  transition: background-color 0.3s;
  border-radius: 8px 8px 0px 0px;

  @media ${breakpoints.md} {
    padding: 3.2rem;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.blackToWhite};
`;

const ItemContainerDesktop = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  align-items: center;
  text-align: right;

  ${ItemName} {
    text-align: left;
  }
`;

const ItemNameLabel = styled.div``;

const ItemValuesDescriptions = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  align-items: center;
  text-align: right;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.paleVioletToWhite};
  font-weight: 500;

  ${ItemNameLabel} {
    text-align: left;
  }
`;

const ItemQuantityLabel = styled.div``;
const ItemPriceLabel = styled.div``;
const ItemTotalLabel = styled.div``;

const ItemPriceAndQuantity = styled.div`
  display: flex;
  align-items: center;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.paleVioletToGrey};
`;

const ItemPriceDesktop = styled(ItemPrice)`
  color: ${({ theme }) => theme.paleVioletToLightPaleViolet};
`;

const ItemQuantity = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.paleVioletToGrey};
  text-align: center;
  transform: translateX(25%);
`;

const ItemQuantityDesktop = styled(ItemQuantity)`
  ${ItemQuantity};
  color: ${({ theme }) => theme.paleVioletToLightPaleViolet};
`;

const MultiplySymbol = styled.div`
  margin: 0 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.paleVioletToGrey};
`;

const ItemTotalPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.blackToWhite};
`;

const GrandTotal = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: space-between;
  padding: 3.1rem 2.4rem;
  background-color: ${({ theme }) => theme.invoiceGrandTotalBackground};
  transition: background-color 0.3s;
  border-radius: 0px 0px 8px 8px;
`;

const GrandTotalText = styled.div`
  color: ${colors.white};
  font-size: 1.1rem;
`;

const GrandTotalValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.white};
`;

const Bottom = styled.div`
  padding: 2.1rem 2.4rem;
  background: ${({ theme }) => theme.invoiceCard};
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border: 2px solid transparent;
  transition: background-color 100ms ease-in;
`;
