import { makeStyles, Typography } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import React from 'react';

interface Props {
  text: number | string;
  isSunday: boolean;
  isToday: boolean;
}

const useCalendarDayStyles = makeStyles({
  root: (props: { isSunday: boolean; isToday: boolean }) => ({
    color: props.isSunday ? 'red' : undefined,
    backgroundColor: props.isToday ? blue[500] : undefined,
    fontSize: '1.05rem',
    padding: '3px',
  }),
});

function CalendarDay({ text, isSunday, isToday }: Props) {
  const calendarDayClasses = useCalendarDayStyles({ isSunday, isToday });
  return (
    <Typography classes={calendarDayClasses} align="center">
      {text}
    </Typography>
  );
}

export default CalendarDay;
