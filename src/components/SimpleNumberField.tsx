import React, { ReactNode } from 'react';
import { InputLabel, SxProps, TextField, Theme } from '@mui/material';
import { FieldValues, FieldPath, UseFormRegister } from 'react-hook-form';

interface SimpleNumberFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  label: ReactNode;
  placeholder?: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  readOnly?: boolean;
  formLabelSx?: SxProps<Theme>;
}
export default function SimpleNumberField<T extends FieldValues>({
  variant = 'standard',
  register,
  name,
  sx,
  disabled = false,
  label,
  placeholder = '',
  errorMessage,
  readOnly,
  formLabelSx,
  ...rest
}: SimpleNumberFieldProps<T>) {
  return (
    <>
      <InputLabel
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
      </InputLabel>
      <TextField
        id={name}
        {...register(name, {
          valueAsNumber: true,
          setValueAs: (v) => parseFloat(v),
        })}
        sx={{
          '& input[type=number]': {
            // Hides arrows in Chrome, Safari, Edge, Opera
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              display: 'none',
            },
            // Hides arrows in Firefox
            // '-moz-appearance': 'textfield',
          },
          ...sx,
        }}
        variant={variant}
        type="number"
        slotProps={{
          input: {
            readOnly,
          },
        }}
        {...rest}
        size="small"
        disabled={disabled}
        placeholder={placeholder}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />
    </>
  );
}
