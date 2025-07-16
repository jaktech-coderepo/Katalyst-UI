'use client';

import {
  FormLabel,
  IconButton,
  SxProps,
  TextFieldProps,
  TextFieldVariants,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MobileTimePicker, MobileTimePickerProps } from '@mui/x-date-pickers';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import React from 'react';

interface TimeFieldProps<T extends FieldValues>
  extends Omit<MobileTimePickerProps<Date>, 'value' | 'onChange'> {
  control: Control<T>;
  name: FieldPath<T>;
  label: React.ReactNode;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
  variant?: TextFieldVariants | undefined;
}

export default function TimeField<T extends FieldValues>({
  control,
  name,
  label,
  size = 'small',
  fullWidth = true,
  sx,
  labelSx,
  disabled,
  textFieldProps,
  variant = 'standard',
  ...rest
}: TimeFieldProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <FormLabel
        sx={{
          color: 'common.black',
          fontWeight: 600,
          width: '100%',
          display: 'inline-block',
          paddingBlock: 1,
          ...labelSx,
        }}
        htmlFor={name}
      >
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <MobileTimePicker
            {...rest}
            minutesStep={5}
            ampmInClock
            formatDensity="spacious"
            orientation={isMobile ? 'portrait' : 'landscape'}
            defaultValue={new Date('1970-01-10T10:10:00')}
            value={
              field.value ? new Date(`1970-01-01T${field.value}:00`) : null
            }
            onChange={(dt) =>
              field.onChange(dt?.toTimeString().slice(0, 5) || '')
            }
            disabled={disabled}
            slotProps={{
              textField: {
                fullWidth,
                size,
                id: name,
                error: !!error,
                helperText: error?.message,
                variant,
                sx,
                ...textFieldProps,
                InputProps: {
                  endAdornment: (
                    <IconButton size="small">
                      <AccessTimeOutlinedIcon />
                    </IconButton>
                  ),
                },
              },
            }}
          />
        )}
      />
    </>
  );
}
