'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CircularProgress,
  FormHelperText,
  Grid2,
  InputAdornment,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import SimpleTextField from '@/components/SimpleTextField';
import PasswordField from '@/components/PasswordField';
import MailIcon from '@mui/icons-material/Mail';
import signInSchema, { SignInType } from '@/validation/signin.schema';
import { redirect } from 'next/navigation';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { AppActionType } from '@/types/appContext';
import loginUser from '@/action/auth.action';
import encryptPassword from '@/utils/encryptPassword';

export default function SignInForm() {
  const { dispatch } = useSnakberContext();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [showRefreshCaptcha, setShowRefreshCaptcha] = useState(false);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { isSubmitted, isSubmitting, isValid, errors },
    trigger,
    setValue,
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      captchaToken: '',
    },
  });

  const handleCaptchaLoaded = () => {
    setIsRecaptchaLoaded(true);
    setLoadError(false);
  };

  const handleReloadCaptcha = () => {
    setCaptchaKey((prev) => prev + 1);
    setLoadError(false);
    setIsRecaptchaLoaded(false);
  };

  const onSubmit = async (data: SignInType) => {
    const newPassword = encryptPassword(data.password);
    const res = await loginUser({
      formData: { ...data, password: newPassword },
    });
    if (res && 'error' in res) {
      if (res.error === 'CAPTCHA verification failed.') {
        setShowRefreshCaptcha(true);
      }
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: res.error
            ? res.error
            : res.message || 'Something Went Wrong.',
          type: 'error',
        },
      });
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setValue('captchaToken', token ?? '');
    trigger('captchaToken');
  };

  const handleCaptchaExpired = () => {
    setValue('captchaToken', '');
    recaptchaRef.current?.reset();
  };

  const handleRefreshCaptcha = () => {
    recaptchaRef.current?.reset();
    setShowRefreshCaptcha(false);
    setValue('captchaToken', '');
    trigger('captchaToken');
  };

  return (
    <Grid2
      container
      spacing={2}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      padding={4}
      paddingInlineStart={0}
      paddingInlineEnd={{ xs: 0, md: 4 }}
    >
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
                  <MailIcon sx={{ color: '#E30613' }} />
                </InputAdornment>
              ),
            },
          }}
          placeholder="Email@kotak.com"
        />
      </Grid2>
      <Grid2 size={12}>
        <PasswordField control={control} name="password" label="Password" />
      </Grid2>
      <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          sx={{
            color: 'common.black',
            padding: '0px',
            fontWeight: '600',
          }}
          onClick={() => redirect('/forget-password')}
        >
          Forget password?
        </Button>
      </Grid2>
      <Grid2
        size={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <ReCAPTCHA
          key={captchaKey}
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleCaptchaChange}
          onExpired={handleCaptchaExpired}
          asyncScriptOnLoad={handleCaptchaLoaded}
          onError={() => setLoadError(true)}
        />

        {loadError && (
          <>
            <FormHelperText error>
              Failed to load CAPTCHA. Please reload.
            </FormHelperText>
            <Button onClick={handleReloadCaptcha}>Reload Captcha</Button>
          </>
        )}

        {!isRecaptchaLoaded && !loadError && <CircularProgress size={24} />}

        {errors.captchaToken?.message && (
          <FormHelperText error>{errors.captchaToken.message}</FormHelperText>
        )}

        {showRefreshCaptcha && (
          <Button onClick={handleRefreshCaptcha}>Refresh Captcha</Button>
        )}
      </Grid2>
      <Grid2 size={12}>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isSubmitting || (isSubmitted && !isValid)}
          sx={{
            backgroundColor: 'secondary.dark',
            color: 'common.white',
          }}
        >
          Sign In
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
  );
}
