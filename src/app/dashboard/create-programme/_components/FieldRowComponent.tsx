import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TableRow,
  TableCell,
  IconButton,
  FormControl,
  FormHelperText,
  Switch,
  Grid2,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { ProgrammeCreateType } from '@/validation/programmeCreate.schema';
import SimpleTextField from '@/components/SimpleTextField';
import ObjectSelectField from '@/components/ObjectSelectField';
import SimpleCheckboxField from '@/components/SimpleCheckboxField';
import ChipAutocompleteField from '@/components/ChipAutocompleteField';

type FieldRowProps = {
  index: number;
  remove: (index: number) => void;
};

export default function FieldRowComponent({ index, remove }: FieldRowProps) {
  const { control, watch, trigger } = useFormContext<ProgrammeCreateType>();
  const fieldType = watch(`fields.${index}.field_type`);
  const fieldName = watch(`fields.${index}.field_name`);
  const isEmployeeField =
    fieldName === 'employee_id' || fieldName === 'employee_name';
  const qrCodeChecked = watch('qrCode');

  return (
    <TableRow>
      <TableCell>
        <SimpleTextField
          control={control}
          label="Field Name"
          name={`fields.${index}.field_name`}
        />
      </TableCell>
      <TableCell>
        <Grid2 container spacing={2}>
          <Grid2
            size={{
              xs: 12,
              sm:
                fieldType === 'checkbox' || fieldType === 'dropdown'
                  ? 'auto'
                  : 'grow',
            }}
          >
            <ObjectSelectField
              control={control}
              label="Field type"
              name={`fields.${index}.field_type`}
              options={[
                { label: 'Text', value: 'text' },
                { label: 'Number', value: 'int4' },
                { label: 'Boolean', value: 'boolean' },
                { label: 'Date', value: 'timestamp' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Dropdown', value: 'dropdown' },
              ]}
            />
          </Grid2>

          {fieldType === 'checkbox' && (
            <Grid2 size={{ xs: 12, sm: 'grow' }}>
              <ChipAutocompleteField
                control={control}
                name={`fields.${index}.checkbox_value`}
                trigger={trigger}
                label="Checkbox Values"
                placeholder="Add possible value and press Enter"
                maxChips={5}
                textFieldProps={{ variant: 'standard' }}
              />
            </Grid2>
          )}
          {fieldType === 'dropdown' && (
            <Grid2 container size={{ xs: 12, sm: 'grow' }}>
              <Grid2 size={{ xs: 12, sm: 'grow' }}>
                <ChipAutocompleteField
                  control={control}
                  name={`fields.${index}.dropdown_options`}
                  trigger={trigger}
                  label="Dropdown Options"
                  placeholder="Add option and press Enter"
                  maxChips={50}
                  textFieldProps={{ variant: 'standard' }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 'auto' }} alignSelf={'center'}>
                <SimpleCheckboxField
                  control={control}
                  name={`fields.${index}.dropdown_multi`}
                  label="Multi-select"
                />
              </Grid2>
            </Grid2>
          )}
          {qrCodeChecked && (
            <Grid2 size={{ xs: 12, sm: 'auto' }} alignSelf={'center'}>
              <SimpleCheckboxField
                control={control}
                name={`fields.${index}.qrCode`}
                label="qr Code"
              />
            </Grid2>
          )}
        </Grid2>
      </TableCell>
      <TableCell>
        <Controller
          name={`fields.${index}.is_active`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error} fullWidth>
              <Switch {...field} checked={field.value} />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </TableCell>
      <TableCell>
        <IconButton disabled={isEmployeeField} onClick={() => remove(index)}>
          <CancelOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
