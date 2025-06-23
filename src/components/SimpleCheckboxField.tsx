import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  SxProps,
  Theme,
} from '@mui/material';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type SimpleCheckboxFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  formLabelSx?: SxProps<Theme>;
};

function SimpleCheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  formLabelSx,
}: SimpleCheckboxFieldProps<T>) {
  return (
    <FormControl component="fieldset">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!field.value}
                  onChange={(_e, checked) => field.onChange(checked)}
                />
              }
              label={label}
            />
            {error && (
              <FormLabel
                sx={{
                  color: 'error.main',
                  fontSize: '0.75rem',
                  paddingTop: '4px',
                  ...formLabelSx,
                }}
              >
                {error.message}
              </FormLabel>
            )}
          </>
        )}
      />
    </FormControl>
  );
}

export default SimpleCheckboxField;
