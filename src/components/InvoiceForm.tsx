import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import GoBackButton from "./GoBackButton";
import FormInput from "./FormInput";
import Button from "./Button";
import { Calendar } from "./Calendar";

import { ReactComponent as TrashIcon } from "../assets/svg/icon-trash.svg";
import { ReactComponent as PlusIcon } from "../assets/svg/icon-plus.svg";
import { ReactComponent as CalendarIcon } from "../assets/svg/icon-calendar.svg";

import { breakpoints, colors } from "../assets/style/variables";

interface Props {
  closeDrawer: () => void;
  isSmallViewport: boolean;
  isMediumViewport: boolean;
}

export const InvoiceForm: React.FC<Props> = ({
  closeDrawer,
  isSmallViewport,
  isMediumViewport,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  const dateButtonLabel = useRef<HTMLDivElement | null>(null);
  const dateButton = useRef<HTMLButtonElement | null>(null);
  const calendar = useRef<HTMLInputElement | null>(null);

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
    )
      setShowCalendar(false);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
    setShowCalendar(false);
  };

  /** Focuses DateButton & open the calendar on click on the button's label  */
  const focusDateButton = () => {
    dateButton.current?.focus();
    setShowCalendar(!showCalendar);
  };

  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "aout",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const parsedDate = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  const ServiceName = () => (
    <FormInput
      value=''
      handleInputChange={() => ""}
      type='text'
      name=''
      label='Nom'
      id='service-name'
      required
      spellcheck={false}
      labelFontSize='1.2rem'
    />
  );

  return (
    <Container>
      <Form>
        <div>
          {isMediumViewport && (
            <GoBackButtonExtended type='button' action={closeDrawer} />
          )}
          <Title>Nouvelle facture</Title>
        </div>

        <Content>
          <BillLabelContainer>
            <BillLabel>Facturé par</BillLabel>

            <InputContainer>
              <FormInput
                value=''
                handleInputChange={() => ""}
                type='text'
                name=''
                label='Adresse'
                id='address'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />
            </InputContainer>

            <Grid>
              <FormInput
                value=''
                handleInputChange={() => ""}
                type='text'
                name=''
                label='Ville'
                id='city'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />

              <FormInput
                value=''
                handleInputChange={() => ""}
                type='text'
                name=''
                label='Code postal'
                id='post-code'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />

              <CountryInputContainer>
                <FormInput
                  value=''
                  handleInputChange={() => ""}
                  type='text'
                  name=''
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
                value=''
                handleInputChange={() => ""}
                type='text'
                name=''
                label='Nom'
                id='client-name'
                required
                spellcheck={false}
                labelFontSize='1.2rem'
              />
            </InputContainer>

            <InputContainer>
              <FormInput
                value=''
                handleInputChange={() => ""}
                type='text'
                name=''
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
                value=''
                handleInputChange={() => ""}
                type='text'
                name=''
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
                  value=''
                  handleInputChange={() => ""}
                  type='text'
                  name=''
                  label='Ville'
                  id='client-city'
                  required
                  spellcheck={false}
                  labelFontSize='1.2rem'
                />

                <FormInput
                  value=''
                  handleInputChange={() => ""}
                  type='text'
                  name=''
                  label='Code postal'
                  id='client-post-code'
                  required
                  spellcheck={false}
                  labelFontSize='1.2rem'
                />

                <CountryInputContainer>
                  <FormInput
                    value=''
                    handleInputChange={() => ""}
                    type='text'
                    name=''
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
                    <DateValue> {parsedDate}</DateValue>
                    <CalendarIconExtended></CalendarIconExtended>
                  </DateButton>

                  <AnimatePresence>
                    {showCalendar && (
                      <Calendar
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ opacity: 0 }}
                        innerRef={calendar}
                        date={date}
                        onChange={(date: Date) => handleDateChange(date)}
                      />
                    )}
                  </AnimatePresence>
                </InvoiceDateInputContainer>

                <FormInput
                  value=''
                  handleInputChange={() => ""}
                  type='text'
                  name=''
                  label='Conditions de paiement'
                  id='payment-terms'
                  required
                  spellcheck={false}
                  labelFontSize='1.2rem'
                />
              </InvoiceDatePaymentTermsContainer>
            </InputContainer>

            <FormInput
              value=''
              handleInputChange={() => ""}
              type='text'
              name=''
              label='Description du projet'
              id='project-description'
              required
              spellcheck={false}
              labelFontSize='1.2rem'
            />
          </BillLabelContainer>

          <Services>
            <ServicesListTitle>Liste des services</ServicesListTitle>

            <ServicesList>
              <Service>
                {isSmallViewport && (
                  <InputContainer>
                    <ServiceName />
                  </InputContainer>
                )}

                <ServiceGrid>
                  {!isSmallViewport && <ServiceName />}
                  <FormInput
                    value=''
                    handleInputChange={() => ""}
                    type='number'
                    name=''
                    label='Qte.'
                    id='service-quantity'
                    required
                    spellcheck={false}
                    labelFontSize='1.2rem'
                  />
                  <FormInput
                    value=''
                    handleInputChange={() => ""}
                    type='number'
                    name=''
                    label='Prix'
                    id='service-price'
                    required
                    spellcheck={false}
                    labelFontSize='1.2rem'
                  />
                  <Total>
                    <TotalLabel>Total</TotalLabel>
                    <TotalValue>400.00</TotalValue>
                  </Total>
                  <button type='button'>
                    <TrashIconExtended />
                  </button>
                </ServiceGrid>
              </Service>
            </ServicesList>
            <ButtonContainer>
              <Button fullWidth variant='light-to-dark' type='button'>
                <AddServiceLabelContainer>
                  <PlusIconExtended />
                  Ajouter un service
                </AddServiceLabelContainer>
              </Button>
            </ButtonContainer>
          </Services>
        </Content>

        <ActionButtons>
          <ActionButtonsFirst>
            <Button onClick={closeDrawer} type='button' variant='light'>
              Annuler
            </Button>
          </ActionButtonsFirst>

          <ActionButtonsSecond>
            <Button variant='dark'>Brouillon</Button>
            <Button>Enregistrer</Button>
          </ActionButtonsSecond>
        </ActionButtons>
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

const Title = styled.h2`
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
  gap: 4.8rem;
  margin-bottom: 4.8rem;

  @media ${breakpoints.sm} {
    margin-bottom: 1.8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Services = styled.div``;

const Service = styled.li``;

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

const AddServiceLabelContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PlusIconExtended = styled(PlusIcon)`
  fill: ${({ theme }) => theme.lightVioletSecondaryToLightGreySecondary};
  margin-right: 0.4rem;
  transform: scale(0.8);
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

const ActionButtons = styled.div`
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

const ActionButtonsFirst = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionButtonsSecond = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media ${breakpoints.sm} {
    flex-direction: row;
  }
`;

export default InvoiceForm;
