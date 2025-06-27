import React, { useEffect } from 'react';
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
import SimpleTextField from '@/components/SimpleTextField';
import SimpleCheckboxField from '@/components/SimpleCheckboxField';
import ChipAutocompleteField from '@/components/ChipAutocompleteField';
import { ProgrammeEditType } from '@/validation/programmeEdit.schema';
import InputTypeSelectField from './InputTypeSelectField';

type FieldRowProps = {
  index: number;
  remove: (index: number) => void;
  disabled: boolean;
};

export default function FieldRowComponent({
  index,
  remove,
  disabled,
}: FieldRowProps) {
  const { control, watch, trigger, setValue } =
    useFormContext<ProgrammeEditType>();
  const inputType = watch(`fields.${index}.input_type`);
  const fieldValues = watch(`fields.${index}.field_values`) || [];
  const hasOptions = watch(`fields.${index}.has_options`);
  useEffect(() => {
    // Automatically set has_options to true if there are values present for checkbox or dropdown fields; otherwise set to false.
    if (inputType === 'checkbox' || inputType === 'dropdown') {
      const shouldBe = fieldValues.length > 0;
      if (hasOptions !== shouldBe) {
        setValue(`fields.${index}.has_options`, shouldBe);
      }
    }
  }, [fieldValues.length, inputType]);
  const qrCodeChecked = watch('enable_qr');

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
                inputType === 'checkbox' || inputType === 'dropdown'
                  ? 'auto'
                  : 'grow',
            }}
          >
            <InputTypeSelectField
              control={control}
              label="Field type"
              name={`fields.${index}.input_type`}
              setValue={setValue}
              fieldTypeName={`fields.${index}.field_type`}
              options={[
                { label: 'Text', value: 'textbox' },
                { label: 'Number', value: 'number' },
                { label: 'Boolean', value: 'boolean' },
                { label: 'Date', value: 'date' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Dropdown', value: 'dropdown' },
              ]}
              disabled={disabled}
            />
          </Grid2>

          {inputType === 'checkbox' && (
            <Grid2 size={{ xs: 12, sm: 'grow' }}>
              <ChipAutocompleteField
                control={control}
                name={`fields.${index}.field_values`}
                trigger={trigger}
                label="Checkbox Values"
                placeholder="Add possible value and press Enter"
                maxChips={5}
                textFieldProps={{ variant: 'standard' }}
              />
            </Grid2>
          )}
          {inputType === 'dropdown' && (
            <Grid2 container size={{ xs: 12, sm: 'grow' }}>
              <Grid2 size={{ xs: 12, sm: 'grow' }}>
                <ChipAutocompleteField
                  control={control}
                  name={`fields.${index}.field_values`}
                  trigger={trigger}
                  label="Dropdown Options"
                  placeholder="Add option and press Enter"
                  maxChips={50}
                  textFieldProps={{ variant: 'standard' }}
                />
              </Grid2>
            </Grid2>
          )}
          {qrCodeChecked && (
            <Grid2 size={{ xs: 12, sm: 'auto' }} alignSelf={'center'}>
              <SimpleCheckboxField
                control={control}
                name={`fields.${index}.include_in_qr`}
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
              <Switch {...field} checked={field.value} disabled={disabled} />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => remove(index)} disabled={disabled}>
          <CancelOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
