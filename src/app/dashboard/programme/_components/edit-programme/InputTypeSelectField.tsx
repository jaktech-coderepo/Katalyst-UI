import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';
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
import getFieldTypeForInputType from '@/utils/getFieldTypeForInputType';

type InputTypeSelectFieldProps<T extends FieldValues> = SelectProps & {
  name: Path<T>;
  fieldTypeName: Path<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  options: { label: string | number; value: string | number }[];
  label: string;
  formLabelSx?: SxProps<Theme>;
};

export default function InputTypeSelectField<T extends FieldValues>({
  label,
  name,
  control,
  setValue,
  options = [],
  formLabelSx,
  fieldTypeName,
  ...rest
}: InputTypeSelectFieldProps<T>) {
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
                onChange={(event) => {
                  field.onChange(event);
                  // Set field_type according to input_type
                  if (fieldTypeName) {
                    const newInputType = event.target.value as string;
                    setValue(
                      fieldTypeName,
                      getFieldTypeForInputType(newInputType) as PathValue<
                        T,
                        Path<T>
                      >
                    );
                  }
                }}
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
