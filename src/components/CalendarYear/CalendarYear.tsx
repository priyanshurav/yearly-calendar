import {
  IconButton,
  Input,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CalendarToday, ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';

interface Props {
  year: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onYearJump: (value: string) => void;
}
const useCalendarYearStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '20%',
    width: '100%',
    padding: '0 10px',
  },
});
const useIconStyles = makeStyles({
  root: {
    fontSize: '2rem',
  },
});
const useIconButtonStyles = makeStyles({
  root: {
    padding: '5px',
  },
});
const useTodayBtnStyles = makeStyles({
  root: {
    fontSize: '2.5rem',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0',
    right: '0',
  },
});
const useTodayBtnTextStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '38%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '.7rem',
  },
});
const useYearInputStyles = makeStyles({
  root: {
    width: '5ch',
    fontSize: '1.5rem',
  },
  input: {
    textAlign: 'center',
  },
});
const currentDate = new Date().getDate();
function CalendarYear({ year, onNext, onPrev, onToday, onYearJump }: Props) {
  const calendarYearClasses = useCalendarYearStyles();
  const iconClasses = useIconStyles();
  const todayBtnClasses = useTodayBtnStyles();
  const iconButtonClasses = useIconButtonStyles();
  const todayBtnTextClasses = useTodayBtnTextStyles();
  const yearInputClasses = useYearInputStyles();
  return (
    <Paper square classes={calendarYearClasses}>
      <Tooltip title="Previous year" arrow>
        <IconButton onClick={onPrev} classes={iconButtonClasses}>
          <ChevronLeft classes={iconClasses} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Type here to set year" arrow>
        <Input
          value={year}
          onChange={(e) => onYearJump(e.target.value)}
          classes={yearInputClasses}
        />
      </Tooltip>
      <Tooltip title="Next year" arrow>
        <IconButton onClick={onNext} classes={iconButtonClasses}>
          <ChevronRight classes={iconClasses} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Jump to today">
        <IconButton classes={todayBtnClasses} onClick={onToday}>
          <CalendarToday />
          <Typography classes={todayBtnTextClasses}>{currentDate}</Typography>
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

export default CalendarYear;
