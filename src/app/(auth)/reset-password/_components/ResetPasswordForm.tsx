'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/SubmitButton';
import { redirect, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import resetPasswordSchema, {
  ResetPasswordType,
} from '@/validation/resetPassword.schema';
import PasswordField from '@/components/PasswordField';
import resetPassword from '@/action/reset-password';
import { AppActionType } from '@/types';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import CaptchaVerifier from '@/components/CaptchaVerifier';

interface Props {
  email: string;
  otp: string;
}

export default function ResetPasswordForm({ email, otp }: Props) {
  const router = useRouter();
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    if (email) {
      router.replace('/reset-password');
    }
  }, [email, router, otp]);
  const { dispatch } = useSnakberContext();
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isSubmitted, isSubmitting, isValid, errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      email,
      otp,
    },
  });
  const onSubmit = async (data: ResetPasswordType) => {
    const res = await resetPassword(data);
    if ('error' in res) {
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
          message: res.message || 'Password reset succesfully',
          type: 'success',
        },
      });
      setShowCaptcha(false);
      redirect('/signin');
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
        <PasswordField control={control} name="newPassword" label="Password" />
      </Grid2>
      <Grid2 size={12}>
        <PasswordField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
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
