import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import React, { ReactNode } from 'react';

type SelectFieldProps<T extends FieldValues> = SelectProps & {
  name: Path<T>;
  control: Control<T>;
  options: number[] | string[];
  label: string;
  formLabelSx?: SxProps<Theme>;
};

export default function SimpleSelectField<T extends FieldValues>({
  label,
  name,
  control,
  options = [],
  formLabelSx,
  ...rest
}: SelectFieldProps<T>) {
  return (
    <>
      <InputLabel
        id={name}
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
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControl error={!!error} fullWidth>
              <Select
                {...field}
                displayEmpty
                labelId={name}
                variant="standard"
                size="small"
                fullWidth
                renderValue={(ele) =>
                  (ele as ReactNode) || (
                    <Typography color="#a2a2a2">Select --</Typography>
                  )
                }
                {...rest}
              >
                <MenuItem value="">
                  <>Select--</>
                </MenuItem>
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
    </>
  );
}
