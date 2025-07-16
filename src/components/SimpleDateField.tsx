import { FormLabel, SxProps, Theme } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

interface DateFieldProps<T extends FieldValues>
  extends Omit<DatePickerProps<Date>, 'value' | 'onChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  label: React.ReactNode;
  views?: ('year' | 'month' | 'day')[];
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps;
  dateLabelSx?: SxProps<Theme>;
  disablePast?: boolean;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
  maxYearFromCurrent?: number;
  shouldDisableDate?: (day: Date) => boolean;
}

export default function DateField<T extends FieldValues>({
  control,
  label,
  views,
  fullWidth,
  size = 'small',
  sx,
  dateLabelSx,
  name,
  disablePast,
  disableFuture,
  minDate,
  maxDate,
  shouldDisableDate,
  ...rest
}: DateFieldProps<T>) {
  return (
    <>
      <FormLabel
        sx={{
          color: 'common.black',
          fontWeight: 600,
          width: '100%',
          display: 'inline-block',
          paddingBlock: 1,
          ...dateLabelSx,
        }}
        htmlFor={name}
      >
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...rest}
            format="dd/MMM/yyyy"
            formatDensity="spacious"
            views={views}
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              if (date instanceof Date && !Number.isNaN(date.getTime())) {
                field.onChange(date.toISOString().split('T')[0]);
              } else {
                field.onChange('');
              }
            }}
            minDate={minDate}
            maxDate={maxDate}
            shouldDisableDate={shouldDisableDate}
            slotProps={{
              textField: {
                id: name,
                error: !!error,
                helperText: error?.message,
                fullWidth,
                size,
                sx,
                variant: 'standard',
              },
            }}
            disablePast={disablePast}
            disableFuture={disableFuture}
          />
        )}
      />
    </>
  );
}
