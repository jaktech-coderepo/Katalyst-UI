import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import React, { Fragment, use } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButtonModal from '@/components/IconButtonModel';
import TableElement from '@/components/TableElement';
import ScrollDialog from '@/components/Modal';
import DeleteModal from './DeleteModel';
import UserEditForm from './UserEditForm';
import { GetAllUserContext } from './UserGetAllContext';
import ChangePasswordModal from './ChangePasswordModal';

export default function UserTableBody() {
  const {
    paginatedQuery: { data },
  } = use(GetAllUserContext);
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
                {row.userid || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.username || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.email || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.emp_id || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.channel_name || '-'}
              </TableCell>
              <TableCell
                sx={{
                  border: 0,
                  color: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {row.user_role_name || '-'}
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
                    title="Update User"
                    icon={<BorderColorIcon />}
                    content={<UserEditForm data={row} />}
                    size="md"
                    sx={{
                      color: 'secondary.dark',
                      bgcolor: 'secondary.100',
                      borderRadius: 1.5,
                    }}
                  />
                  <IconButtonModal
                    icon={<DeleteIcon />}
                    content={<DeleteModal id={row.userid} />}
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.100',
                      borderRadius: 1.5,
                    }}
                    modalFooter={false}
                    aria-label="delete"
                  />
                  <ScrollDialog
                    title="Update Users Password"
                    icon={<PasswordIcon />}
                    content={<ChangePasswordModal data={row} />}
                    size="sm"
                    sx={{
                      color: 'warning.dark',
                      bgcolor: 'warning.100',
                      borderRadius: 1.5,
                    }}
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
