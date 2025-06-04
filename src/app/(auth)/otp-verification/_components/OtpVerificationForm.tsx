'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormHelperText, FormLabel, Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SubmitButton from '@/components/SubmitButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OtpInput from 'react-otp-input';
import validateOtpSchema, {
  ValidateOtpType,
} from '@/validation/validateOtp.schema';
import { redirect, useRouter } from 'next/navigation';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { AppActionType } from '@/types';
import validateOtp from '@/action/validate-otp';
import CaptchaVerifier from '@/components/CaptchaVerifier';

export default function OtpVerificationForm({ email }: { email: string }) {
  const router = useRouter();
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    if (email) {
      router.replace('/otp-verification');
    }
  }, [email, router]);
  const { dispatch } = useSnakberContext();
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isSubmitted, isSubmitting, isValid, errors },
  } = useForm<ValidateOtpType>({
    resolver: zodResolver(validateOtpSchema),
    defaultValues: {
      otp: '',
      email,
    },
  });

  const onSubmit = async (data: ValidateOtpType) => {
    const res = await validateOtp(data);
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
        <FormLabel
          htmlFor={'otp'}
          sx={{
            color: 'common.black',
            fontWeight: 600,
            width: '100%',
            display: 'inline-block',
            paddingBlock: 1,
          }}
        >
          Enter Otp
        </FormLabel>

        <Controller
          name={'otp'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Box>
              {/* <MuiOtpInput
                sx={{ gap: 1 }}
                onChange={field.onChange}
                value={field.value}
                length={6}
              /> */}
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                numInputs={6}
                inputType={'number'}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      width: '40px',
                      height: '40px',
                      marginInlineEnd: 2,
                    }}
                  />
                )}
              />
              {error ? (
                <FormHelperText error>{error.message}</FormHelperText>
              ) : null}
            </Box>
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
