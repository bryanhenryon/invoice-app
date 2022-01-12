import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as ChevronLeftIcon } from "../assets/svg/icon-chevron-left.svg";

interface Props {
  pathname?: string;
  state?: string;
  className?: string;
  action?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const GoBackButton: React.FC<Props> = ({
  pathname,
  state,
  className,
  action,
  type,
}) => {
  const Content = () => (
    <>
      <ChevronLeftIconExtended />
      <GoBackButtonLabel>Retour</GoBackButtonLabel>
    </>
  );

  return pathname ? (
    <Button to={{ pathname: pathname }} state={state} className={className}>
      <Content />
    </Button>
  ) : (
    <Button as='button' type={type} className={className} onClick={action}>
      <Content />
    </Button>
  );
};

const ChevronLeftIconExtended = styled(ChevronLeftIcon)`
  transition: transform 0.2s ease-out;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;

  &:hover {
    ${ChevronLeftIconExtended} {
      transform: translateX(-0.5rem);
    }
  }
`;

const GoBackButtonLabel = styled.span`
  margin-left: 2.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.darkToWhite};
`;

export default GoBackButton;
