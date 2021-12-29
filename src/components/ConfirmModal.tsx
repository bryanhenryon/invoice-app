import { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Button from "../components/Button";

import { colors, breakpoints } from "../assets/style/variables";

interface Props {
  title: string;
  text: string;
  cancel: () => void;
  confirm: () => void;
}

const ConfirmModal: React.FC<Props> = ({ title, text, cancel, confirm }) => {
  const confirmModal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  /** Closes the modal when clicking away */
  const handleOutsideClick = (e: Event) => {
    if (
      confirmModal.current &&
      !confirmModal.current.contains(e.target as HTMLDivElement)
    )
      cancel();
  };
  return (
    <Overlay
      as={motion.div}
      initial={{ background: "rgba(0, 0, 0, 0)" }}
      animate={{ background: "rgba(0, 0, 0, 0.6)" }}
    >
      <Modal
        ref={confirmModal}
        as={motion.div}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
      >
        <ModalTitle>{title}</ModalTitle>
        <ModalText>{text}</ModalText>

        <ActionButtons>
          <Button variant='light' onClick={cancel}>
            Annuler
          </Button>

          <Button variant='red' onClick={confirm}>
            OK
          </Button>
        </ActionButtons>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const Modal = styled.div`
  padding: 3.2rem;
  background: ${({ theme }) => theme.whiteToLightDark};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  min-width: 300px;
  max-width: 48rem;
  width: 90%;

  @media ${breakpoints.sm} {
    padding: 4.8rem;
    min-width: 48rem;
    width: auto;
  }
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.blackToWhite};

  @media ${breakpoints.sm} {
    font-size: 2.4rem;
  }
`;

const ModalText = styled.p`
  font-size: 1.2rem;
  color: ${colors.grey};
  margin-top: 1.3rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

export default ConfirmModal;
