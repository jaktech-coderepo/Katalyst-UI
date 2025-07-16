'use client';

import { deleteBatchDetails } from '@/action/batch.action';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useModal } from '@/context/ModalContext';
import { AppActionType } from '@/types';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function DeleteModal({ id, batchNumber }: { id: number; batchNumber: string }) {
  const queryClient = useQueryClient();
  const { dispatch } = useSnakberContext();
  const { handleClose } = useModal();
  async function handleDelete() {
    const res = await deleteBatchDetails({ id, batchNumber });
    if ('error' in res) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: res.message ? res.message : res.error,
          type: 'error',
        },
      });
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Batch Deleted Successfully',
          type: 'success',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['getAllBatchDetails'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getBatchDetailsByUserId'],
      });
    }
    handleClose();
  }
  return (
    <>
      <DialogTitle fontWeight={'regular'} fontSize={14} component={'div'}>
        Are you sure you want to delete this Batch?
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

export default DeleteModal;
