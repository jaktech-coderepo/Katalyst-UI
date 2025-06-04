import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import React, { Fragment, use } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import IconButtonModal from '@/components/IconButtonModel';
import TableElement from '@/components/TableElement';
import ScrollDialog from '@/components/Modal';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { format } from 'date-fns';
import getStatus from '@/utils/getStatus';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';
import DeleteModal from './DeleteModel';
import BatchEditForm from './BatchEditForm';
import StatusModal from './StatusModal';
import UploadDocumentContent from './Upload/UploadDocumentContainer';
import { GetAllBatchContext } from './context/BatchGetAllContext';
import { GetBatchByUserIdContext } from './context/BatchGetByUserIdContext';
import DownloadModalContent from './Download/DownloadModalContent';

export default function BatchTableBody({ isActive }: { isActive: boolean }) {
  const { data: currData } = use(GetCurrentUserContext);
  const {
    paginatedQuery: { data },
  } =
    currData.data.roleid === 1
      ? use(GetAllBatchContext)
      : use(GetBatchByUserIdContext);

  return (
    <>
      <TableBody>
        {data.results.map((row, i) => (
          <Fragment key={i}>
            <TableRow
              sx={{
                border: 0,
                borderBottom: 'unset',
                borderColor: 'grey.300',
                bgcolor: 'none',
                color: 'typography',
                fontSize: 14,
              }}
            >
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <TableElement />
                {row.batch_number || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.branch_name || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.programme_name || '-'}
              </TableCell>
              {/* <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.batch_description || '-'}
              </TableCell> */}
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {format(new Date(row.batch_start_date), 'dd-MMM-yy') || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {format(new Date(row.batch_end_date), 'dd-MMM-yy') || '-'}
              </TableCell>
              {isActive && (
                <TableCell
                  sx={{
                    border: 0,
                    color: 'inherit',
                    fontSize: 'inherit',
                  }}
                >
                  {getStatus({
                    startDate: row.batch_start_date,
                    endDate: row.batch_end_date,
                  }) || '-'}
                  {/* {(row.batch_status && 'active') || '-'} */}
                </TableCell>
              )}
              {currData.data.roleid === 1 && (
                <TableCell
                  sx={{
                    border: 0,
                    color: 'inherit',
                    fontSize: 'inherit',
                  }}
                >
                  {row.created_by_name || '-'}
                </TableCell>
              )}

              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                  whiteSpace: 'nowrap',
                }}
              >
                {format(new Date(row.created_date), 'dd-MMM-yy pp') || '-'}
              </TableCell>

              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                <Box display="flex" justifyContent="center" gap={0.5}>
                  <ScrollDialog
                    title="Download Programme data"
                    icon={<FileDownloadOutlinedIcon />}
                    content={
                      <DownloadModalContent
                        id={row.programme_id}
                        programmeName={row.programme_name}
                        batchNumber={row.batch_number}
                        createdBy={row.created_by}
                      />
                    }
                    size="md"
                    sx={{
                      color: 'error.main',
                      bgcolor: 'grey.50',
                      borderRadius: 1.5,
                    }}
                  />
                  <ScrollDialog
                    title="Upload Document"
                    icon={<UploadFileIcon />}
                    content={
                      <UploadDocumentContent
                        id={row.programme_id}
                        name={row.programme_name}
                        batchNumber={row.batch_number}
                      />
                    }
                    size="md"
                    sx={{
                      color: 'secondary.dark',
                      bgcolor: 'secondary.100',
                      borderRadius: 1.5,
                    }}
                    disabled={!isActive}
                  />
                  <ScrollDialog
                    title="Update Batch"
                    icon={<BorderColorIcon />}
                    content={<BatchEditForm data={row} />}
                    size="md"
                    sx={{
                      color: 'secondary.dark',
                      bgcolor: 'secondary.100',
                      borderRadius: 1.5,
                    }}
                    disabled={!isActive}
                  />
                  <IconButtonModal
                    icon={<DeleteIcon />}
                    content={<DeleteModal id={row.batch_id} />}
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.100',
                      borderRadius: 1.5,
                    }}
                    modalFooter={false}
                    aria-label="delete"
                    disabled={!isActive}
                  />
                  {isActive && (
                    <IconButtonModal
                      icon={isActive ? <ToggleOffIcon /> : <ToggleOnIcon />}
                      content={<StatusModal data={row} />}
                      sx={{
                        color: 'warning.dark',
                        bgcolor: 'warning.100',
                        borderRadius: 1.5,
                      }}
                      modalFooter={false}
                      aria-label="status"
                    />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </>
  );
}
