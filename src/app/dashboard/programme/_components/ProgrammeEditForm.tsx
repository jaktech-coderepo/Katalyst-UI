import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SimpleTextField from '@/components/SimpleTextField';
import SubmitButton from '@/components/SubmitButton';
import { useModal } from '@/context/ModalContext';
import { AppActionType, IProgrammeDetails } from '@/types';
import programmeEditSchema, {
  ProgrammeEditType,
} from '@/validation/programmeEdit.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid2,
  IconButton,
  Switch,
} from '@mui/material';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ObjectSelectField from '@/components/ObjectSelectField';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { updateProgrammeDetails } from '@/action/programme.action';
import { useQueryClient } from '@tanstack/react-query';

export default function ProgrammeEditForm({
  data,
}: {
  data: IProgrammeDetails;
}) {
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<ProgrammeEditType>({
    defaultValues: {
      programe_name: data.programme_name || '',
      created_by: data.created_by,
      created_date: data.created_at || '',
      is_active: data.is_active || true,
      fields: data.fields || [],
    },
    resolver: zodResolver(programmeEditSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  async function onSubmit(formdata: ProgrammeEditType) {
    const resdata = await updateProgrammeDetails({
      formdata,
      id: data.programme_id,
    });
    if ('error' in resdata) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: resdata.message ? resdata.message : resdata.error,
          type: 'error',
        },
      });
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Programme edited Successfully',
          type: 'success',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['getAllProgrammeDetails'],
      });

      reset();
      handleClose();
    }
  }

  return (
    <Grid2
      container
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      justifyContent={'flex-start'}
      padding={2}
    >
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <SimpleTextField
          control={control}
          label="Programme  Name"
          name="programe_name"
          placeholder="Programme Name..."
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <FormLabel
          sx={{
            color: 'common.black',
            fontWeight: 600,
            width: '100%',
            display: 'inline-block',
            paddingBlock: 1,
          }}
          htmlFor={'is_active'}
        >
          Is Active
        </FormLabel>
        <Controller
          name={'is_active'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error} fullWidth>
              <Switch {...field} checked={field.value} />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>
      <Grid2 container size={12}>
        {fields.map((item, index) => (
          <Grid2
            container
            size={12}
            key={`${index}-${item.field_name}-${Date.now()}`}
          >
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
              <SimpleTextField
                control={control}
                label="Field Name"
                name={`fields.${index}.field_name`}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
              <ObjectSelectField
                control={control}
                label="Field type"
                name={`fields.${index}.field_type`}
                options={[
                  { label: 'Text', value: 'text' },
                  { label: 'Number', value: 'int4' },
                  { label: 'Boolean', value: 'boolean' },
                  { label: 'Date', value: 'timestamp' },
                ]}
                disabled={!!item.field_id && data.is_referenced}
              />
            </Grid2>
            <Grid2 size={{ xs: 6, md: 2 }}>
              <FormLabel
                sx={{
                  color: 'common.black',
                  fontWeight: 600,
                  width: '100%',
                  display: 'inline-block',
                  paddingBlock: 1,
                }}
                htmlFor={`fields.${index}.is_active`}
              >
                Fields Is Active
              </FormLabel>
              <Controller
                name={`fields.${index}.is_active`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={!!error} fullWidth>
                    <Switch
                      {...field}
                      checked={field.value}
                      disabled={!!item.field_id && data.is_referenced}
                    />
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 6, md: 1 }}>
              <IconButton
                onClick={() => remove(index)}
                disabled={!!item.field_id && data.is_referenced}
              >
                <CancelOutlinedIcon />
              </IconButton>
            </Grid2>
          </Grid2>
        ))}
        <Grid2 size={12}>
          <Button
            variant="contained"
            endIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() =>
              append({
                field_name: '',
                field_type: '',
                is_active: true,
              })
            }
            sx={{
              display: 'flex',
              justifySelf: 'end',
              paddingInline: 5,
              paddingBlock: 1,
            }}
          >
            Add New Field
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 size={12}>
        <SubmitButton
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: 'secondary.dark',
            color: 'common.white',
          }}
          title="Save"
        />
      </Grid2>
    </Grid2>
  );
}
