import { format } from 'date-fns';

/**
 * Converts a Date object into a local ISO-like date string (YYYY-MM-DD).
 * Useful for setting values in date inputs without time or timezone offset.
 *
 * @param {Date} date - A valid JavaScript Date object.
 * @returns {string} The date in 'YYYY-MM-DD' format.
 *
 * Example: new Date("2025-04-24T12:00:00") -> "2025-04-24"
 */
const formatDateToISO = (date: Date): string => format(date, 'yyyy-MM-dd');
export default formatDateToISO;
