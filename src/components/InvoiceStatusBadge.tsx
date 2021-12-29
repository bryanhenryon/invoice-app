import styled, { css } from "styled-components";

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
      ? "#33D69F"
      : status === "Pending"
      ? "#FF8F00"
      : theme.draftStatusBadgeBulletPoint};
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
      color: #33d69f;
      background: rgba(51, 214, 159, 0.06);
    `};

  ${({ status }) =>
    status === "Pending" &&
    css`
      background: rgba(255, 143, 0, 0.06);
      color: #ff8f00;
    `};

  ${({ status, theme }) =>
    status === "Draft" &&
    css`
      color: ${theme.draftStatusBadgeColor};
      background: ${theme.draftStatusBadgeBackground};
    `};
`;

export default InvoiceStatusBadge;
