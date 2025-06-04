import { updateUserPassword } from '@/action/user.action';
import PasswordField from '@/components/PasswordField';
import SubmitButton from '@/components/SubmitButton';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useModal } from '@/context/ModalContext';
import { AppActionType, IUserDetails } from '@/types';
import userEditPasswordSchema, {
  userEditPasswordEditType,
} from '@/validation/userEditPassword.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2 } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function ChangePasswordModal({ data }: { data: IUserDetails }) {
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<userEditPasswordEditType>({
    defaultValues: {
      user_id: data.userid,
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(userEditPasswordSchema),
  });

  async function onSubmit(formdata: userEditPasswordEditType) {
    const resdata = await updateUserPassword({
      formdata,
    });
    if ('error' in resdata) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: resdata.message ? resdata.message : resdata.error,
          type: 'error',
        },
      });
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Password edited Successfully',
          type: 'success',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['getAllUserDetails'],
      });

      reset();
      handleClose();
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
    >
      <Grid2 size={12}>
        <PasswordField control={control} name="password" label="Password" />
      </Grid2>
      <Grid2 size={12}>
        <PasswordField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
        />
      </Grid2>
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
          title="Save"
        />
      </Grid2>
    </Grid2>
  );
}
