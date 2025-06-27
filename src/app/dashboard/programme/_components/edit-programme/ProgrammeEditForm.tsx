import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SimpleTextField from '@/components/SimpleTextField';
import SubmitButton from '@/components/SubmitButton';
import { useModal } from '@/context/ModalContext';
import { AppActionType, IProgrammeDetails } from '@/types';
import { ProgrammeEditType } from '@/validation/programmeEdit.schema';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid2,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { updateProgrammeDetails } from '@/action/programme.action';
import { useQueryClient } from '@tanstack/react-query';
import EditChannelField from '@/components/ChannelField/EditChannelField';
import SimpleCheckboxField from '@/components/SimpleCheckboxField';
import ShowMessage from '@/components/ShowMessage';
import EditProgrammeTypeField from '@/components/ProgrammeTypeField/EditProgrammeTypeField';
import useAutoFieldsForAttendanceEdit from './useAutoFieldsForAttendance ';
import FieldRowComponent from './FieldRowComponent';

export default function ProgrammeEditForm({
  data,
}: {
  data: IProgrammeDetails;
}) {
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { isValid, isSubmitted, isSubmitting, errors },
  } = useFormContext<ProgrammeEditType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const attendanceChecked = watch('attendance');
  const enableQrChecked = watch('enable_qr');
  useAutoFieldsForAttendanceEdit(
    attendanceChecked,
    fields,
    append,
    remove,
    setValue,
    enableQrChecked
  );

  async function onSubmit(formdata: ProgrammeEditType) {
    const resdata = await updateProgrammeDetails({
      formdata,
      id: data.programme_id,
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
          message: 'Programme edited Successfully',
          type: 'success',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['getAllProgrammeDetails'],
      });

      reset();
      handleClose();
    }
  }

  const visibleFields = fields
    .map((field, idx) => ({ ...field, _realIndex: idx }))
    .filter(
      (field) =>
        field.field_name !== 'emp_id' && field.field_name !== 'emp_name'
    );

  return (
    <Grid2
      container
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      justifyContent={'flex-start'}
      padding={2}
    >
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <SimpleTextField
          control={control}
          label="Programme  Name"
          name="programe_name"
          placeholder="Programme Name..."
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
          htmlFor={'is_active'}
        >
          Is Active
        </FormLabel>
        <Controller
          name={'is_active'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error} fullWidth>
              <Switch {...field} checked={field.value} />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <EditChannelField
          name="channel_id"
          setValue={setValue}
          trigger={trigger}
          watch={watch}
          TextFieldProps={{
            variant: 'outlined',
          }}
          error={errors.channel_id?.message}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <EditProgrammeTypeField
          name="programe_type_id"
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          TextFieldProps={{
            variant: 'outlined',
          }}
          error={errors.programe_type_id?.message}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 'auto' }}>
        <SimpleCheckboxField
          control={control}
          name="attendance"
          label="Attendance"
        />
      </Grid2>
      {attendanceChecked && (
        <Grid2 size={{ xs: 12, sm: 'auto' }}>
          <SimpleCheckboxField
            control={control}
            name="enable_qr"
            label="qr Code"
          />
        </Grid2>
      )}
      <Grid2 container size={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Field Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleFields.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <ShowMessage
                    message="Add at least one field"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              visibleFields.map((field) => (
                <FieldRowComponent
                  key={`${field._realIndex}-${field.field_name}`}
                  index={field._realIndex}
                  remove={remove}
                  disabled={!!field.field_id && data.is_referenced}
                />
              ))
            )}
          </TableBody>
        </Table>
        <Grid2 size={12}>
          <Button
            variant="contained"
            endIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() =>
              append({
                field_name: '',
                input_type: '',
                field_type: '',
                is_active: true,
              })
            }
            sx={{
              display: 'flex',
              justifySelf: 'end',
              paddingInline: 5,
              paddingBlock: 1,
            }}
          >
            Add New Field
          </Button>
        </Grid2>
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
