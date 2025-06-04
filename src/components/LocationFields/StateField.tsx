import * as React from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  SxProps,
  Theme,
  FormLabel,
} from '@mui/material';
import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { Country, ICountry, IState, State } from 'country-state-city';

interface StateFieldsProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  name: FieldPath<T>;
  countryName: FieldPath<T>;
  cityName: FieldPath<T>;
  label?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  watch: UseFormWatch<T>;
  trigger?: UseFormTrigger<T>;
  formLabelSx?: SxProps<Theme>;
  size?: 'small' | 'medium';
  errors?: string;
}

export default function StateField<T extends FieldValues>({
  setValue,
  name,
  countryName,
  cityName,
  label = 'State',
  disabled = false,
  sx,
  watch,
  formLabelSx,
  size = 'small',
  trigger,
  errors,
}: StateFieldsProps<T>) {
  const [stateValue, setStateValue] = React.useState<IState | null>(null);
  const [selectedCountry, setSelectedCountry] = React.useState<ICountry | null>(
    null
  );

  React.useEffect(() => {
    const curCountry = Country.getAllCountries().find(
      (country) => country.name === watch(countryName)
    );
    setSelectedCountry(curCountry || null);
  }, [watch(countryName), Country.getAllCountries()]);

  React.useEffect(() => {
    const matchingCountry = State.getStatesOfCountry(
      selectedCountry?.isoCode
    ).find((state) => state.name === watch(name));
    setStateValue(matchingCountry || null);
  }, [watch(name), selectedCountry?.isoCode, State.getStatesOfCountry]);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: IState | null
  ) => {
    setStateValue(newValue);
    if (newValue) {
      setValue(name, (newValue?.name ?? '') as PathValue<T, FieldPath<T>>);
      if (trigger) trigger(name);
      return;
    }
    setValue(cityName, '' as PathValue<T, FieldPath<T>>);
  };

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
      </FormLabel>
      <Autocomplete
        value={stateValue}
        onChange={handleChange}
        defaultValue={stateValue}
        options={State.getStatesOfCountry(selectedCountry?.isoCode)}
        disabled={disabled}
        autoHighlight
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component="li" {...optionProps}>
              {option.name}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            size={size}
            disabled={disabled}
            sx={sx}
            placeholder="Select --"
            error={!!errors}
            helperText={errors || ''}
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: 'state',
              },
            }}
          />
        )}
      />
    </>
  );
}
