import styled from "styled-components";

import { colors, breakpoints } from "../assets/style/variables";

export const LogoutButton = () => (
  <Button>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24'
      height='24'
    >
      <path fill='none' d='M0 0h24v24H0z' />
      <path d='M6.265 3.807l1.147 1.639a8 8 0 1 0 9.176 0l1.147-1.639A9.988 9.988 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12a9.988 9.988 0 0 1 4.265-8.193zM11 12V2h2v10h-2z' />
    </svg>
  </Button>
);

const Button = styled.button`
  padding: 3.2rem;
  fill: #858bb2;
  border-left: 1px solid rgba(133, 139, 178, 0.2);

  &:hover {
    fill: ${colors.white};
  }

  @media ${breakpoints.md} {
    border-left: none;
    border-top: 1px solid rgba(133, 139, 178, 0.2);
  }
`;

export default LogoutButton;
