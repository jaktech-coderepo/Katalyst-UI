/**
 * Parse a time string into a Date object set to today at that time.
 *
 * Supports these formats:
 *   - "HH:mm"       (hours and minutes)
 *   - "HH:mm:ss"    (hours, minutes, and seconds)
 *
 * If the input is invalid, this function returns `undefined` instead of throwing.
 *
 * @param time - A string representing time in 24‑hour format.
 * @returns A `Date` object for today's date at the given time, or `undefined` if parsing fails.
 *
 * @example
 * // 14:30 → today at 2:30 PM
 * const dt = timeStringToDate("14:30");
 *
 * @example
 * // 09:05:15 → today at 9:05 AM and 15 seconds
 * const dt2 = timeStringToDate("09:05:15");
 */
export default function timeStringToDate(time: string): Date | undefined {
  // 1. Quick sanity check: must be a non-empty string
  if (typeof time !== 'string' || time.trim() === '') {
    // Invalid input; give up
    return undefined;
  }

  // 2. Attempt to match "HH:mm" or "HH:mm:ss"
  const parts = time.split(':');
  if (parts.length < 2 || parts.length > 3) {
    // Wrong number of segments; expected 2 or 3
    return undefined;
  }

  // 3. Extract numeric values
  const [hStr, mStr, sStr] = parts;
  const hours = Number(hStr);
  const minutes = Number(mStr);
  const seconds = parts.length === 3 ? Number(sStr) : 0;

  // 4. Validate numeric ranges
  const validHour = Number.isInteger(hours) && hours >= 0 && hours <= 23;
  const validMinute =
    Number.isInteger(minutes) && minutes >= 0 && minutes <= 59;
  const validSecond =
    Number.isInteger(seconds) && seconds >= 0 && seconds <= 59;

  if (!validHour || !validMinute || !validSecond) {
    // One of the components is out of range
    return undefined;
  }

  // 5. Build a Date for *today* with those values
  const result = new Date();
  result.setHours(hours, minutes, seconds, 0);

  return result;
}
