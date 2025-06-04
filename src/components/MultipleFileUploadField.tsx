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
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { AppActionType } from '@/types/appContext';

interface MultiFileFieldProps<T extends FieldValues> {
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

export default function MultiFileField<T extends FieldValues>({
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
}: MultiFileFieldProps<T>) {
  const { dispatch } = useSnakberContext();
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
        multiple
        error={!!error}
        variant="standard"
        value={watch(name) as File[]}
        onChange={(e) => {
          if (Array.isArray(e)) {
            const selectedFiles = e as File[];
            const maxSize = 5 * 1024 * 1024;

            // Get previously selected files
            const previousFiles = (watch(name) as File[]) || [];

            // Combine previous files with new ones
            const allFiles = [...previousFiles, ...selectedFiles];

            // Filter files exceeding size limit
            const validFiles = allFiles.filter((file) => file.size <= maxSize);

            if (validFiles.length !== allFiles.length) {
              dispatch({
                type: AppActionType.ADD_ALERT,
                payload: {
                  message: 'Some files were skipped as they exceed 5MB.',
                  type: 'warning',
                },
              });
            }

            // Ensure files are unique (by name and size)
            const uniqueFiles = validFiles.filter(
              (file, index, self) =>
                index ===
                self.findIndex(
                  (f) => f.name === file.name && f.size === file.size
                )
            );

            // Update the form value
            setValue(name, uniqueFiles as PathValue<T, Path<T>>);
            trigger(name);
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
            // Reset to empty array for multiple file selection
            setValue(name, [] as PathValue<T, Path<T>>);
            trigger(name);
          },
        }}
        helperText={error}
      />
    </>
  );
}
