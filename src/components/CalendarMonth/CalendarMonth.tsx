import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { IMonth } from '../../types';
import CalendarDay from '../CalendarDay/CalendarDay';

const useCalendarMonthStyles = makeStyles({
	root: {
		margin: '5px',
		padding: '0 10px 10px 10px',
	},
});
const useCalendarDaysContainerClasses = makeStyles({
	root: {
		display: 'grid',
		gridTemplateColumns: 'repeat(7, 1fr)',
		gridTemplateRows: 'repeat(5, 1fr)',
		gap: '5px',
	},
});
const useMonthNameStyles = makeStyles({
	root: {
		padding: '13px 0',
		fontSize: '1.3rem',
	},
});
function CalendarMonth({
	numberOfDays,
	monthName,
	startDay,
	currentDate,
	isCurrentMonth,
}: IMonth) {
	const calendarMonthClasses = useCalendarMonthStyles();
	const calendarDaysContainerClasses = useCalendarDaysContainerClasses();
	const monthNameClasses = useMonthNameStyles();
	const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const dates = [
		...Array(startDay).fill(null),
		...Array(numberOfDays)
			.fill(null)
			.map((_, index) => index + 1),
	];
	return (
		<Paper variant="outlined" square classes={calendarMonthClasses}>
			<Typography classes={monthNameClasses} align="center">
				{monthName}
			</Typography>
			<Paper square classes={calendarDaysContainerClasses} elevation={0}>
				{days.map((day, index) => (
					<CalendarDay
						text={day}
						isSunday={index === 0}
						key={index}
						isToday={false}
					/>
				))}
				{dates.map((date, index) =>
					date ? (
						<CalendarDay
							text={date}
							key={index}
							isSunday={index % 7 === 0}
							isToday={isCurrentMonth && date === currentDate}
						/>
					) : (
						<div key={index} />
					)
				)}
			</Paper>
		</Paper>
	);
}

export default CalendarMonth;
