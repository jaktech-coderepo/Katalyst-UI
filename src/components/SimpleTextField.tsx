import React from 'react';
import {
  Box,
  FormLabel,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from '@mui/material';
import { Control, Controller, FieldValues, FieldPath } from 'react-hook-form';

type SimpleTextFieldProps<T extends FieldValues> = TextFieldProps & {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  formLabelSx?: SxProps<Theme>;
  isStar?: boolean;
  starSx?: SxProps<Theme>;
};

function SimpleTextField<T extends FieldValues>({
  label,
  name,
  control,
  formLabelSx,
  isStar = false,
  starSx,
  ...rest
}: SimpleTextFieldProps<T>) {
  return (
    <>
      <FormLabel
        sx={{
          color: 'common.black',
          fontWeight: 600,
          width: '100%',
          display: 'inline-block',
          paddingBlock: 1,
          ...formLabelSx,
        }}
        htmlFor={name}
      >
        {label}
        {isStar && (
          <Box component={'span'} sx={{ color: 'red', ...starSx }}>
            *
          </Box>
        )}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            id={name}
            variant="standard"
            {...field}
            type="text"
            error={!!error}
            helperText={error?.message}
            size="small"
            {...rest}
          />
        )}
      />
    </>
  );
}

export default SimpleTextField;
