import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import React from 'react';

interface FloatSelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: any[];
  disabled?: boolean;
  size?: 'small' | 'medium';
}

export default function FloatSelectField<T extends FieldValues>({
  label,
  name,
  control,
  options = [],
  disabled = false,
  size = 'medium',
}: FloatSelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl error={!!error} fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
              size={size}
              {...field}
              variant="standard"
              disabled={disabled}
              label={label}
              defaultValue={options[0]}
              fullWidth
            >
              {options.map((newValue, i) => (
                <MenuItem key={i} value={newValue}>
                  {newValue}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        </>
      )}
    />
  );
}
