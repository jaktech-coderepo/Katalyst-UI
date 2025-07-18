/**
 * Converts a date string to a Date object, adding 12:00 PM only if no time is present.
 *
 * @param {string} dateStr - A date string in 'YYYY-MM-DD' or ISO format.
 * @returns {Date} A Date object.
 *
 * Examples:
 * "2025-04-24" -> new Date("2025-04-24T12:00:00")
 * "2025-04-30T18:30:00.000Z" -> new Date("2025-04-30T18:30:00.000Z")
 */
const toSafeDate = (dateStr: string): Date => {
  return new Date(dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00`);
};

export default toSafeDate;
