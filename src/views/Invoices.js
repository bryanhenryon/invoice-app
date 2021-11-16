import { useState, useEffect } from "react";
import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";

import Button from "../components/Button";

export const Invoices = () => {
  const [isSmallViewport, setIsSmallViewport] = useState(
    window.innerWidth < 576
  );

  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsSmallViewport(window.innerWidth < 576)
    );
  }, []);

  return (
    <StyledInvoices>
      <Top>
        <TitleContainer>
          <Title>Factures</Title>
          <TotalInvoices>
            {isSmallViewport ? "7 factures" : "Il y a 7 factures au total"}
          </TotalInvoices>
        </TitleContainer>

        <StatusFilterButton>
          {isSmallViewport ? "Filtrer" : "Filtrer par status"}
          <ChevronDownIcon
            width='11'
            height='7'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 1l4.228 4.228L9.456 1'
              stroke='#7C5DFA'
              stroke-width='2'
              fill='none'
              fill-rule='evenodd'
            />
          </ChevronDownIcon>
        </StatusFilterButton>

        <Button hasIcon>
          <PlusIconContainer>
            <PlusIcon width='11' height='11' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z'
                fill='#7C5DFA'
                fill-rule='nonzero'
              />
            </PlusIcon>
          </PlusIconContainer>
          <NewInvoice>
            {isSmallViewport ? "Nouv." : "Nouvelle facture"}
          </NewInvoice>
        </Button>
      </Top>
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
  margin-bottom: 6.5rem;
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

const ChevronDownIcon = styled.svg`
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

const PlusIcon = styled.svg``;

const NewInvoice = styled.span`
  padding: 0 0.8rem;

  @media ${breakpoints.md} {
    padding: 0 1.6rem;
  }
`;

export default Invoices;
