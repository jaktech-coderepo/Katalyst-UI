'use client';

import { updateProgrammeDetails } from '@/action/programme.action';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useModal } from '@/context/ModalContext';
import { AppActionType, IProgrammeDetails } from '@/types';
import { ProgrammeEditType } from '@/validation/programmeEdit.schema';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function StatusModal({
  data,
  isActive,
}: {
  data: IProgrammeDetails;
  isActive: boolean;
}) {
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  async function handleDelete() {
    const formdata = {
      programe_name: data.programme_name,
      created_by: data.created_by,
      created_date: data.created_at,
      is_active: !isActive,
      fields: data.fields,
    } as ProgrammeEditType;

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
          message: `Programme ${isActive ? 'Deactivated' : 'Activated'} Successfully`,
          type: 'success',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['getAllProgrammeDetails'],
      });

      handleClose();
    }
  }
  return (
    <>
      <DialogTitle fontWeight={'regular'} fontSize={14} component={'div'}>
        Are you sure you want to {isActive ? 'Deactivate' : 'Activate'} this
        Programme?
      </DialogTitle>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant={'contained'}
          onClick={handleDelete}
          sx={{ bgcolor: 'primary.dark' }}
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export default StatusModal;
