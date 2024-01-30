export type Theme = 'light' | 'dark';
export interface IMonth {
  monthName: string;
  numberOfDays: number;
  startDay: number;
  isCurrentMonth: boolean;
  currentDate: number;
}
