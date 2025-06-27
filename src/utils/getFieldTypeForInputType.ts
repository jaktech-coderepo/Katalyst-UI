/**
 * Maps an input_type value to the appropriate field_type for the backend.
 * @param {string} inputType - The input type selected in the UI. Possible values: "textbox", "number", "boolean", "date", "checkbox", "dropdown"
 * @returns {string} The field type to store for this input type:
 * - "text" for "textbox", "checkbox", or "dropdown"
 * - "int4" for "number"
 * - "boolean" for "boolean"
 * - "timestamp" for "date"
 *
 * Example Usage:
 *  - getFieldTypeForInputType("textbox"); // "text"
 *  - getFieldTypeForInputType("number"); // "int4"
 *  - getFieldTypeForInputType("dropdown"); // "text"
 */
export default function getFieldTypeForInputType(inputType: string): string {
  switch (inputType) {
    case 'textbox':
    case 'checkbox':
    case 'dropdown':
      return 'text';
    case 'number':
      return 'int4';
    case 'boolean':
      return 'boolean';
    case 'date':
      return 'timestamp';
    default:
      return 'text';
  }
}
