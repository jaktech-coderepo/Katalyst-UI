'use client';

import React from 'react';
import { MuiFileInput } from 'mui-file-input';
import { InputLabel, SxProps, Theme } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

interface SimpleImageFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  label?: string;
  sx?: SxProps<Theme>;
  error?: string;
  watch: UseFormWatch<T>;
  isEditMode?: boolean;
  formLabelSx?: SxProps<Theme>;
  size?: 'small' | 'medium';
}

export default function SimpleImageField<T extends FieldValues>({
  name,
  setValue,
  trigger,
  sx,
  error,
  watch,
  isEditMode = false,
  size = 'small',
  formLabelSx,
  label,
}: SimpleImageFieldProps<T>) {
  return (
    <>
      <InputLabel
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
      </InputLabel>
      <MuiFileInput
        id={name}
        variant="standard"
        error={!!error}
        value={watch(name)}
        onChange={(e) => {
          if (e instanceof File) {
            const selectedFile = e as File;
            if (selectedFile) {
              const maxSize = 5 * 1024 * 1024; // 5MB

              if (selectedFile.size > maxSize) {
                // alert('File size exceeds 5MB.');
                return;
              }

              setValue(name, selectedFile as PathValue<T, Path<T>>);
              trigger(name);
            }
          } else if (isEditMode && typeof e === 'string') {
            // Handle string input for edit mode
            setValue(name, e as PathValue<T, Path<T>>);
          }
        }}
        size={size}
        sx={{ width: 1, ...sx }}
        InputProps={{
          startAdornment: <AttachFileIcon />,
          inputProps: {
            accept: ['image/*'],
          },
        }}
        clearIconButtonProps={{
          title: 'Remove',
          children: <CloseIcon fontSize="small" />,
          onClick: () => {
            // Reset to empty string for edit mode or null for add mode
            setValue(name, (isEditMode ? '' : null) as PathValue<T, Path<T>>);
          },
        }}
        helperText={error}
      />
    </>
  );
}
