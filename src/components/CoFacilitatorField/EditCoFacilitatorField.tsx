import { getAllCoFacilitatorsByUserId } from '@/action/batch.action';
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
  UseFormWatch,
} from 'react-hook-form';

interface EditCoFacilitatorFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  TextFieldProps?: MuiTextFieldProps;
  userId: number;
}

export default function EditCoFacilitatorField<T extends FieldValues>({
  name,
  watch,
  setValue,
  TextFieldProps,
  userId,
}: EditCoFacilitatorFieldProps<T>) {
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

  const options =
    data?.data.map((item) => ({
      label: item.username,
      value: item.userid,
    })) || [];

  return (
    <>
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
      <Autocomplete
        onChange={(_event, newValue) => {
          setValue(
            name,
            newValue?.value
              ? (newValue.value as PathValue<T, Path<T>>)
              : (0 as PathValue<T, Path<T>>)
          );
        }}
        value={options.find((opt) => opt.value === watch(name)) || null}
        options={options}
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
