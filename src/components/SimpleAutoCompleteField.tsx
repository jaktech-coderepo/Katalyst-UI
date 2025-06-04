import React from 'react';
import {
  Autocomplete,
  FormLabel,
  Skeleton,
  TextField,
  TextFieldProps as MuiTextFieldProps,
  SxProps,
  Theme,
} from '@mui/material';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';

interface Option {
  label: string;
  value: string | number;
}

interface SimpleAutoCompleteFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  label?: string;
  options: Option[];
  isLoading?: boolean;
  TextFieldProps?: MuiTextFieldProps;
  formLabelSx?: SxProps<Theme>;
}

export default function SimpleAutoCompleteField<T extends FieldValues>({
  name,
  setValue,
  label,
  options,
  isLoading = false,
  TextFieldProps,
  formLabelSx = {},
}: SimpleAutoCompleteFieldProps<T>) {
  if (isLoading) {
    return <Skeleton variant="rectangular" width={'100%'} height={'100%'} />;
  }

  return (
    <>
      {label && (
        <FormLabel
          id={name}
          sx={{
            color: 'common.black',
            fontWeight: 600,
            display: 'block',
            paddingBlock: 1,
            ...formLabelSx,
          }}
        >
          {label}
        </FormLabel>
      )}
      <Autocomplete
        onChange={(_, newValue) => {
          setValue(name, newValue?.value as PathValue<T, Path<T>>);
        }}
        options={options}
        size="small"
        fullWidth
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            id={name}
            variant="standard"
            fullWidth
            type="text"
            size="small"
            placeholder="--Search--"
            {...TextFieldProps}
          />
        )}
      />
    </>
  );
}
