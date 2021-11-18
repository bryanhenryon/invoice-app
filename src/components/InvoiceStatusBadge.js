import styled from "styled-components";
import PropTypes from "prop-types";

export const InvoiceStatusBadge = ({ className, status }) => (
  <Status className={className} status={status}>
    <BulletPoint status={status} />
    {status}
  </Status>
);

InvoiceStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const BulletPoint = styled.div`
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

const Status = styled.div`
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
    `
    color: #33D69F;
    background: rgba(51, 214, 159, 0.06);
    `};

  ${({ status }) =>
    status === "Pending" &&
    `
    background: rgba(255, 143, 0, 0.06);
    color: #FF8F00;
    `};

  ${({ status, theme }) =>
    status === "Draft" &&
    `
    color: ${theme.draftStatusBadgeColor};
    background: ${theme.draftStatusBadgeBackground};
    `};
`;

export default InvoiceStatusBadge;
