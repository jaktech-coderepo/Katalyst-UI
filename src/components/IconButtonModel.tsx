'use client';

import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
  Tooltip,
} from '@mui/material';
import ModalProvider, { useModal } from '@/context/ModalContext';

interface IconButtonModalInterface {
  title?: ReactNode;
  icon?: ReactNode;
  iconWithTooltip?: ReactNode;
  iconSize?: 'small' | 'large' | 'medium';
  content: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  sxCloseBtn?: SxProps<Theme>;
  dialogSxContent?: SxProps<Theme>;
  modalFooter?: boolean;
  tooltipText?: ReactNode | string;
  fullWidth?: boolean;
  disabled?: boolean;
}
function IconButtonModalProperty({
  title,
  icon,
  iconWithTooltip,
  iconSize,
  content,
  size = 'lg',
  sx,
  modalFooter = true,
  tooltipText = '',
  fullWidth = false,
  dialogSxContent,
  sxCloseBtn,
  disabled,
}: IconButtonModalInterface) {
  const { handleClose, handleOpen, open } = useModal();

  return (
    <>
      {icon && (
        <IconButton
          onClick={handleOpen}
          disabled={disabled}
          size={iconSize}
          sx={sx}
        >
          {icon}
        </IconButton>
      )}
      {iconWithTooltip && (
        <Tooltip title={tooltipText}>
          <IconButton onClick={handleOpen} size={iconSize} sx={sx}>
            {iconWithTooltip}
          </IconButton>
        </Tooltip>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        maxWidth={size}
        fullWidth={fullWidth}
      >
        {title && <DialogTitle variant="h5">{title}</DialogTitle>}
        <DialogContent dividers={true} sx={{ padding: 0, ...dialogSxContent }}>
          {content}
        </DialogContent>
        {modalFooter && (
          <DialogActions>
            <Button
              variant="contained"
              sx={sxCloseBtn}
              disableElevation
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}

export default function IconButtonModal(props: IconButtonModalInterface) {
  return (
    <ModalProvider>
      <IconButtonModalProperty {...props} />
    </ModalProvider>
  );
}
