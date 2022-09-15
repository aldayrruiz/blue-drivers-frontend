import { Duration, format, formatDuration as formatDurationFns } from 'date-fns';
import es from 'date-fns/locale/es';
import { PipeDates } from './pipe-dates';

export type StringOrDate = string | Date;

export const formatDateTime = (date: StringOrDate) => {
  date = new Date(date);
  return format(date, PipeDates.dateTimeFormat);
};

export const formatDuration = (duration: Duration) => {
  const displayableUnits = ['days', 'hours', 'minutes', 'seconds'];
  return formatDurationFns(duration, { format: displayableUnits, locale: es });
};
