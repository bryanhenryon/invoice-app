import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { colors, breakpoints } from "../assets/style/variables";
import { InvoicesContainer } from "../assets/style/mixins";

import InvoiceId from "../components/InvoiceId";
import StatusBadge from "../components/InvoiceStatusBadge";
import InvoiceActionButtons from "../components/InvoiceActionButtons";
import GoBackButton from "../components/GoBackButton";

import { Invoice as InvoiceInterface } from "../models/Invoice";

import jsonInvoices from "../data.json";

interface Props {
  isMediumViewport: boolean;
  showDrawer: () => void;
}

const Invoice: React.FC<Props> = ({ isMediumViewport, showDrawer }) => {
  const invoices: InvoiceInterface[] = jsonInvoices;

  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<InvoiceInterface | null>(null);

  /** Checks if the last visited page is Invoices or not in order to trigger the correct animation on render */
  const isFromInvoicesPage = state === "fromInvoices";

  /** Total price of all the services */
  const invoiceGrandTotal = invoice?.items
    .map((item) => item.price * item.quantity)
    .reduce((prev, curr) => prev + curr)
    .toFixed(2);

  // Reset the history state so the correct animation can trigger on refresh
  useEffect(() => {
    window.history.replaceState({}, "");
  }, []);

  useEffect(() => {
    const invoice = invoices.find((invoice) => invoice.id === id);
    if (!invoice) return navigate("/factures");

    setInvoice(invoice);
  }, [id, navigate, invoices]);

  const editInvoice = () => {
    showDrawer();
    // ...
  };

  const deleteInvoice = () => {
    // ...
  };

  const markAsPaid = () => {
    // ...
  };

  return (
    <motion.div
      initial={
        isFromInvoicesPage ? { x: 100, opacity: 0 } : { scale: 0.9, opacity: 0 }
      }
      animate={
        isFromInvoicesPage ? { x: 0, opacity: 1 } : { scale: 1, opacity: 1 }
      }
      transition={{
        duration: 0.8,
        type: "spring",
      }}
    >
      <InvoicesContainer>
        <GoBackButtonExtended pathname='/factures' state='fromInvoice' />
        <Top>
          <Status isMediumViewport={isMediumViewport}>
            <StatusText>Status</StatusText>
            <StatusBadge status={invoice?.status} />
          </Status>

          {!isMediumViewport && (
            <InvoiceActionButtons
              editInvoice={editInvoice}
              deleteInvoice={deleteInvoice}
              isMediumViewport={isMediumViewport}
              markAsPaid={markAsPaid}
            />
          )}
        </Top>

        <InvoiceInfos>
          <Container2>
            <InvoiceIdAndDescription>
              <InvoiceIdExtended id={invoice?.id} fontWeight='bold' />
              <InvoiceDescription>{invoice?.description}</InvoiceDescription>
            </InvoiceIdAndDescription>

            <Container3>
              {invoice?.senderAddress &&
                Object.keys(invoice.senderAddress).map((index) => (
                  <SenderAddress key={index}>
                    {
                      invoice.senderAddress[
                        index as keyof typeof invoice.clientAddress
                      ]
                    }
                  </SenderAddress>
                ))}
            </Container3>
          </Container2>

          <Container4>
            <Container5>
              <InvoiceDateContainer>
                <Label>Date de facturation</Label>
                <InvoiceDate>{invoice?.createdAt}</InvoiceDate>
              </InvoiceDateContainer>

              <div>
                <Label>Paiement dû</Label>
                <PaymentDue>{invoice?.paymentDue}</PaymentDue>
              </div>
            </Container5>

            <Container6>
              <BillTo>Facturé à</BillTo>
              <ClientName>{invoice?.clientName}</ClientName>

              {invoice?.clientAddress &&
                Object.keys(invoice.clientAddress).map((index) => (
                  <ClientAddress key={index}>
                    {
                      invoice.clientAddress[
                        index as keyof typeof invoice.clientAddress
                      ]
                    }
                  </ClientAddress>
                ))}
            </Container6>

            {!isMediumViewport && (
              <SentTo>
                <Label>Envoyé à</Label>
                <ClientEmailAddress>{invoice?.clientEmail}</ClientEmailAddress>
              </SentTo>
            )}
          </Container4>

          {isMediumViewport && (
            <SentTo>
              <Label>Envoyé à</Label>
              <ClientEmailAddress>{invoice?.clientEmail}</ClientEmailAddress>
            </SentTo>
          )}

          <div>
            <Items>
              {!isMediumViewport && (
                <ItemValuesDescriptions>
                  <ItemNameLabel>Prestation</ItemNameLabel>
                  <div>Quantité</div>
                  <div>Prix</div>
                  <div>Total</div>
                </ItemValuesDescriptions>
              )}

              {invoice?.items &&
                invoice?.items.map((item, index) =>
                  isMediumViewport ? (
                    <ItemContainer key={index}>
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
                    <ItemContainerDesktop key={index}>
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
          </div>
        </InvoiceInfos>

        {isMediumViewport && (
          <Bottom>
            <InvoiceActionButtons
              editInvoice={editInvoice}
              deleteInvoice={deleteInvoice}
              isMediumViewport={isMediumViewport}
              markAsPaid={markAsPaid}
            />
          </Bottom>
        )}
      </InvoicesContainer>
    </motion.div>
  );
};

const GoBackButtonExtended = styled(GoBackButton)`
  margin-bottom: 3.2rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.whiteToLightDark};
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

interface StatusProps {
  isMediumViewport: boolean;
}

const Status = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  flex-grow: 2;

  ${({ isMediumViewport }) =>
    isMediumViewport &&
    css`
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
  background: ${({ theme }) => theme.whiteToLightDark};
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
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};

  @media ${breakpoints.md} {
    text-align: right;
  }
`;

const ClientAddress = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
`;

const InvoiceIdAndDescription = styled.div`
  margin-bottom: 3rem;

  @media ${breakpoints.md} {
    margin-bottom: 0;
  }
`;

const InvoiceIdExtended = styled(InvoiceId)`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;

  @media ${breakpoints.sm} {
    font-size: 1.6rem;
  }
`;

const InvoiceDescription = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
`;

const InvoiceDateContainer = styled.div`
  margin-bottom: 1rem;
`;

const InvoiceDate = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.darkToWhite};
`;

const PaymentDue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.darkToWhite};
`;

const Label = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
  margin-bottom: 1.2rem;

  @media ${breakpoints.md} {
    margin-bottom: 1rem;
  }
`;

const BillTo = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
  margin-bottom: 1.2rem;
`;

const SentTo = styled.div`
  margin-bottom: 4rem;
`;

const ClientName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.darkToWhite};
`;

const ClientEmailAddress = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.darkToWhite};
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
  background: ${({ theme }) => theme.lightGreyTertiaryToLightDarkSecondary};
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
  color: ${({ theme }) => theme.darkToWhite};
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
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
  font-weight: 500;

  ${ItemNameLabel} {
    text-align: left;
  }
`;

const ItemPriceAndQuantity = styled.div`
  display: flex;
  align-items: center;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.lightVioletSecondaryToLightVioletTertiary};
`;

const ItemPriceDesktop = styled(ItemPrice)`
  color: ${({ theme }) => theme.lightVioletSecondaryToLightVioletTertiary};
`;

const ItemQuantity = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.lightVioletSecondaryToLightVioletTertiary};

  text-align: center;
  transform: translateX(25%);
`;

const ItemQuantityDesktop = styled(ItemQuantity)`
  ${ItemQuantity};
  color: ${({ theme }) => theme.lightVioletSecondaryToLightVioletTertiary};
`;

const MultiplySymbol = styled.div`
  margin: 0 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.lightVioletSecondaryToGrey};
`;

const ItemTotalPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.darkToWhite};
`;

const GrandTotal = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: space-between;
  padding: 3.1rem 2.4rem;
  background-color: ${({ theme }) => theme.lightDarkQuaternaryToDark};
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
  background: ${({ theme }) => theme.whiteToLightDarkTertiary};
  border-radius: 8px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border: 2px solid transparent;
  transition: background-color 100ms ease-in;
`;

export default Invoice;
