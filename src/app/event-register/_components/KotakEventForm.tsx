'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { AppActionType } from '@/types/appContext';
import kotakEventSchema, {
  kotakEventType,
} from '@/validation/kotakEvent.schema';
import createKotakEvent from '@/action/kotak-event.action';
import { MuiTelInput } from 'mui-tel-input';
import { IEventBranch } from '@/types';
import CaptchaVerifier from '@/components/CaptchaVerifier';

interface Props {
  data: IEventBranch[];
}

export default function KotakEventForm({ data }: Props) {
  const { dispatch } = useSnakberContext();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    reset,
    formState: { isSubmitted, isSubmitting, isValid, errors },
  } = useForm<kotakEventType>({
    resolver: zodResolver(kotakEventSchema),
    defaultValues: {
      name: '',
      branch: '',
      mobileNo: '',
      referrerCode: '',
      referrerName: '',
    },
  });
  const onSubmit = async (formData: kotakEventType) => {
    const res = await createKotakEvent(formData);
    if (res && 'error' in res) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: res.error
            ? res.error
            : res.message || 'Something Went Wrong.',
          type: 'error',
        },
      });

      setShowCaptcha(false);
      if (res?.captchaRequired) {
        setShowCaptcha(true);
      }
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Form submitted successfully.',
          type: 'success',
        },
      });
      reset();
      setShowCaptcha(false);
      setIsRegistered(true);
    }
  };

  return (
    <>
      {isRegistered ? (
        <Box sx={{ marginTop: 1, textAlign: 'center' }}>
          {/* Horizontal Rule */}
          <Divider sx={{ border: '1px solid  #ddd', margin: '1rem 0' }} />
          <Typography variant="body1" color="#111111" gutterBottom>
            Congratulations on taking the first step toward a rewarding life
            insurance career!
          </Typography>
          <Typography variant="body1" color="#111111">
            We wish you all the success in this exciting profession.
          </Typography>
        </Box>
      ) : (
        <Grid2
          container
          spacing={2}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          padding={4}
        >
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              {...register('name')}
              label="Enter your name"
              variant="outlined"
              size="medium"
              error={!!errors.name?.message}
              helperText={errors.name?.message ? errors.name?.message : null}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              control={control}
              name={'mobileNo'}
              render={({ field, fieldState: { error } }) => (
                <>
                  <MuiTelInput
                    {...field}
                    fullWidth
                    label="Phone No."
                    id={'mobileNo'}
                    defaultCountry="IN"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                </>
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              {...register('referrerName')}
              label="Invited by: Name"
              error={!!errors.referrerName?.message}
              helperText={
                errors.referrerName?.message
                  ? errors.referrerName?.message
                  : null
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              control={control}
              name={'referrerCode'}
              render={({ field, fieldState: { error } }) => (
                <>
                  <MuiTelInput
                    {...field}
                    fullWidth
                    label="Invited by: Phone No."
                    id={'referrerCode'}
                    defaultCountry="IN"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                </>
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Autocomplete
              disablePortal
              options={data}
              getOptionLabel={(option) => option.branch_name || ''}
              value={
                data.find((branch) => branch.branch_name === watch('branch')) ||
                null
              }
              onChange={(event, newValue) => {
                setValue('branch', newValue ? newValue.branch_name : '');
                trigger('branch');
              }}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Branch"
                  error={!!errors.branch?.message}
                  helperText={errors?.branch?.message}
                />
              )}
            />
          </Grid2>
          {showCaptcha && (
            <Box
              width={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
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
          <Grid2 size={12} textAlign={'center'}>
            <Button
              sx={{ marginInlineEnd: 2 }}
              variant="contained"
              onClick={() => reset()}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || (isSubmitted && !isValid)}
              sx={{
                backgroundColor: 'secondary.dark',
                color: 'common.white',
              }}
            >
              Submit
              <CircularProgress
                size={20}
                sx={{
                  position: 'absolute',
                  display: isSubmitting ? 'block' : 'none',
                }}
              />
            </Button>
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
