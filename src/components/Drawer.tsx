import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import Overlay from "./Overlay";

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
        <Content>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
          commodi corrupti doloribus! Itaque non natus veritatis laboriosam
          cumque assumenda tenetur deleniti? Aspernatur quod, maiores quis sed
          id omnis totam. Repudiandae! Unde aliquam suscipit corrupti cumque?
          Modi numquam eaque ullam iste placeat sit repellat quos rerum
          obcaecati explicabo, sequi maxime fugiat animi vitae sunt. Alias
          repudiandae voluptate perspiciatis nisi eveniet modi. Animi, error!
          Asperiores ad ab dolorem aliquam odio neque eius quos dolor.
          Necessitatibus neque dolores vitae omnis itaque nostrum quae quasi
          nobis modi, rerum aspernatur quas numquam delectus. Impedit,
          doloremque. Aliquam quibusdam tempora voluptatum. Ducimus obcaecati
          facilis dicta excepturi harum modi amet. Quos voluptatibus placeat
          asperiores, ab earum nostrum alias aliquid blanditiis suscipit
          assumenda vitae? Obcaecati quis delectus dolorum modi. In vel nisi
          accusamus quod ut eos vero, voluptates reiciendis quisquam incidunt
          tempora perferendis error, asperiores repudiandae soluta vitae est
          illo accusantium eligendi sunt ab! Ex est sequi doloribus itaque? Sint
          perspiciatis doloremque reiciendis eaque exercitationem doloribus
          accusamus libero consectetur eligendi, nostrum aperiam consequatur?
          Iure quisquam dicta aut aspernatur laborum modi, totam architecto quas
          deserunt saepe, ut dolore porro vitae. Animi quam itaque veniam nulla
          minus nam delectus, doloribus deleniti fugiat eligendi eos quisquam.
          Dolorum delectus voluptatibus, facere tenetur earum recusandae veniam
          praesentium quo est obcaecati exercitationem dignissimos suscipit
          error! Quas beatae omnis adipisci repellendus animi sequi facilis
          quia! Totam odit mollitia nihil nulla recusandae tempora, dolores
          delectus incidunt, aspernatur sapiente, in vel aliquam rerum quisquam
          temporibus molestiae suscipit doloremque! Laudantium omnis magni natus
          fugit possimus, cupiditate et voluptas ullam cum quia assumenda minima
          rerum excepturi impedit ea sequi incidunt repellendus, ut culpa
          asperiores? Reiciendis suscipit maiores libero dolor aliquid! Repellat
          repudiandae debitis, laudantium labore reiciendis corporis numquam
          maiores vitae aliquid totam assumenda ducimus amet accusamus? Commodi
          doloribus eos id recusandae! Quasi, perferendis! Placeat repellat
          eveniet sit beatae temporibus porro?
        </Content>
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

  ${({ sidebarHeight }) =>
    sidebarHeight &&
    css`
      height: calc(100vh - ${sidebarHeight}px);
    `}

  background: ${({ theme }) => theme.whiteToBgDark};
  transition: background-color 0.3s;
  color: ${({ theme }) => theme.blackToWhite};
  padding: 5.6rem;

  @media ${breakpoints.sm} {
    border-radius: 0px 2rem 2rem 0px;
  }

  @media ${breakpoints.lg} {
    height: 100%;

    ${({ sidebarWidth }) =>
      sidebarWidth &&
      css`
        padding-left: ${sidebarWidth + 56}px;
      `}
  }
`;

const Content = styled.div`
  height: 100%;
  padding-right: 1.6rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.paleVioletToLighterDark};
    border-radius: 0.4rem;
  }
`;

export default Drawer;
