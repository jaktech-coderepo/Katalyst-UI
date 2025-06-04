'use client';

import SimpleTextField from '@/components/SimpleTextField';
import SubmitButton from '@/components/SubmitButton';
import { programmeCreateType } from '@/validation/programmeCreate.schema';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import ShowMessage from '@/components/ShowMessage';
import ObjectSelectField from '@/components/ObjectSelectField';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useQueryClient } from '@tanstack/react-query';
import { AppActionType } from '@/types';
import { createProgrammeDetails } from '@/action/programme.action';
import CaptchaVerifier from '@/components/CaptchaVerifier';

type FieldRowProps = {
  index: number;
  remove: (index: number) => void;
};

function FieldRow({ index, remove }: FieldRowProps) {
  const { control } = useFormContext<programmeCreateType>();
  return (
    <TableRow>
      <TableCell>
        <SimpleTextField
          control={control}
          label="Field Name"
          name={`fields.${index}.field_name`}
        />
      </TableCell>
      <TableCell>
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
        />
      </TableCell>
      <TableCell>
        <Controller
          name={`fields.${index}.is_active`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error} fullWidth>
              <Switch {...field} checked={field.value} />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => remove(index)}>
          <CancelOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default function CreateProgrammeForm() {
  const queryClient = useQueryClient();
  const { dispatch } = useSnakberContext();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { isValid, isSubmitted, isSubmitting, errors },
  } = useFormContext<programmeCreateType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  async function onSubmit(formdata: programmeCreateType) {
    const response = await createProgrammeDetails(formdata);
    if ('error' in response) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: response.message ? response.message : response.error,
          type: 'error',
        },
      });
      setShowCaptcha(false);
      if (response?.captchaRequired) {
        reset();
        setShowCaptcha(true);
      }
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Form Submitted Successfully',
          type: 'success',
        },
      });
      reset();
      setShowCaptcha(false);
      queryClient.invalidateQueries({
        queryKey: ['getAllProgrammeDetails'],
      });
      redirect('/dashboard/programme');
    }
  }

  return (
    <Grid2
      container
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      justifyContent={'center'}
      padding={2}
      boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
      bgcolor={'common.white'}
      borderRadius={3}
    >
      <Grid2 size={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Field Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <ShowMessage
                    message="Add at least one field"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              fields.map((field, index) => (
                <FieldRow
                  key={`${index}-${field.field_name}-${Date.now()}`}
                  index={index}
                  remove={remove}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Grid2>
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

      <Grid2 size={12} container justifyContent={'end'}>
        {showCaptcha && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              flexDirection: 'column',
            }}
          >
            <CaptchaVerifier
              setValue={setValue}
              trigger={trigger}
              name="captchaToken"
              error={errors.captchaToken?.message}
            />
          </Box>
        )}
        <Box>
          <SubmitButton
            isSubmitted={isSubmitted}
            isSubmitting={isSubmitting}
            isValid={isValid}
            variant="contained"
            disabled={fields.length === 0}
            sx={{
              backgroundColor: 'secondary.dark',
              color: 'common.white',
              display: 'flex',
              justifySelf: 'end',
              paddingInline: 5,
              paddingBlock: 1,
            }}
            title="Save"
          />
        </Box>
      </Grid2>
    </Grid2>
  );
}
