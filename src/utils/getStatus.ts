/**
 * Determines the status based on start and end dates relative to the current date.
 * @param {string} startDate - The start date in a valid date string format (e.g., "2025-01-01").
 * @param {string} endDate - The end date in a valid date string format (e.g., "2025-01-15").
 * @returns {string} The status based on the dates:
 * - "Open" if the start date is less than the current date and the end date is in the future.
 * - "In Progress" if the current date is between the start date and end date (inclusive).
 * - "Upcoming" if the start date is in the future.
 *
 * Example Usage:
 *  - getStatus({ startDate: "2025-01-01", endDate: "2025-01-15" }); // "In Progress"
 *  - getStatus({ startDate: "2025-04-01", endDate: "2025-08-25" }); // "Open"
 */
export default function getStatus({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate comparisons
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (start <= today && today <= end) {
    return 'In Progress'; // Current date is between start and end dates (inclusive)
  }

  if (start > today) {
    return 'Open'; // Start date is in the future
  }
}
