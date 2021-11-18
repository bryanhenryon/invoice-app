import styled from "styled-components";
import PropTypes from "prop-types";

import { ReactComponent as IllustrationEmpty } from "../assets/svg/illustration-empty.svg";

export const NoInvoice = ({ isSmallViewport }) => (
  <Container>
    <Content>
      <IllustrationEmptyExtended />
      <Title>Il n'y a rien pour le moment</Title>
      <Text>
        Créez une nouvelle facture en cliquant sur{" "}
        <b>{isSmallViewport ? "Nouv." : "Nouvelle facture"}</b>
      </Text>
    </Content>
  </Container>
);

NoInvoice.propTypes = {
  isSmallViewport: PropTypes.bool.isRequired,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.baseTextColor};
  height: 100%;
  margin: 8rem 0;
`;

const Content = styled.div`
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const IllustrationEmptyExtended = styled(IllustrationEmpty)`
  margin-bottom: 6.4rem;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.baseGreyTextColor};
  line-height: 1.6;
`;
export default NoInvoice;
