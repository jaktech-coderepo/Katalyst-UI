import { format } from 'date-fns';

/**
 * Generates a dynamic file name with a custom prefix, formatted date, and dynamic extension.
 * @param fileName - The base file name (e.g., "Fleet-Master").
 * @param extension - The file extension (e.g., "csv", "txt", "json"). Defaults to "txt".
 * @returns {string} Full file name with the date appended and extension.
 * Example Output: "Fleet-Master-10-20-2004-10-01.csv"
 */
export default function generateFileName(
  fileName: string,
  extension: string = 'txt'
): string {
  const formattedDate = format(new Date(), 'MM-dd-yyyy-HH-mm');
  return `${fileName}-${formattedDate}.${extension}`;
}
