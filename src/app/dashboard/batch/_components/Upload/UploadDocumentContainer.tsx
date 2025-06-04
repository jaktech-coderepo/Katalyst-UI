'use client';

import { Grid2 } from '@mui/material';
import React from 'react';
import UploadDocumentFormProvider from './FormContext';
import MasterOfUploadDocument from './MasterOfUploadDocument';

export default function UploadDocumentContent({
  id,
  name,
  batchNumber,
}: {
  id: number;
  name: string;
  batchNumber: string;
}) {
  return (
    <Grid2 spacing={2} justifyContent={'center'} padding={2}>
      <UploadDocumentFormProvider>
        {/* <UploadDocumentHeader /> */}
        <MasterOfUploadDocument id={id} name={name} batchNumber={batchNumber} />
      </UploadDocumentFormProvider>
    </Grid2>
  );
}
