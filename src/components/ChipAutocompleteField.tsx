import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormTrigger,
} from 'react-hook-form';
import {
  Autocomplete,
  TextField,
  SxProps,
  Theme,
  TextFieldProps,
  FormLabel,
  Chip,
} from '@mui/material';

type ChipAutocompleteFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  trigger?: UseFormTrigger<T>;
  label?: string;
  placeholder?: string;
  formLabelSx?: SxProps<Theme>;
  textFieldProps?: TextFieldProps;
  showLabelInField?: boolean;
  options?: string[];
  maxChips?: number;
};

export default function ChipAutocompleteField<T extends FieldValues>({
  name,
  control,
  trigger,
  label,
  placeholder = 'Add value and press Enter',
  formLabelSx,
  textFieldProps,
  showLabelInField = false,
  options = [],
  maxChips,
}: ChipAutocompleteFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => (
        <>
          {!showLabelInField && label && (
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
          )}
          <Autocomplete
            multiple
            freeSolo
            options={options}
            filterSelectedOptions
            value={Array.isArray(value) ? value : []}
            onChange={(_, newValue) => {
              let chips = Array.isArray(newValue)
                ? newValue.map((chip) =>
                    typeof chip === 'string' ? chip.trim() : chip
                  )
                : [];
              chips = chips.filter(Boolean); // Remove empty strings
              chips = Array.from(new Set(chips)); // Unique only
              if (maxChips) chips = chips.slice(0, maxChips);
              onChange(chips);
              if (trigger) trigger(name);
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  variant="outlined"
                  color="primary"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                error={!!error}
                helperText={error?.message}
                size="small"
                label={showLabelInField ? label : undefined}
                {...textFieldProps}
              />
            )}
          />
        </>
      )}
    />
  );
}
