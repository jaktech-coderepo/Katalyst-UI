'use client';

import ObjectSelectField from '@/components/ObjectSelectField';
import PasswordField from '@/components/PasswordField';
import SimpleTextField from '@/components/SimpleTextField';
import SubmitButton from '@/components/SubmitButton';
import MailIcon from '@mui/icons-material/Mail';
import userCreateSchema, {
  UserCreateType,
} from '@/validation/userCreate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid2,
  InputAdornment,
  Switch,
} from '@mui/material';
import { redirect } from 'next/navigation';
import React, { use, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GetAllUserRoleContext } from '@/context/User/UserRoleContext';
import { createUserDetails } from '@/action/user.action';
import { AppActionType } from '@/types';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useQueryClient } from '@tanstack/react-query';
import CaptchaVerifier from '@/components/CaptchaVerifier';
import SupervisorField from './SupervisorField';

export default function CreateUserForm() {
  const queryClient = useQueryClient();
  const { dispatch } = useSnakberContext();
  const { data: roleData } = use(GetAllUserRoleContext);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { isValid, isSubmitted, isSubmitting, errors },
  } = useForm<UserCreateType>({
    defaultValues: {
      username: '',
      roleid: undefined,
      reportingTo: undefined,
      email: '',
      password: '',
      isactive: true,
      captchaToken: '',
    },
    resolver: zodResolver(userCreateSchema),
  });

  async function onSubmit(formdata: UserCreateType) {
    const response = await createUserDetails(formdata);
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
        queryKey: ['getAllUserDetails'],
      });
      redirect('/dashboard/user');
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
      boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
      bgcolor={'common.white'}
      borderRadius={3}
    >
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <SimpleTextField
          control={control}
          label="User Name"
          name="username"
          placeholder="username..."
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <ObjectSelectField
          control={control}
          label={'Role Id'}
          name="roleid"
          options={roleData.data.map((role) => ({
            label: role.rolename,
            value: role.roleid,
          }))}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
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
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <PasswordField control={control} name="password" label="Password" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <SupervisorField
          name="reportingTo"
          setValue={setValue}
          TextFieldProps={{
            variant: 'outlined',
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box width={{ xs: 1, md: 0.45 }}>
          <FormLabel
            sx={{
              color: 'common.black',
              fontWeight: 600,
              width: '100%',
              display: 'inline-block',
              paddingBlock: 1,
            }}
            htmlFor={'isactive'}
          >
            Is Active
          </FormLabel>
          <Controller
            name={'isactive'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={!!error} fullWidth>
                <Switch {...field} checked={field.value} />
                <FormHelperText>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>
      </Grid2>
      <Grid2 size={12} container justifyContent={'space-between'} rowGap={2}>
        {showCaptcha && (
          <Box
            width={{ xs: 1, md: 0.45 }}
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
      </Grid2>
      <Grid2 size={12}>
        <SubmitButton
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
          variant="contained"
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
      </Grid2>
    </Grid2>
  );
}
