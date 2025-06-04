import React, { ReactNode } from 'react';
import { Control, Controller, FieldValues, FieldPath } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';
import { FormLabel, SxProps, Theme } from '@mui/material';

interface PhoneFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: ReactNode;
  sx?: object;
  size?: 'medium' | 'small';
  formLabelSx?: SxProps<Theme>;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
}

function PhoneField<T extends FieldValues>({
  name,
  variant = 'standard',
  control,
  label,
  sx,
  size = 'small',
  formLabelSx,
  readOnly = false,
  disabled = false,
}: PhoneFieldProps<T>) {
  return (
    <>
      <FormLabel
        htmlFor={name}
        sx={{
          color: 'common.black',
          fontWeight: 600,
          width: '100%',
          display: 'inline-block',
          paddingBlock: 1,
          ...formLabelSx,
        }}
      >
        {label}
      </FormLabel>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <MuiTelInput
              {...field}
              fullWidth
              id={name}
              sx={sx}
              size={size}
              disabled={disabled}
              //   label={
              // <FormattedMessage id="Mobile No" defaultMessage={'Mobile No'} />
              //     label
              //   }
              slotProps={{ input: { readOnly } }}
              defaultCountry="IN"
              error={!!error}
              helperText={error ? error.message : null}
              variant={variant}
            />
          </>
        )}
      />
    </>
  );
}

export default PhoneField;
