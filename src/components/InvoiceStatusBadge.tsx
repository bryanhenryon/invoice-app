import styled, { css } from "styled-components";

import { colors } from "../assets/style/variables";

interface Props {
  className?: string;
  status: string | undefined;
}

const InvoiceStatusBadge: React.FC<Props> = ({ className, status }) => {
  const getStatus = (): string => {
    switch (status) {
      case "draft":
        return "Brouillon";
      case "pending":
        return "En attente";
      case "paid":
        return "Payée";
      default:
        return "";
    }
  };

  return (
    <Status className={className} status={status}>
      <BulletPoint status={status} />
      {getStatus()}
    </Status>
  );
};

interface BulletPointProps {
  status: string | undefined;
}

const BulletPoint = styled.div<BulletPointProps>`
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  margin-right: 0.8rem;
  background: ${({ status, theme }) =>
    status === "paid"
      ? colors.green
      : status === "pending"
      ? colors.orange
      : theme.lightDarkQuaternaryToLightGreySecondary};
`;

interface StatusProps {
  status: string | undefined;
}

const Status = styled.div<StatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 10rem;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1.3rem 1.7rem;
  border-radius: 6px;
  text-align: center;

  ${({ status }) =>
    status === "paid" &&
    css`
      color: ${colors.green};
      background: ${colors.lightGreen};
    `};

  ${({ status }) =>
    status === "pending" &&
    css`
      background: ${colors.lightOrange};
      color: ${colors.orange};
    `};

  ${({ status, theme }) =>
    status === "draft" &&
    css`
      color: ${theme.lightDarkQuaternaryToLightGreySecondary};
      background: ${theme.lightGreyQuaternaryTolightGreyQuinary};
    `};
`;

export default InvoiceStatusBadge;
