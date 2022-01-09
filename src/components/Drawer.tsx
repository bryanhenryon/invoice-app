import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import Overlay from "./Overlay";
import InvoiceForm from "./InvoiceForm";

import { breakpoints } from "../assets/style/variables";

interface Props {
  closeDrawer: () => void;
  sidebarHeight: number | undefined;
  sidebarWidth: number | undefined;
  sidebar: React.RefObject<HTMLDivElement>;
}

const Drawer: React.FC<Props> = ({
  closeDrawer,
  sidebar,
  sidebarHeight,
  sidebarWidth,
}) => {
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  /** Closes the drawer when clicking away */
  const handleOutsideClick = (e: Event) => {
    const hasClickedOnDrawer =
      drawer.current && drawer.current.contains(e.target as HTMLDivElement);

    const hasClickedOnSidebar =
      sidebar.current && sidebar.current.contains(e.target as HTMLDivElement);

    if (!hasClickedOnDrawer && !hasClickedOnSidebar) closeDrawer();
  };

  return (
    <Overlay highPriority>
      <StyledDrawer
        as={motion.div}
        initial={{ x: "-100%" }}
        exit={{ x: "-100%" }}
        animate={{ x: 0 }}
        ref={drawer}
        sidebarWidth={sidebarWidth}
        sidebarHeight={sidebarHeight}
        transition={{
          type: "spring",
          duration: 0.7,
        }}
      >
        <InvoiceForm />
      </StyledDrawer>
    </Overlay>
  );
};

interface StyledDrawerProps {
  sidebarWidth: number | undefined;
  sidebarHeight: number | undefined;
}

const StyledDrawer = styled.div<StyledDrawerProps>`
  position: fixed;
  bottom: 0;
  max-width: 70rem;
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.lightGreySecondaryToLightDarkSecondary};
    border-radius: 0.4rem;
  }

  ${({ sidebarHeight }) =>
    sidebarHeight &&
    css`
      height: calc(100vh - ${sidebarHeight}px);
    `}

  background: ${({ theme }) => theme.whiteToLightDarkTertiary};
  transition: background-color 0.3s;

  @media ${breakpoints.sm} {
    overflow: initial;
    border-radius: 0px 2rem 2rem 0px;
  }

  @media ${breakpoints.lg} {
    height: 100%;

    ${({ sidebarWidth }) =>
      sidebarWidth &&
      css`
        padding-left: ${sidebarWidth}px;
      `}
  }
`;

export default Drawer;
