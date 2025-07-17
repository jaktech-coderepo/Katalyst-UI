import { getAllCoFacilitatorsByUserId } from '@/action/batch.action'; // update to your real import
import ShowError from '@/components/ShowError';
import {
  Autocomplete,
  FormLabel,
  Skeleton,
  TextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';

interface CreateCoFacilitatorFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  isFormLabel?: boolean;
  TextFieldProps?: MuiTextFieldProps;
  userId: number;
}

export default function CreateCoFacilitatorField<T extends FieldValues>({
  name,
  setValue,
  isFormLabel = true,
  TextFieldProps,
  userId,
}: CreateCoFacilitatorFieldProps<T>) {
  const { data, isLoading } = useQuery({
    queryKey: ['getAllCoFacilitatorsByUserId', userId],
    queryFn: async () => {
      const res = await getAllCoFacilitatorsByUserId(userId);
      return res;
    },
  });

  if (!!data && 'error' in data) {
    return <ShowError {...data} />;
  }

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="100%" />;
  }

  return (
    <>
      {isFormLabel && (
        <FormLabel
          id={name}
          sx={{
            color: 'common.black',
            fontWeight: 600,
            width: '100%',
            display: 'inline-block',
            paddingBlock: 1,
          }}
        >
          Co-Facilitator
        </FormLabel>
      )}
      <Autocomplete
        onChange={(_event, newValue) => {
          setValue(name, newValue?.value as PathValue<T, Path<T>>);
        }}
        options={
          data?.data.map((item) => ({
            label: item.username,
            value: item.userid,
          })) || []
        }
        size="small"
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            id={name}
            variant="standard"
            type="text"
            size="small"
            placeholder="--Search--"
            {...TextFieldProps}
          />
        )}
      />
    </>
  );
}
