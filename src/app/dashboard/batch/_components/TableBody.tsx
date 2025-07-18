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
import USER_TYPE from '@/constants/enum';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import DeleteModal from './DeleteModel';
import BatchEditForm from './edit-form/BatchEditForm';
import StatusModal from './StatusModal';
import UploadDocumentContent from './Upload/UploadDocumentContainer';
import { GetAllBatchContext } from './context/BatchGetAllContext';
import { GetBatchByUserIdContext } from './context/BatchGetByUserIdContext';
import DownloadModalContent from './Download/DownloadModalContent';
import CoFacilitatorTooltipTable from './CofacilitatorTooltipTable';
import TrainerQRCodeDisplay from './TrainerQRCodeDisplay';

export default function BatchTableBody({ isActive }: { isActive: boolean }) {
  const { data: currData } = use(GetCurrentUserContext);
  const {
    paginatedQuery: { data },
  } =
    currData.data.roleid === USER_TYPE.Admin
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
                bgcolor:
                  row.has_cofacilitator &&
                  row.created_by !== currData.data.userid
                    ? 'grey.50'
                    : 'none',
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
                <TableElement
                  bgColor={
                    row.has_cofacilitator &&
                    row.created_by === currData.data.userid
                      ? 'primary.dark'
                      : `linear-gradient(to Bottom, #000000 0%, #7D7C7C 100%)`
                  }
                />
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
                {row.batch_start_date && row.batch_start_time
                  ? format(
                      new Date(
                        `${row.batch_start_date.split('T')[0]}T${row.batch_start_time}`
                      ),
                      'dd-MMM-yy p'
                    )
                  : '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.batch_end_date && row.batch_end_time
                  ? format(
                      new Date(
                        `${row.batch_end_date.split('T')[0]}T${row.batch_end_time}`
                      ),
                      'dd-MMM-yy p'
                    )
                  : '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.facilitator_count || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                <CoFacilitatorTooltipTable data={row.cofacilitators} />
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.data_count || '-'}
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
              {currData.data.roleid === USER_TYPE.Admin && (
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
                    title="Qr Code"
                    icon={<QrCodeScannerOutlinedIcon />}
                    content={
                      <TrainerQRCodeDisplay
                        qrCodeUrl={row.qr_code}
                        BatchNumber={row.batch_number}
                      />
                    }
                    size="md"
                    sx={{
                      color: 'error.main',
                      bgcolor: 'grey.50',
                      borderRadius: 1.5,
                    }}
                    disabled={!row.enable_qr}
                  />
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
                    size="lg"
                    sx={{
                      color: 'secondary.dark',
                      bgcolor: 'secondary.100',
                      borderRadius: 1.5,
                    }}
                    disabled={!isActive}
                  />
                  <IconButtonModal
                    icon={<DeleteIcon />}
                    content={
                      <DeleteModal
                        id={row.batch_id}
                        batchNumber={row.batch_number}
                      />
                    }
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.100',
                      borderRadius: 1.5,
                    }}
                    modalFooter={false}
                    aria-label="delete"
                    disabled={!isActive}
                  />
                  {(currData.data.roleid === USER_TYPE.Admin || isActive) && (
                    <IconButtonModal
                      icon={isActive ? <ToggleOffIcon /> : <ToggleOnIcon />}
                      content={<StatusModal data={row} isActive={isActive} />}
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
