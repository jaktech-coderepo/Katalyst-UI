import {
  Box,
  FormHelperText,
  Grid2,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IFileStatus } from '@/types/interface';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { useFormContext } from 'react-hook-form';
import { UploadDocumentType } from '@/validation/uploadDocument.schema';
import SubmitButton from '@/components/SubmitButton';
import { uploadProgrammeData } from '@/action/batch.action';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { AppActionType } from '@/types';
import { useModal } from '@/context/ModalContext';
import { useQueryClient } from '@tanstack/react-query';
import UploadFileField from './UploadField';
import ProgrammeStructureDownlaodCsv from '../feature/ProgrammeStructureDownlaodCsv';

export default function MasterOfUploadDocument({
  id,
  name,
  batchNumber,
}: {
  id: number;
  name: string;
  batchNumber: string;
}) {
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  const {
    setValue,
    handleSubmit,
    trigger,
    reset,
    formState: { isSubmitted, isSubmitting, isValid, errors },
  } = useFormContext<UploadDocumentType>();
  const [files, setFiles] = useState<IFileStatus[]>([]);
  const [uploading, setUploading] = useState(false);
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setUploading(true);
    setValue(
      'file',
      files.map((file) => file.file)
    );
    trigger('file');
  }, [files]);

  async function onSubmit(formdata: UploadDocumentType) {
    const formData = new FormData();
    formdata.file.forEach((file) => {
      formData.append('file', file);
    });
    formData.append('batch_number', batchNumber);
    const response = await uploadProgrammeData({ formdata: formData, id });
    if ('error' in response) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: response.message ? response.message : response.error,
          type: 'error',
        },
      });
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Form Submitted Successfully',
          type: 'success',
        },
      });
      reset();
      handleClose();
      setFiles([]);
      setUploading(false);
      queryClient.invalidateQueries({
        queryKey: ['getAllBatchDetails'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getBatchDetailsByUserId'],
      });
    }
  }

  return (
    <Grid2
      container
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={2}
    >
      <Grid2 size={{ xs: 12, md: 6 }}>
        <UploadFileField setFiles={setFiles} filesArray={files} />
        {errors.file && (
          <FormHelperText error={true} sx={{ fontSize: 12 }}>
            {errors.file.message}
          </FormHelperText>
        )}
      </Grid2>
      <Grid2 size={12} gap={1}>
        <Grid2
          display={'flex'}
          justifySelf={'center'}
          alignSelf={'center'}
          textAlign={'center'}
          size={{ xs: 12, sm: 10, md: 7 }}
          paddingInlineStart={{ xs: 0, sm: 3 }}
        >
          <TipsAndUpdatesOutlinedIcon color="warning" />
          <Typography variant="body2" color="common.black">
            the date fields must follow the format
            <Typography
              component="span"
              sx={{ fontWeight: 600 }}
              color="warning"
            >
              {' '}
              DD-MMM-YY{' '}
            </Typography>
            (e.g., 15-Jan-24).
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 size={12} marginBlockStart={1}>
        {uploading &&
          files.map((fileStatus, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginBlockEnd={2}
            >
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  {fileStatus.file.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={fileStatus.progress}
                  sx={{ marginTop: 1 }}
                />
              </Box>
              <IconButton
                onClick={() => handleRemoveFile(index)}
                sx={{ marginInlineStart: 2 }}
                aria-label="remove file"
              >
                <CancelOutlinedIcon />
              </IconButton>
            </Box>
          ))}
      </Grid2>
      <Grid2
        container
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        size={{ xs: 12, sm: 9, md: 10 }}
      >
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
      <Grid2 size={{ xs: 12, sm: 3, md: 2 }}>
        <ProgrammeStructureDownlaodCsv id={id} programmeName={name} />
      </Grid2>
    </Grid2>
  );
}
