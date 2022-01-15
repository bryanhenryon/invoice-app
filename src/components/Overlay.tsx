import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { priorities } from "../assets/style/variables";

interface Props {
  children: React.ReactNode;
  centerContent?: boolean;
  maxPriority?: boolean;
  highPriority?: boolean;
}

const Overlay: React.FC<Props> = ({
  children,
  centerContent,
  highPriority,
  maxPriority,
}) => (
  <StyledOverlay
    centerContent={centerContent}
    maxPriority={maxPriority}
    highPriority={highPriority}
    as={motion.div}
    initial={{ background: "rgba(0, 0, 0, 0)" }}
    exit={{ background: "rgba(0, 0, 0, 0)" }}
    animate={{ background: "rgba(0, 0, 0, 0.6)" }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </StyledOverlay>
);

interface StyledOverlayProps {
  centerContent: boolean | undefined;
  maxPriority: boolean | undefined;
  highPriority: boolean | undefined;
}

const StyledOverlay = styled.div<StyledOverlayProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${({ centerContent }) =>
    centerContent &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  ${({ maxPriority }) =>
    maxPriority &&
    css`
      z-index: ${priorities.max};
    `}

      ${({ highPriority }) =>
    highPriority &&
    css`
      z-index: ${priorities.high};
    `}


     ${({ centerContent }) =>
    centerContent &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

export default Overlay;
