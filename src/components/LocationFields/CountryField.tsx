import * as React from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  SxProps,
  Theme,
  InputAdornment,
  FormLabel,
} from '@mui/material';
import Image from 'next/image';
import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { Country, ICountry } from 'country-state-city';

interface CountryFieldsProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  name: FieldPath<T>;
  stateName: FieldPath<T>;
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

export default function CountryField<T extends FieldValues>({
  setValue,
  name,
  stateName,
  cityName,
  label = 'Country',
  disabled = false,
  sx,
  watch,
  formLabelSx,
  size = 'small',
  trigger,
  errors,
}: CountryFieldsProps<T>) {
  const [countryValue, setCountryValue] = React.useState<ICountry | null>(null);

  React.useEffect(() => {
    const matchingCountry = Country.getAllCountries().find(
      (country) => country.name === watch(name)
    );
    setCountryValue(matchingCountry || null);
  }, [watch(name), Country.getAllCountries]);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: ICountry | null
  ) => {
    setCountryValue(newValue);
    if (newValue) {
      setValue(name, (newValue?.name ?? '') as PathValue<T, FieldPath<T>>);
      if (trigger) trigger(name);
      return;
    }
    setValue(stateName, '' as PathValue<T, FieldPath<T>>);
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
        value={countryValue}
        onChange={handleChange}
        defaultValue={countryValue}
        options={Country.getAllCountries()}
        disabled={disabled}
        autoHighlight
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <Image
                width={26}
                height={17}
                alt="flag-prop"
                src={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png`}
              />
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
                autoComplete: 'new-password',
              },
              input: {
                ...params.InputProps,
                startAdornment: countryValue ? (
                  <InputAdornment position="start">
                    <Image
                      width={26}
                      height={17}
                      style={{ marginInline: 5, marginInlineStart: 15 }}
                      alt="flag-prop"
                      src={`https://flagcdn.com/w40/${countryValue.isoCode.toLowerCase()}.png`}
                    />
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        )}
      />
    </>
  );
}
