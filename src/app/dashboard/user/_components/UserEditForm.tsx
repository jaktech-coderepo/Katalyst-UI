import SimpleTextField from '@/components/SimpleTextField';
import SubmitButton from '@/components/SubmitButton';
import { useModal } from '@/context/ModalContext';
import MailIcon from '@mui/icons-material/Mail';
import userEditSchema, { UserEditType } from '@/validation/userEdit.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid2,
  InputAdornment,
  Switch,
} from '@mui/material';
import React, { use } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ObjectSelectField from '@/components/ObjectSelectField';
import { GetAllUserRoleContext } from '@/context/User/UserRoleContext';
import { updateUserDetails } from '@/action/user.action';
import { AppActionType, IUserDetails } from '@/types';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useQueryClient } from '@tanstack/react-query';
import EditSupervisorField from '@/components/SupervisorField/EditSupervisorField';
import EditChannelField from '@/components/ChannelField/EditChannelField';

export default function UserEditForm({ data }: { data: IUserDetails }) {
  const { data: roleData } = use(GetAllUserRoleContext);
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid, isSubmitted, isSubmitting, errors },
  } = useForm<UserEditType>({
    defaultValues: {
      username: data.username || '',
      empId: data.emp_id || '',
      roleid: data.roleid || undefined,
      reportingTo: data.reporting_to || undefined,
      channelId: data.channel_id || undefined,
      email: data.email || '',
      isactive: data.isactive || true,
    },
    resolver: zodResolver(userEditSchema),
  });

  async function onSubmit(formdata: UserEditType) {
    const resdata = await updateUserDetails({
      formdata,
      id: data.userid,
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
          message: 'User edited Successfully',
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
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <SimpleTextField
          control={control}
          label="User Name"
          name="username"
          placeholder="username..."
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <SimpleTextField
          control={control}
          label="Employee Id"
          name="empId"
          placeholder="003Kotak"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
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
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
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
        <EditSupervisorField
          name="reportingTo"
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          TextFieldProps={{
            variant: 'outlined',
          }}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 6 }}>
        <EditChannelField
          name="channelId"
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          TextFieldProps={{
            variant: 'outlined',
          }}
          error={errors.channelId?.message}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
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
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}></Grid2>
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
