import { RefObject, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { motion } from "framer-motion";

import "react-calendar/dist/Calendar.css";

import { breakpoints, colors, priorities } from "../assets/style/variables";

interface Props {
  onChange: (date: Date) => void;
  date: Date;
  innerRef: RefObject<HTMLInputElement>;
  initial: object;
  animate: object;
  exit: object;
}

const CustomCalendar: React.FC<Props> = ({
  onChange,
  date,
  innerRef,
  initial,
  animate,
  exit,
}) => {
  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <CalendarContainer
      as={motion.div}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <Calendar
        showNeighboringMonth={false}
        minDetail={"decade"}
        inputRef={innerRef}
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
        onChange={(date: Date) => onChange(date)}
        value={date}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 120%;
  z-index: ${priorities.low};
  background: ${({ theme }) => theme.whiteToLightDarkSecondary};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 0.8rem;

  @media ${breakpoints.sm} {
    width: auto;
  }

  .react-calendar {
    background: ${({ theme }) => theme.whiteToLightDarkSecondary};
    border: none;
    font-family: inherit;
    width: auto;

    @media ${breakpoints.sm} {
      width: 350px;
    }

    &__navigation__label {
      color: ${({ theme }) => theme.darkToLightVioletTertiary};
      font-weight: bold;
    }

    &__navigation__arrow {
      color: ${colors.violet};
    }

    &__navigation button:enabled:hover,
    &__navigation button:enabled:focus {
      background: none;
    }
    &__navigation button[disabled] {
      background: none;
    }

    &__month-view__weekdays__weekday {
      display: none;
    }

    &__month-view__days__day--weekend {
      color: ${({ theme }) => theme.darkToLightVioletTertiary};
    }

    &__tile {
      max-width: 100%;
      text-align: center;
      padding: 0.75em 0.5em;
      background: none;
      font-weight: 500;
      color: ${({ theme }) => theme.darkToLightVioletTertiary};
    }

    &__tile:disabled {
      background: none;
      color: ${({ theme }) => theme.lightGreySecondaryToGrey};
      cursor: initial;
    }

    &__tile:enabled:hover,
    &__tile:enabled:focus {
      background: none;
    }

    &__tile--now {
      background: none;
    }

    &__tile--now:enabled:hover,
    &__tile--now:enabled:focus {
      background: none;
    }

    &__tile--hasActive {
      background: none;
    }

    &__tile--hasActive:enabled:hover,
    &__tile--hasActive:enabled:focus {
      background: none;
    }

    &__tile--active {
      background: none;
      color: ${colors.violet};
      font-weight: bold;
    }

    &__tile--active:enabled:hover,
    &__tile--active:enabled:focus {
      background: none;
    }

    &--selectRange &__tile--hover {
      background-color: none;
    }
  }
`;

export { CustomCalendar as Calendar };
