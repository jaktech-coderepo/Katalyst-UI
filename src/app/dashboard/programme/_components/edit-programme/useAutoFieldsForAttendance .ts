import { useEffect } from 'react';
import { UseFieldArrayReturn, UseFormSetValue } from 'react-hook-form';
import { ProgrammeEditType } from '@/validation/programmeEdit.schema';

/**
 * Automatically manages the special attendance fields ("emp_id" and "emp_name") in the programme edit form.
 *
 * - Adds "emp_id" and "emp_name" fields if attendance is checked and they are not present.
 * - Removes these fields if attendance is unchecked.
 * - Keeps the "include_in_qr" property for these fields in sync with the value of enableQrChecked.
 *
 * @param attendanceChecked - Whether attendance is enabled
 * @param fields - Field array state from react-hook-form
 * @param append - Function to add a new field to the field array
 * @param remove - Function to remove a field from the field array
 * @param setValue - Function to set a value in the form
 * @param enableQrChecked - Whether QR code is enabled
 */
export default function useAutoFieldsForAttendanceEdit(
  attendanceChecked: boolean,
  fields: UseFieldArrayReturn<ProgrammeEditType, 'fields', 'id'>['fields'],
  append: UseFieldArrayReturn<ProgrammeEditType, 'fields', 'id'>['append'],
  remove: UseFieldArrayReturn<ProgrammeEditType, 'fields', 'id'>['remove'],
  setValue: UseFormSetValue<ProgrammeEditType>,
  enableQrChecked: boolean
) {
  // Add or remove the special fields for attendance based on attendanceChecked
  useEffect(() => {
    const hasEmpId = fields.some((f) => f.field_name === 'emp_id');
    const hasEmpName = fields.some((f) => f.field_name === 'emp_name');
    if (attendanceChecked) {
      if (!hasEmpId)
        append({
          field_name: 'emp_id',
          input_type: 'textbox',
          field_type: 'text',
          include_in_qr: enableQrChecked,
          is_active: true,
        });
      if (!hasEmpName)
        append({
          field_name: 'emp_name',
          input_type: 'textbox',
          field_type: 'text',
          include_in_qr: enableQrChecked,
          is_active: true,
        });
    } else {
      // Remove all attendance fields when attendance is unchecked
      const indicesToRemove = fields
        .map((f, idx) =>
          f.field_name === 'emp_id' || f.field_name === 'emp_name' ? idx : -1
        )
        .filter((idx) => idx !== -1)
        .sort((a, b) => b - a);
      indicesToRemove.forEach((idx) => remove(idx));
    }
    // Only run when attendanceChecked changes
  }, [attendanceChecked]);

  // Sync the include_in_qr property of the attendance fields with enableQrChecked
  useEffect(() => {
    if (enableQrChecked) {
      // When QR is enabled, ensure emp_id and emp_name fields always have include_in_qr set to true
      fields.forEach((field, idx) => {
        if (field.field_name === 'emp_id' || field.field_name === 'emp_name') {
          setValue(`fields.${idx}.include_in_qr`, true);
        }
      });
    } else {
      // When QR is disabled, remove include_in_qr from all fields (cleans up any stray values)
      fields.forEach((_, idx) => {
        setValue(`fields.${idx}.include_in_qr`, undefined);
      });
    }
    // Runs whenever enable_qr checkbox or fields array changes
  }, [enableQrChecked, fields]);
}
