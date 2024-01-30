import React from 'react';
import { IMonth, Theme } from '../../types';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import './CalendarMonths.css';

interface Props {
  theme: Theme;
  template: IMonth[];
}
function Calendar({ theme, template }: Props) {
  return (
    <div className={`calendar-months ${theme}`}>
      {template.map((month, index) => {
        return (
          <CalendarMonth
            monthName={month.monthName}
            numberOfDays={month.numberOfDays}
            startDay={month.startDay}
            currentDate={month.currentDate}
            isCurrentMonth={month.isCurrentMonth}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default Calendar;
