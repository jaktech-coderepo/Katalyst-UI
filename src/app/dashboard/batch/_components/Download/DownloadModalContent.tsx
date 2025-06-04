'use client';

import { Grid2 } from '@mui/material';
import React from 'react';
import MasterOfDownloadModal from './MasterOfDownloadModal';

export default function DownloadModalContent({
  id,
  programmeName,
  batchNumber,
  createdBy,
}: {
  id: number;
  programmeName: string;
  batchNumber: string;
  createdBy: number;
}) {
  return (
    <Grid2 spacing={2} justifyContent={'center'} padding={2}>
      {/* <UploadDocumentHeader /> */}
      <MasterOfDownloadModal
        id={id}
        programmeName={programmeName}
        batchNumber={batchNumber}
        createdBy={createdBy}
      />
    </Grid2>
  );
}
