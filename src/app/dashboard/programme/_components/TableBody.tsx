import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import React, { Fragment, use } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import IconButtonModal from '@/components/IconButtonModel';
import TableElement from '@/components/TableElement';
import ScrollDialog from '@/components/Modal';
import { format } from 'date-fns';
import DeleteModal from './DeleteModel';
import ProgrammeEditForm from './ProgrammeEditForm';
import { GetAllProgrammeContext } from './ProgrammeGetAllContext';
import StatusModal from './StatusModal';

export default function TemplateTableBody({ isActive }: { isActive: boolean }) {
  const {
    paginatedQuery: { data },
  } = use(GetAllProgrammeContext);
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
                {row.programme_id || '-'}
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
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.is_active === true ? 'Yes' : 'No'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {format(new Date(row.created_at), 'dd-MMM-yy pp') || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.created_by_name || '-'}
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
                    title="Update Template"
                    icon={<BorderColorIcon />}
                    content={<ProgrammeEditForm data={row} />}
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
                    content={<DeleteModal id={row.programme_id} />}
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.100',
                      borderRadius: 1.5,
                    }}
                    modalFooter={false}
                    aria-label="delete"
                    disabled={row.is_referenced}
                  />
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
                </Box>
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </>
  );
}
