import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

interface SubmitButtonProps extends ButtonProps {
  title?: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isValid: boolean;
}

export default function SubmitButton({
  title = 'Submit',
  isSubmitting,
  isSubmitted,
  isValid,
  ...rest
}: SubmitButtonProps) {
  return (
    <Button
      disableElevation
      variant="outlined"
      disableRipple={false}
      disabled={isSubmitting || (isSubmitted && !isValid)}
      type="submit"
      {...rest}
    >
      {title}
      <CircularProgress
        size={20}
        sx={{
          position: 'absolute',
          display: isSubmitting ? 'block' : 'none',
        }}
      />
    </Button>
  );
}
