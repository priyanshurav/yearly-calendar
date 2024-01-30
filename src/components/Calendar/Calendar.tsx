import React, { useEffect, useState } from 'react';
import { MAXIMUM_YEAR, MINIMUM_YEAR } from '../../constants';
import { IMonth, Theme } from '../../types';
import CalendarMonths from '../CalendarMonths/CalendarMonths';
import CalendarYear from '../CalendarYear/CalendarYear';
import './Calendar.css';

interface Props {
	theme: Theme;
}
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const today = new Date();
function Calendar({ theme }: Props) {
	const [date, setDate] = useState(() => new Date());
	const [yearTemplate, setYearTemplate] = useState<IMonth[]>([]);
	const [yearInputValue, setYearInputValue] = useState('');
	const generateYearTemplate = (): void => {
		const template: IMonth[] = [];
		for (let i = 0; i < 12; i++) {
			const startDay = new Date(date.getFullYear(), i, 1).getDay();
			const numberOfDays = new Date(date.getFullYear(), i + 1, 0).getDate();
			const isToday =
				i === today.getMonth() && date.getFullYear() === today.getFullYear();
			template.push({
				isCurrentMonth: isToday,
				currentDate: isToday ? today.getDate() : 0,
				monthName: months[i],
				numberOfDays,
				startDay,
			});
		}
		setYearTemplate(template);
	};
	const showYearRangeError = (): void => {
		alert(`Year must be between ${MINIMUM_YEAR} and ${MAXIMUM_YEAR}`);
	};
	const handlePrev = (): void => {
		const newYear = date.getFullYear() - 1;
		if (newYear < MINIMUM_YEAR) return showYearRangeError();
		setDate(() => {
			const previousDate = new Date();
			previousDate.setFullYear(newYear);
			return previousDate;
		});
	};
	const handleNext = (): void => {
		const newYear = date.getFullYear() + 1;
		if (newYear > MAXIMUM_YEAR) return showYearRangeError();
		setDate(() => {
			const nextDate = new Date();
			nextDate.setFullYear(newYear);
			return nextDate;
		});
	};
	const handleToday = (): void => {
		if (date.getFullYear() === today.getFullYear()) return;
		setDate(() => {
			const currentDate = new Date();
			currentDate.setFullYear(today.getFullYear());
			return currentDate;
		});
	};
	const handleYearJump = (value: string): void => {
		const prevValue = yearInputValue;
		if (value.length <= 4) setYearInputValue(value);
		if (value.length !== 4) return;
		const newYear = parseInt(value, 10);
		if (newYear > MAXIMUM_YEAR || newYear < MINIMUM_YEAR) {
			setYearInputValue(prevValue);
			return showYearRangeError();
		}
		setDate(() => {
			const date = new Date();
			date.setFullYear(parseInt(value, 10));
			return date;
		});
	};
	useEffect(generateYearTemplate, [date]);
	useEffect(() => {
		setYearInputValue(date.getFullYear().toString());
	}, [yearTemplate, date]);
	return (
		<div className={`calendar ${theme}`}>
			<CalendarYear
				year={yearInputValue}
				onNext={handleNext}
				onPrev={handlePrev}
				onToday={handleToday}
				onYearJump={handleYearJump}
			/>
			<CalendarMonths theme={theme} template={yearTemplate} />
		</div>
	);
}

export default Calendar;
