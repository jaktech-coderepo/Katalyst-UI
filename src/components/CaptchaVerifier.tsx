import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, FormHelperText } from '@mui/material';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

interface CaptchaVerifierProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  name: FieldPath<T>;
  error?: string;
}

export default function CaptchaVerifier<T extends FieldValues>({
  setValue,
  trigger,
  name,
  error,
}: CaptchaVerifierProps<T>) {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [showRefreshCaptcha, setShowRefreshCaptcha] = useState<boolean>(false);

  const handleCaptchaChange = (token: string | null) => {
    setValue(name, (token || '') as PathValue<T, Path<T>>);
    trigger(name);
  };

  const handleCaptchaExpired = () => {
    setValue(name, '' as PathValue<T, Path<T>>);
    recaptchaRef.current?.reset();
  };

  const handleRefreshCaptcha = () => {
    recaptchaRef.current?.reset();
    setShowRefreshCaptcha(false);
  };

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={handleCaptchaChange}
        onExpired={handleCaptchaExpired}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
      {showRefreshCaptcha && (
        <Button onClick={handleRefreshCaptcha}>Refresh Captcha</Button>
      )}
    </>
  );
}
