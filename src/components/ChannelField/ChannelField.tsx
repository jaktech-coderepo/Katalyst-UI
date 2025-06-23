import { getAllChannelList } from '@/action/user.action';
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
  UseFormTrigger,
} from 'react-hook-form';

interface ChannelFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  lable?: string;
  TextFieldProps?: MuiTextFieldProps;
  error?: string;
}

export default function ChannelField<T extends FieldValues>({
  name,
  setValue,
  trigger,
  lable = 'Select Channel',
  TextFieldProps,
  error,
}: ChannelFieldProps<T>) {
  const { data, isLoading } = useQuery({
    queryKey: ['getAllChannelList'],
    queryFn: async () => {
      const res = await getAllChannelList();
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
      {lable && (
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
          {lable}
        </FormLabel>
      )}
      <Autocomplete
        onChange={(_event, newValue) => {
          setValue(name, newValue?.value as PathValue<T, Path<T>>);
          trigger(name);
        }}
        options={
          data?.data.map((item) => ({
            label: item.channelName,
            value: item.channelId,
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
            error={!!error}
            helperText={error}
            {...TextFieldProps}
          />
        )}
      />
    </>
  );
}
