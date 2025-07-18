import { getAllBranchList } from '@/action/batch.action';
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
  UseFormWatch,
} from 'react-hook-form';

interface EditBranchFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  watch: UseFormWatch<T>;
}

export default function EditBranchField<T extends FieldValues>({
  name,
  watch,
  setValue,
  trigger,
}: EditBranchFieldProps<T>) {
  const { data, isLoading } = useQuery({
    queryKey: ['getAllBranchList'],
    queryFn: async () => {
      const res = await getAllBranchList();
      return res;
    },
  });

  if (!!data && 'error' in data) {
    return <ShowError {...data} />;
  }

  if (isLoading) {
    return <Skeleton variant="rectangular" width={'100%'} height={'100%'} />;
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
        Branch Name
      </FormLabel>
      <Autocomplete
        onChange={(_event, newValue) => {
          setValue(
            name,
            newValue?.value
              ? (newValue.value as PathValue<T, Path<T>>)
              : (0 as PathValue<T, Path<T>>)
          );
          if (trigger) trigger(name);
        }}
        value={
          data?.data
            .filter((item) => item.branch_id === watch(name))
            .map((item) => ({
              label: item.branch_name,
              value: item.branch_id,
            }))[0] || null
        }
        options={
          data?.data.map((item) => ({
            label: item.branch_name,
            value: item.branch_id,
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
