'use client';

import { updateBatchDetails } from '@/action/batch.action';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useModal } from '@/context/ModalContext';
import { AppActionType, IBatchDetails } from '@/types';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function StatusModal({
  data,
  isActive,
}: {
  data: IBatchDetails;
  isActive: boolean;
}) {
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  async function handleDelete() {
    const formdata = {
      branch_id: data.branch_id,
      programme_id: data.programme_id,
      batch_description: data.batch_description,
      batch_start_date: data.batch_start_date,
      batch_start_time: data.batch_start_time,
      batch_end_date: data.batch_end_date,
      batch_end_time: data.batch_end_time,
      batch_status: !isActive,
      created_by: data.created_by,
      is_virtual: data.is_virtual,
      has_cofacilitator: data.has_cofacilitator,
      cofacilitators: data.cofacilitators,
    };
    const resdata = await updateBatchDetails({
      formdata,
      id: data.batch_id,
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
          message: 'Batch Closed Successfully',
          type: 'success',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['getAllBatchDetails'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getBatchDetailsByUserId'],
      });

      handleClose();
    }
  }
  return (
    <>
      <DialogTitle fontWeight={'regular'} fontSize={14} component={'div'}>
        Are you sure you want to complete this Batch?
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
