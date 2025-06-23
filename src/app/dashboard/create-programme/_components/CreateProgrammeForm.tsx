'use client';

import SubmitButton from '@/components/SubmitButton';
import { ProgrammeCreateType } from '@/validation/programmeCreate.schema';
import {
  Box,
  Button,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ShowMessage from '@/components/ShowMessage';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useQueryClient } from '@tanstack/react-query';
import { AppActionType } from '@/types';
import { createProgrammeDetails } from '@/action/programme.action';
import CaptchaVerifier from '@/components/CaptchaVerifier';
import ChannelField from '@/components/ChannelField/ChannelField';
import SimpleCheckboxField from '@/components/SimpleCheckboxField';
import ProgrammeTypeField from './ProgrammeTypeField';
import useAutoFieldsForAttendance from './useAutoFieldsForAttendance';
import FieldRowComponent from './FieldRowComponent';

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
    watch,
    formState: { isValid, isSubmitted, isSubmitting, errors },
  } = useFormContext<ProgrammeCreateType>();

  const attendanceChecked = watch('attendance');

  const { fields, append, remove } = useFieldArray({ control, name: 'fields' });

  useAutoFieldsForAttendance(attendanceChecked, fields, append, remove);

  async function onSubmit(formdata: ProgrammeCreateType) {
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
      justifyContent={{ xs: 'center', md: 'start' }}
      padding={2}
      boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
      bgcolor={'common.white'}
      borderRadius={3}
    >
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <ChannelField
          name="channelId"
          setValue={setValue}
          trigger={trigger}
          TextFieldProps={{
            variant: 'outlined',
          }}
          error={errors.channelId?.message}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <ProgrammeTypeField
          name="programmeType"
          setValue={setValue}
          trigger={trigger}
          TextFieldProps={{
            variant: 'outlined',
          }}
          error={errors.programmeType?.message}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 'auto' }}>
        <SimpleCheckboxField
          control={control}
          name="attendance"
          label="Attendance"
        />
      </Grid2>
      {attendanceChecked && (
        <Grid2 size={{ xs: 12, sm: 'auto' }}>
          <SimpleCheckboxField
            control={control}
            name="qrCode"
            label="qr Code"
          />
        </Grid2>
      )}
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
                <FieldRowComponent
                  key={`${index}-${field.field_name}`}
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
