import { getAllProgrammeList } from '@/action/batch.action';
import ShowError from '@/components/ShowError';
import { Autocomplete, FormLabel, Skeleton, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

interface CreateProgrammeFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  label?: string;
}

export default function CreateProgrammeField<T extends FieldValues>({
  name,
  setValue,
  trigger,
  label = 'Programme',
}: CreateProgrammeFieldProps<T>) {
  const { data, isLoading } = useQuery({
    queryKey: ['getAllProgrammeList'],
    queryFn: async () => {
      const res = await getAllProgrammeList();
      return res;
    },
  });

  if (!!data && 'error' in data) {
    return <ShowError {...data} />;
  }

  if (isLoading) {
    return <Skeleton variant="rectangular" width={'100%'} height={35} />;
  }
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
        {label}
      </FormLabel>
      <Autocomplete
        onChange={(_event, newValue) => {
          setValue(name, newValue?.value as PathValue<T, Path<T>>);
          if (trigger) trigger(name);
        }}
        options={
          data?.data.map((item) => ({
            label: item.programme_name,
            value: item.programme_id,
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
          />
        )}
      />
    </>
  );
}
