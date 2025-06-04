'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid2, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SimpleTextField from '@/components/SimpleTextField';
import SubmitButton from '@/components/SubmitButton';
import MailIcon from '@mui/icons-material/Mail';
import forgetPasswordSchema, {
  ForgetPasswordType,
} from '@/validation/forgetPassword.schema';
import { redirect } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import forgetPassword from '@/action/forget-password';
import { AppActionType } from '@/types';
import CaptchaVerifier from '@/components/CaptchaVerifier';

export default function ForgetPasswordForm() {
  const { dispatch } = useSnakberContext();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isSubmitted, isSubmitting, isValid, errors },
  } = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (data: ForgetPasswordType) => {
    const res = await forgetPassword(data);
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
    }
  };
  return (
    <Grid2
      container
      spacing={2}
      noValidate
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      padding={4}
      paddingInlineStart={0}
      paddingInlineEnd={{ xs: 0, md: 4 }}
    >
      <Grid2 size={12}>
        <Button
          sx={{
            color: 'common.black',
            padding: '0px',
            fontWeight: '600',
          }}
          onClick={() => redirect('/signin')}
          startIcon={<ArrowBackIcon />}
        >
          Back to Sign In
        </Button>
      </Grid2>
      <Grid2 size={12}>
        <SimpleTextField
          control={control}
          name="email"
          type="email"
          label="Email Id"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <MailIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
          placeholder="info@martinemail.com"
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
        />
      </Grid2>
    </Grid2>
  );
}
