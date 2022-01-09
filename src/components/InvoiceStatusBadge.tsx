import styled, { css } from "styled-components";

import { colors } from "../assets/style/variables";

interface Props {
  className?: string;
  status: string | undefined;
}

const InvoiceStatusBadge: React.FC<Props> = ({ className, status }) => (
  <Status className={className} status={status}>
    <BulletPoint status={status} />
    {status}
  </Status>
);

interface BulletPointProps {
  status: string | undefined;
}

const BulletPoint = styled.div<BulletPointProps>`
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  margin-right: 0.8rem;
  background: ${({ status, theme }) =>
    status === "Paid"
      ? colors.green
      : status === "Pending"
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

  ${({ status }) =>
    status === "Paid" &&
    css`
      color: ${colors.green};
      background: ${colors.lightGreen};
    `};

  ${({ status }) =>
    status === "Pending" &&
    css`
      background: ${colors.lightOrange};
      color: ${colors.orange};
    `};

  ${({ status, theme }) =>
    status === "Draft" &&
    css`
      color: ${theme.lightDarkQuaternaryToLightGreySecondary};
      background: ${theme.lightGreyQuaternaryTolightGreyQuinary};
    `};
`;

export default InvoiceStatusBadge;
