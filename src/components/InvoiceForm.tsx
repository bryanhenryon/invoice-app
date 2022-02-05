import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled, { css } from "styled-components";

import GoBackButton from "./GoBackButton";
import FormInput from "./FormInput";
import Button from "./Button";
import { Calendar } from "./Calendar";
import InvoiceId from "./InvoiceId";
import InputErrorMessage from "./InputErrorMessage";

import { ReactComponent as TrashIcon } from "../assets/svg/icon-trash.svg";
import { ReactComponent as PlusIcon } from "../assets/svg/icon-plus.svg";
import { ReactComponent as CalendarIcon } from "../assets/svg/icon-calendar.svg";
import { ReactComponent as ChevronDownIcon } from "../assets/svg/icon-chevron-down.svg";
import { breakpoints, colors, priorities } from "../assets/style/variables";

import generateInvoiceId from "../utils/generateInvoiceId";
import parseDate from "../utils/parseDate";
import isValidEmail from "../utils/isValidEmail";

import { Invoice, PaymentTerms } from "../models/Invoice";

interface Props {
  closeDrawer: () => void;
  isSmallViewport: boolean;
  isMediumViewport: boolean;
  invoiceFormData: Invoice | null;
  newInvoice: (data: Invoice) => void;
  editInvoice: (data: Invoice) => void;
  invoices: Invoice[];
}

export const InvoiceForm: React.FC<Props> = ({
  closeDrawer,
  isSmallViewport,
  isMediumViewport,
  invoiceFormData,
  newInvoice,
  editInvoice,
  invoices,
}) => {
  const paymentTermsDropdownValues = [1, 7, 14, 30];
  const [showPaymentTermsDropdown, setShowPaymentTermsDropdown] =
    useState(false);
  const [paymentTerm, setPaymentTerm] = useState<PaymentTerms>(30);

  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [formData, setFormData] = useState<Invoice>({
    id: invoiceFormData?.id || generateInvoiceId(invoices),
    createdAt: invoiceFormData?.createdAt || parseDate(new Date()),
    timestamp: invoiceFormData?.timestamp || new Date(),
    paymentDue:
      invoiceFormData?.paymentDue ||
      parseDate(
        new Date(new Date().setDate(new Date().getDate() + paymentTerm))
      ),
    paymentTerms: invoiceFormData?.paymentTerms || paymentTerm,
    description: invoiceFormData?.description || "",
    clientName: invoiceFormData?.clientName || "",
    clientEmail: invoiceFormData?.clientEmail || "",
    status: invoiceFormData?.status || "",
    senderAddress: {
      street: invoiceFormData?.senderAddress.street || "",
      city: invoiceFormData?.senderAddress.city || "",
      postCode: invoiceFormData?.senderAddress.postCode || "",
      country: invoiceFormData?.senderAddress.country || "",
    },
    clientAddress: {
      street: invoiceFormData?.clientAddress.street || "",
      city: invoiceFormData?.clientAddress.city || "",
      postCode: invoiceFormData?.clientAddress.postCode || "",
      country: invoiceFormData?.clientAddress.country || "",
    },
    items: invoiceFormData?.items || [],
    total: invoiceFormData?.total || 0,
  });

  const [emptyFields, setEmptyFields] = useState({
    senderAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    clientName: false,
    clientEmail: false,
    clientAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    description: false,
  });

  const [noServices, setNoServices] = useState(false);
  const [fieldsEmpty, setFieldsEmpty] = useState(false);
  const [showClientEmailError, setShowClientEmailError] = useState(false);

  const dateButtonLabel = useRef<HTMLDivElement | null>(null);
  const dateButton = useRef<HTMLButtonElement | null>(null);
  const calendar = useRef<HTMLInputElement | null>(null);

  const paymentTermsButton = useRef<HTMLButtonElement | null>(null);
  const paymentTermsDropdown = useRef<HTMLDivElement | null>(null);
  const paymentTermsLabel = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: Event) => {
    if (
      !calendar.current?.contains(e.target as HTMLDivElement) &&
      !dateButton.current?.contains(e.target as HTMLDivElement) &&
      !dateButtonLabel.current?.contains(e.target as HTMLDivElement)
    ) {
      setShowCalendar(false);
    }

    if (
      !paymentTermsDropdown.current?.contains(e.target as HTMLDivElement) &&
      !paymentTermsButton.current?.contains(e.target as HTMLDivElement) &&
      !paymentTermsLabel.current?.contains(e.target as HTMLDivElement)
    ) {
      setShowPaymentTermsDropdown(false);
    }
  };

  const handleDateChange = (calendarDate: Date) => {
    setDate(calendarDate);

    setFormData({
      ...formData,
      timestamp: new Date(calendarDate),
      createdAt: parseDate(calendarDate),
      paymentDue: parseDate(
        new Date(
          calendarDate.setDate(calendarDate.getDate() + formData.paymentTerms)
        )
      ),
    });

    setShowCalendar(false);
  };

  const handlePaymentTermsValueChange = (index: number) => {
    const paymentTerm = paymentTermsDropdownValues[index];

    /*
      Probably a bad solution but I couldn't find how to make 
      a direct comparison with the PaymentTerms type 
    */
    if (
      paymentTerm !== 1 &&
      paymentTerm !== 7 &&
      paymentTerm !== 14 &&
      paymentTerm !== 30
    )
      throw Error("Value is not of type PaymentTerms");

    setPaymentTerm(paymentTerm);

    /* Calendar issue seems to be related to this */
    setFormData({
      ...formData,
      paymentTerms: paymentTerm,

      paymentDue: parseDate(
        new Date(
          new Date().setDate(date.getDate() + paymentTermsDropdownValues[index])
        )
      ),
    });

    setShowPaymentTermsDropdown(false);
  };

  const addService = () =>
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: "",
          quantity: 1,
          price: 0,
        },
      ],
    });

  const setService = (e: ChangeEvent, index: number) => {
    const target = e.target as HTMLInputElement;

    const newArr = [...formData.items];

    newArr[index] = {
      ...newArr[index],
      [target.name]: target.value,
    };

    setFormData({
      ...formData,
      items: newArr,
    });
  };

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item, itemIndex) => itemIndex !== index),
    });
  };

  const focusDateButton = () => {
    dateButton.current?.focus();
    if (!showCalendar) setShowCalendar(true);
  };

  const focusPaymentTermsButton = () => {
    paymentTermsButton.current?.focus();
    if (!showPaymentTermsDropdown)
      setShowPaymentTermsDropdown(!showPaymentTermsDropdown);
  };

  const setSenderAddress = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setFormData((formData) => ({
      ...formData,
      senderAddress: {
        ...formData.senderAddress,
        [target.name]: target.value,
      },
    }));
  };

  const setClientAddress = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setFormData((formData) => ({
      ...formData,
      clientAddress: {
        ...formData.clientAddress,
        [target.name]: target.value,
      },
    }));
  };

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setFormData((formData) => ({
      ...formData,
      [target.name]: target.value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    setFieldsEmpty(false);
    setShowClientEmailError(false);
    setNoServices(false);

    const newEmptyFields = {
      senderAddress: {
        street: false,
        city: false,
        postCode: false,
        country: false,
      },
      clientName: false,
      clientEmail: false,
      clientAddress: {
        street: false,
        city: false,
        postCode: false,
        country: false,
      },
      description: false,
    };

    if (!formData.senderAddress.street.length) {
      newEmptyFields.senderAddress.street = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.senderAddress.city.length) {
      newEmptyFields.senderAddress.city = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.senderAddress.postCode.length) {
      newEmptyFields.senderAddress.postCode = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.senderAddress.country.length) {
      newEmptyFields.senderAddress.country = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.clientName.length) {
      newEmptyFields.clientName = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.clientEmail.length) {
      newEmptyFields.clientEmail = true;
      formIsValid = false;
      setFieldsEmpty(true);
    } else if (!isValidEmail(formData.clientEmail)) {
      formIsValid = false;
      setShowClientEmailError(true);
      newEmptyFields.clientEmail = false;
    }

    if (!formData.clientAddress.street.length) {
      newEmptyFields.clientAddress.street = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.clientAddress.city.length) {
      newEmptyFields.clientAddress.city = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.clientAddress.postCode.length) {
      newEmptyFields.clientAddress.postCode = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.clientAddress.country.length) {
      newEmptyFields.clientAddress.country = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.description.length) {
      newEmptyFields.description = true;
      formIsValid = false;
      setFieldsEmpty(true);
    }

    if (!formData.items.length) {
      formIsValid = false;
      setNoServices(true);
    }

    const areAllItemsNamed = formData.items.every((item) => item.name !== "");
    if (!areAllItemsNamed) {
      formIsValid = false;
      setFieldsEmpty(true);
    }

    setEmptyFields(newEmptyFields);
    return formIsValid;
  };

  const handleSubmit = (e: Event, operation: "draft" | "edit" | "create") => {
    e.preventDefault();

    const total = parseFloat(
      formData.items
        .map((item) => item.price * item.quantity)
        .reduce((prev, curr) => prev + curr, 0)
        .toFixed(2)
    );

    if (operation === "draft") {
      newInvoice({
        ...formData,
        status: "draft",
        total,
      });
    }

    if (operation === "edit") {
      const isFormValid = validateForm();
      if (!isFormValid) return;

      editInvoice({
        ...formData,
        total,
        status: "pending",
      });
    }

    if (operation === "create") {
      const isFormValid = validateForm();
      if (!isFormValid) return;

      newInvoice({
        ...formData,
        status: "pending",
        total,
      });
    }
  };

  return (
    <Container>
      <Form>
        <div>
          {isMediumViewport && (
            <GoBackButtonExtended type='button' action={closeDrawer} />
          )}

          {!invoiceFormData ? (
            <NewInvoiceTitle>Nouvelle facture</NewInvoiceTitle>
          ) : (
            <EditInvoiceTitle>
              Modifier <InvoiceId id={invoiceFormData.id} fontWeight='bold' />
            </EditInvoiceTitle>
          )}
        </div>

        <Content>
          <BillLabelContainer>
            <BillLabel>Facturé par</BillLabel>

            <InputContainer>
              <FormInput
                showError={emptyFields.senderAddress.street}
                autoComplete='off'
                value={formData.senderAddress.street}
                handleInputChange={(e: ChangeEvent) => setSenderAddress(e)}
                type='text'
                name='street'
                label='Adresse'
                id='address'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />
            </InputContainer>

            <Grid>
              <FormInput
                showError={emptyFields.senderAddress.city}
                autoComplete='off'
                value={formData.senderAddress.city}
                handleInputChange={(e: ChangeEvent) => setSenderAddress(e)}
                type='text'
                name='city'
                label='Ville'
                id='city'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />

              <FormInput
                showError={emptyFields.senderAddress.postCode}
                autoComplete='off'
                value={formData.senderAddress.postCode}
                handleInputChange={(e: ChangeEvent) => setSenderAddress(e)}
                type='number'
                name='postCode'
                label='Code postal'
                id='post-code'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />

              <CountryInputContainer>
                <FormInput
                  showError={emptyFields.senderAddress.country}
                  autoComplete='off'
                  value={formData.senderAddress.country}
                  handleInputChange={(e: ChangeEvent) => setSenderAddress(e)}
                  type='text'
                  name='country'
                  label='Pays'
                  id='country'
                  required
                  spellcheck={false}
                  labelFontSize='1.2rem'
                />
              </CountryInputContainer>
            </Grid>
          </BillLabelContainer>

          <BillLabelContainer>
            <BillLabel>Facturer à</BillLabel>

            <InputContainer>
              <FormInput
                showError={emptyFields.clientName}
                autoComplete='off'
                value={formData.clientName}
                handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
                type='text'
                name='clientName'
                label='Nom'
                id='client-name'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />
            </InputContainer>

            <InputContainer>
              <FormInput
                showError={emptyFields.clientEmail || showClientEmailError}
                autoComplete='off'
                value={formData.clientEmail}
                handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
                type='text'
                name='clientEmail'
                label='E-mail'
                id='client-email'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
                placeholder='e.g.email@example.com'
              />
            </InputContainer>

            <InputContainer>
              <FormInput
                showError={emptyFields.clientAddress.street}
                autoComplete='off'
                value={formData.clientAddress.street}
                handleInputChange={(e: ChangeEvent) => setClientAddress(e)}
                type='text'
                name='street'
                label='Adresse'
                id='client-address'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />
            </InputContainer>

            <InputContainer>
              <Grid>
                <FormInput
                  showError={emptyFields.clientAddress.city}
                  autoComplete='off'
                  value={formData.clientAddress.city}
                  handleInputChange={(e: ChangeEvent) => setClientAddress(e)}
                  type='text'
                  name='city'
                  label='Ville'
                  id='client-city'
                  required
                  spellcheck={false}
                  labelFontSize='1.2rem'
                />

                <FormInput
                  showError={emptyFields.clientAddress.postCode}
                  autoComplete='off'
                  value={formData.clientAddress.postCode}
                  handleInputChange={(e: ChangeEvent) => setClientAddress(e)}
                  type='number'
                  name='postCode'
                  label='Code postal'
                  id='client-post-code'
                  required
                  spellcheck={false}
                  labelFontSize='1.2rem'
                />

                <CountryInputContainer>
                  <FormInput
                    showError={emptyFields.clientAddress.country}
                    autoComplete='off'
                    value={formData.clientAddress.country}
                    handleInputChange={(e: ChangeEvent) => setClientAddress(e)}
                    type='text'
                    name='country'
                    label='Pays'
                    id='client-country'
                    required
                    spellcheck={false}
                    labelFontSize='1.2rem'
                  />
                </CountryInputContainer>
              </Grid>
            </InputContainer>

            <InputContainer>
              <InvoiceDatePaymentTermsContainer>
                <InvoiceDateInputContainer>
                  <DateButtonLabel
                    ref={dateButtonLabel}
                    onClick={focusDateButton}
                  >
                    Date de la facture
                  </DateButtonLabel>
                  <DateButton
                    ref={dateButton}
                    type='button'
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <DateValue>{formData?.createdAt}</DateValue>
                    <CalendarIconExtended />
                  </DateButton>

                  <AnimatePresence>
                    {showCalendar && (
                      <Calendar
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ opacity: 0 }}
                        innerRef={calendar}
                        date={formData.timestamp || new Date()}
                        onChange={(date: Date) => handleDateChange(date)}
                      />
                    )}
                  </AnimatePresence>
                </InvoiceDateInputContainer>

                <PaymentTermsContainer>
                  <PaymentTermsLabel
                    ref={paymentTermsLabel}
                    onClick={focusPaymentTermsButton}
                  >
                    Conditions de paiement
                  </PaymentTermsLabel>

                  <PaymentTermsButton
                    onClick={() =>
                      setShowPaymentTermsDropdown(!showPaymentTermsDropdown)
                    }
                    ref={paymentTermsButton}
                    type='button'
                  >
                    <PaymentTermsValue>
                      {formData.paymentTerms === 1
                        ? `${formData.paymentTerms} jour net`
                        : `${formData.paymentTerms} jours net`}
                    </PaymentTermsValue>
                    <ChevronDownIconWrapper active={showPaymentTermsDropdown}>
                      <ChevronDownIcon />
                    </ChevronDownIconWrapper>
                  </PaymentTermsButton>

                  <AnimatePresence>
                    {showPaymentTermsDropdown && (
                      <PaymentTermsDropdown
                        ref={paymentTermsDropdown}
                        as={motion.div}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring" }}
                      >
                        <ul>
                          {paymentTermsDropdownValues.map((value, index) => (
                            <li key={index}>
                              <PaymentTermsDropdownButton
                                active={formData.paymentTerms === value}
                                type='button'
                                onClick={() =>
                                  handlePaymentTermsValueChange(index)
                                }
                              >
                                {value === 1
                                  ? `${value} jour net`
                                  : `${value} jours net`}
                              </PaymentTermsDropdownButton>
                            </li>
                          ))}
                        </ul>
                      </PaymentTermsDropdown>
                    )}
                  </AnimatePresence>
                </PaymentTermsContainer>
              </InvoiceDatePaymentTermsContainer>
            </InputContainer>

            <FormInput
              showError={emptyFields.description}
              autoComplete='off'
              value={formData.description}
              handleInputChange={(e: ChangeEvent) => handleInputChange(e)}
              type='text'
              name='description'
              label='Description du projet'
              id='project-description'
              required
              spellcheck={false}
              labelFontSize='1.2rem'
            />
          </BillLabelContainer>

          <div>
            <ServicesListTitle>Liste des services</ServicesListTitle>

            {formData.items.length !== 0 && (
              <ServicesList>
                {formData.items.map((item, index) => (
                  <li key={index}>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isSmallViewport && (
                        <InputContainer>
                          <FormInput
                            value={item.name}
                            handleInputChange={(e: ChangeEvent) =>
                              setService(e, index)
                            }
                            type='text'
                            name='name'
                            label='Nom'
                            id={`service-name-${index}`}
                            required
                            spellcheck={false}
                            labelFontSize='1.2rem'
                          />
                        </InputContainer>
                      )}

                      <ServiceGrid>
                        {!isSmallViewport && (
                          <FormInput
                            handleInputChange={(e: ChangeEvent) =>
                              setService(e, index)
                            }
                            value={item.name}
                            type='text'
                            name='name'
                            label='Nom'
                            id={`service-name-${index}`}
                            required
                            spellcheck={false}
                            labelFontSize='1.2rem'
                          />
                        )}

                        <FormInput
                          handleInputChange={(e: ChangeEvent) =>
                            setService(e, index)
                          }
                          value={item.quantity.toString()}
                          type='number'
                          name='quantity'
                          label='Qte.'
                          id={`service-quantity-${index}`}
                          required
                          spellcheck={false}
                          labelFontSize='1.2rem'
                          min='1'
                        />

                        <FormInput
                          handleInputChange={(e: ChangeEvent) =>
                            setService(e, index)
                          }
                          value={item.price.toString()}
                          type='number'
                          name='price'
                          label='Prix'
                          id={`service-price-${index}`}
                          required
                          spellcheck={false}
                          labelFontSize='1.2rem'
                        />

                        <Total>
                          <TotalLabel>Total</TotalLabel>
                          <TotalValue>
                            {(+item.quantity * +item.price).toFixed(2)}
                          </TotalValue>
                        </Total>
                        <button
                          type='button'
                          onClick={() => removeService(index)}
                        >
                          <TrashIconExtended />
                        </button>
                      </ServiceGrid>
                    </motion.div>
                  </li>
                ))}
              </ServicesList>
            )}
            <ButtonContainer>
              <AddServiceButton
                fullWidth
                onClick={addService}
                variant='light-to-dark'
                type='button'
              >
                <AddServiceLabelContainer>
                  <PlusIconExtended />
                  Ajouter un service
                </AddServiceLabelContainer>
              </AddServiceButton>
            </ButtonContainer>
          </div>
        </Content>
        <InputErrorMessagesContainer>
          {fieldsEmpty && (
            <InputErrorMessageExtended>
              - Tous les champs doivent être renseignés
            </InputErrorMessageExtended>
          )}

          {showClientEmailError && (
            <InputErrorMessageExtended>
              - Email du client invalide
            </InputErrorMessageExtended>
          )}

          {noServices && (
            <InputErrorMessageExtended>
              - Au minimum 1 service doit être ajouté
            </InputErrorMessageExtended>
          )}
        </InputErrorMessagesContainer>

        {!invoiceFormData ? (
          <NewInvoiceActionButtons>
            <NewInvoiceActionButtonsFirst>
              <Button onClick={closeDrawer} type='button' variant='light'>
                Annuler
              </Button>
            </NewInvoiceActionButtonsFirst>

            <NewInvoiceActionButtonsSecond>
              <Button
                variant='dark'
                onClick={(e: Event) => handleSubmit(e, "draft")}
                type='button'
              >
                Brouillon
              </Button>

              <Button
                type='button'
                onClick={(e: Event) => handleSubmit(e, "create")}
              >
                Enregistrer
              </Button>
            </NewInvoiceActionButtonsSecond>
          </NewInvoiceActionButtons>
        ) : (
          <EditInvoiceActionButtons>
            <Button onClick={closeDrawer} type='button' variant='light'>
              Annuler
            </Button>
            <Button
              type='button'
              onClick={(e: Event) => handleSubmit(e, "edit")}
            >
              Enregistrer
            </Button>
          </EditInvoiceActionButtons>
        )}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.darkToWhite};
  padding: 3.2rem 2.4rem;

  @media ${breakpoints.sm} {
    padding: 5.6rem 5.6rem 0 5.6rem;
  }
`;

const GoBackButtonExtended = styled(GoBackButton)`
  margin-bottom: 2.4rem;
`;

const NewInvoiceTitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 3.2rem;
`;

const EditInvoiceTitle = styled.h2`
  display: flex;
  gap: 0.5rem;
  font-size: 2.4rem;
  margin-bottom: 3.2rem;
`;

const Form = styled.form`
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;

const BillLabelContainer = styled.div`
  margin-bottom: 4.8rem;
`;

const BillLabel = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.violet};
  margin-bottom: 2.4rem;
`;

const InputContainer = styled.div`
  margin-bottom: 2.4rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media ${breakpoints.sm} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InvoiceDatePaymentTermsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.4rem;

  @media ${breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CountryInputContainer = styled.div`
  grid-column: 1 / -1;

  @media ${breakpoints.sm} {
    grid-column: auto;
  }
`;

const InvoiceDateInputContainer = styled.div`
  position: relative;
`;

const DateButtonLabel = styled.div`
  display: block;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
  font-size: 1.2rem;
  cursor: default;
`;

const CalendarIconExtended = styled(CalendarIcon)`
  fill: ${colors.grey};
`;

const DateButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.whiteToLightDark};
  color: ${({ theme }) => theme.darkToWhite};
  width: 100%;
  padding: 1.6rem 2rem;
  border-radius: 0.4rem;
  border: 1px solid
    ${({ theme }) => theme.lightGreySecondaryToLightDarkSecondary};

  &:focus {
    border-color: ${({ theme }) => theme.violetToLightDarkSecondary};

    ${CalendarIconExtended} {
      fill: ${({ theme }) => theme.darkToWhite};
    }
  }
`;

const DateValue = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.darkToWhite};
  align-self: flex-end;
`;

const PaymentTermsContainer = styled.div`
  position: relative;
`;

const PaymentTermsLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
  font-size: 1.2rem;
  cursor: default;
`;

const PaymentTermsButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.whiteToLightDark};
  width: 100%;
  padding: 1.6rem 2rem;
  border-radius: 0.4rem;
  border: 1px solid
    ${({ theme }) => theme.lightGreySecondaryToLightDarkSecondary};

  &:focus {
    border-color: ${({ theme }) => theme.violetToLightDarkSecondary};
  }
`;

const PaymentTermsValue = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.darkToWhite};
`;

interface ChevronDownIconWrapperProps {
  active: boolean;
}

const ChevronDownIconWrapper = styled.span<ChevronDownIconWrapperProps>`
  transition: transform 300ms;

  ${({ active }) =>
    active &&
    css`
      transform: rotate(-180deg);
    `}
`;

const PaymentTermsDropdown = styled.ul`
  position: absolute;
  top: 120%;
  width: 100%;
  z-index: ${priorities.low};
  background: ${({ theme }) => theme.whiteToLightDarkSecondary};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 0.8rem;
`;

interface PaymentTermsDropdownButtonProps {
  active: boolean;
}

const PaymentTermsDropdownButton = styled.button<PaymentTermsDropdownButtonProps>`
  display: flex;
  width: 100%;
  padding: 1.6rem 2.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.darkToWhite};
  border-bottom: 1px solid
    ${({ theme }) => theme.lightVioletTertiaryToLightDark};

  ${({ active }) =>
    active &&
    css`
      color: ${colors.violet};
      font-weight: bold;
    `}

  &:hover {
    color: ${colors.violet};
    font-weight: bold;
  }
`;

const ServicesListTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #777f98;
  margin-bottom: 3.2rem;

  @media ${breakpoints.sm} {
    margin-bottom: 2.4rem;
  }
`;

const ServicesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4.8rem;

  @media ${breakpoints.sm} {
    margin-bottom: 3rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr) min-content;
  align-items: center;
  gap: 1.6rem;

  @media ${breakpoints.sm} {
    grid-template-columns: 1fr 50px 75px 1fr min-content;
  }
`;

const Total = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
`;

const TotalLabel = styled.div`
  display: block;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.lightVioletSecondaryToWhite};
  font-size: 1.2rem;
`;
const TotalValue = styled.div`
  align-self: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.grey};
`;

const TrashIconExtended = styled(TrashIcon)`
  transform: translateY(50%);
  fill: ${colors.grey};

  &:hover {
    fill: ${colors.red};
  }
`;

const PlusIconExtended = styled(PlusIcon)`
  fill: ${({ theme }) => theme.lightVioletSecondaryToLightGreySecondary};
  margin-right: 0.4rem;
  transform: scale(0.8);
`;

const AddServiceButton = styled(Button)`
  &:hover {
    ${PlusIconExtended} {
      fill: ${colors.lightVioletSecondary};
    }
  }
`;

const AddServiceLabelContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  padding-right: 1.6rem;

  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.lightGreySecondaryToLightDarkSecondary};
    border-radius: 0.4rem;
  }

  @media ${breakpoints.sm} {
    overflow-y: auto;
  }
`;

const InputErrorMessagesContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
  margin-top: 3.2rem;
`;

const InputErrorMessageExtended = styled(InputErrorMessage)``;

const NewInvoiceActionButtons = styled.div`
  padding: 3.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: space-between;
  background: ${({ theme }) => theme.whiteToLightDarkTertiary};
  transition: background-color 0.3s;

  @media ${breakpoints.sm} {
    flex-direction: row;
    position: sticky;
    bottom: 0;
  }
`;

const NewInvoiceActionButtonsFirst = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewInvoiceActionButtonsSecond = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media ${breakpoints.sm} {
    flex-direction: row;
  }
`;

const EditInvoiceActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem 0;
  gap: 0.8rem;
  justify-content: flex-end;
  background: ${({ theme }) => theme.whiteToLightDarkTertiary};
  transition: background-color 0.3s;

  @media ${breakpoints.sm} {
    flex-direction: row;
    position: sticky;
    bottom: 0;
  }
`;

export default InvoiceForm;
