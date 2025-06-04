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
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from 'country-state-city';

interface CityFieldsProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  name: FieldPath<T>;
  countryName: FieldPath<T>;
  stateName: FieldPath<T>;
  label?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  watch: UseFormWatch<T>;
  trigger?: UseFormTrigger<T>;
  formLabelSx?: SxProps<Theme>;
  size?: 'small' | 'medium';
  errors?: string;
}

export default function CityField<T extends FieldValues>({
  setValue,
  name,
  countryName,
  stateName,
  label = 'City',
  disabled = false,
  sx,
  watch,
  formLabelSx,
  size = 'small',
  trigger,
  errors,
}: CityFieldsProps<T>) {
  const [cityValue, setCityValue] = React.useState<ICity | null>(null);
  const [selectedState, setSelectedState] = React.useState<IState | null>(null);
  const [selectedCountry, setSelectedCountry] = React.useState<ICountry | null>(
    null
  );

  React.useEffect(() => {
    const curCountry = Country.getAllCountries().find(
      (country) => country.name === watch(countryName)
    );
    setSelectedCountry(curCountry || null);
    const currState = State.getStatesOfCountry(curCountry?.isoCode).find(
      (state) => state.name === watch(stateName)
    );
    setSelectedState(currState || null);
  }, [
    watch(countryName),
    watch(stateName),
    Country.getAllCountries(),
    State.getStatesOfCountry(),
  ]);

  React.useEffect(() => {
    const currCity = City.getCitiesOfState(
      selectedCountry?.isoCode || '',
      selectedState?.isoCode || ''
    ).find((city) => city.name === watch(name));
    setCityValue(currCity || null);
  }, [watch(name), selectedCountry?.isoCode, selectedState?.isoCode]);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: ICity | null
  ) => {
    setCityValue(newValue);
    if (newValue) {
      setValue(name, (newValue?.name ?? '') as PathValue<T, FieldPath<T>>);
      if (trigger) trigger(name);
    }
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
        value={cityValue}
        onChange={handleChange}
        defaultValue={cityValue}
        options={City.getCitiesOfState(
          selectedCountry?.isoCode || '',
          selectedState?.isoCode || ''
        )}
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
