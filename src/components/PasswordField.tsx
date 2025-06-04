import React, { ReactNode, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  FieldPath,
  // Form,
} from 'react-hook-form';
import {
  InputAdornment,
  IconButton,
  TextField,
  SxProps,
  Theme,
  FormLabel,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: ReactNode;
  sx?: SxProps<Theme>;
  placeholder?: string;
  size?: 'small' | 'medium';
  formLabelSx?: SxProps<Theme>;
}

export default function PasswordField<T extends FieldValues>({
  label,
  name,
  control,
  sx,
  placeholder,
  size = 'small',
  formLabelSx,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <FormLabel
        sx={{
          color: 'common.black',
          display: 'inline-block',
          fontWeight: 600,
          width: '100%',
          paddingBlock: 1,
          ...formLabelSx,
        }}
        htmlFor={name}
      >
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            id={name}
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            size={size}
            error={!!error}
            autoComplete={name}
            sx={
              // '& input': {
              //   '&:is(:-webkit-autofill, :autofill)': {
              //     border: '3px solid darkorange',
              //     WebkitBoxShadow: '0 0 0 100px #000 inset',
              //     WebkitTextFillColor: 'inherit',
              //   },
              // },
              sx
            }
            placeholder={placeholder}
            fullWidth
            helperText={error?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </>
  );
}
