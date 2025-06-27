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
import React, { useEffect, useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ShowMessage from '@/components/ShowMessage';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useQueryClient } from '@tanstack/react-query';
import { AppActionType } from '@/types';
import { createProgrammeDetails } from '@/action/programme.action';
import CaptchaVerifier from '@/components/CaptchaVerifier';
import CreateChannelField from '@/components/ChannelField/CreateChannelField';
import SimpleCheckboxField from '@/components/SimpleCheckboxField';
import CreateProgrammeTypeField from '@/components/ProgrammeTypeField/CreateProgrammeTypeField';
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

  const enableQrChecked = watch('enable_qr');
  useEffect(() => {
    if (enableQrChecked) {
      // When QR is enabled, ensure emp_id and emp_name fields always have include_in_qr set to true
      fields.forEach((field, idx) => {
        if (field.field_name === 'emp_id' || field.field_name === 'emp_name') {
          setValue(`fields.${idx}.include_in_qr`, true);
        }
      });
    } else {
      // When QR is disabled, remove include_in_qr from all fields (cleans up any stray values)
      fields.forEach((_, idx) => {
        setValue(`fields.${idx}.include_in_qr`, undefined);
      });
    }
    // Runs whenever enable_qr checkbox or fields array changes
  }, [enableQrChecked, fields]);

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

  const visibleFields = fields
    .map((field, idx) => ({ ...field, _realIndex: idx }))
    .filter(
      (field) =>
        field.field_name !== 'emp_id' && field.field_name !== 'emp_name'
    );

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
        <CreateChannelField
          name="channel_id"
          setValue={setValue}
          trigger={trigger}
          TextFieldProps={{
            variant: 'outlined',
          }}
          error={errors.channel_id?.message}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CreateProgrammeTypeField
          name="programe_type_id"
          setValue={setValue}
          trigger={trigger}
          TextFieldProps={{
            variant: 'outlined',
          }}
          error={errors.programe_type_id?.message}
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
            name="enable_qr"
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
            {visibleFields.length === 0 ? (
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
              visibleFields.map((field) => (
                <FieldRowComponent
                  key={`${field._realIndex}-${field.field_name}`}
                  index={field._realIndex}
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
              input_type: '',
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
            disabled={visibleFields.length === 0}
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
