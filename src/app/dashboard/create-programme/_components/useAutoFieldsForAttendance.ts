import { ProgrammeCreateType } from '@/validation/programmeCreate.schema';
import { useEffect } from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';

export default function useAutoFieldsForAttendance(
  attendanceChecked: boolean,
  fields: UseFieldArrayReturn<ProgrammeCreateType, 'fields', 'id'>['fields'],
  append: UseFieldArrayReturn<ProgrammeCreateType, 'fields', 'id'>['append'],
  remove: UseFieldArrayReturn<ProgrammeCreateType, 'fields', 'id'>['remove']
) {
  useEffect(() => {
    if (attendanceChecked) {
      const hasEmpId = fields.some((f) => f.field_name === 'emp_id');
      const hasEmpName = fields.some((f) => f.field_name === 'emp_name');
      if (!hasEmpId)
        append({
          field_name: 'emp_id',
          input_type: 'textbox',
          field_type: 'text',
          include_in_qr: true,
          is_active: true,
        });
      if (!hasEmpName)
        append({
          field_name: 'emp_name',
          input_type: 'textbox',
          field_type: 'text',
          include_in_qr: true,
          is_active: true,
        });
    } else {
      const indicesToRemove = fields
        .map((f, idx) =>
          f.field_name === 'emp_id' || f.field_name === 'emp_name' ? idx : -1
        )
        .filter((idx) => idx !== -1)
        .sort((a, b) => b - a);

      indicesToRemove.forEach((idx) => remove(idx));
    }
  }, [attendanceChecked]);
}
