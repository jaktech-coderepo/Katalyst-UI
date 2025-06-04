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
import React from 'react';

type ObjectSelectFieldProps<T extends FieldValues> = SelectProps & {
  name: Path<T>;
  control: Control<T>;
  options: { label: string | number; value: string | number }[];
  label: string;
  formLabelSx?: SxProps<Theme>;
};

export default function ObjectSelectField<T extends FieldValues>({
  label,
  name,
  control,
  options = [],
  formLabelSx,
  ...rest
}: ObjectSelectFieldProps<T>) {
  return (
    <>
      <InputLabel
        id={name}
        sx={{
          color: 'common.black',
          fontWeight: 600,
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
                variant="standard"
                labelId={name}
                value={field.value ?? ''}
                fullWidth
                renderValue={(ele) => {
                  const currValue = options.find((e) => e.value === ele)?.label;
                  return (
                    currValue || (
                      <Typography color="#a2a2a2">Select --</Typography>
                    )
                  );
                }}
                {...rest}
              >
                <MenuItem value="">
                  <>Select--</>
                </MenuItem>
                {options.map((newValue, i) => (
                  <MenuItem key={i} value={newValue.value}>
                    {newValue.label}
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
