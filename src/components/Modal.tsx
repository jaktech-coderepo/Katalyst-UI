'use client';

import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, DialogTitle, IconButton, SxProps, Tooltip } from '@mui/material';
import ModalProvider, { useModal } from '@/context/ModalContext';
import { Theme } from '@emotion/react';

interface ScrollDialogContentProps {
  title?: string | React.ReactNode;
  content: React.ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
  btnLabel?: string | React.ReactNode;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: SxProps<Theme>;
  handleClickVoid?: boolean;
  icon?: React.ReactNode;
  iconWithTooltip?: React.ReactNode;
  tooltipText?: React.ReactNode;
  disabled?: boolean;
}

function ScrollDialogContent({
  title,
  btnLabel,
  content,
  endIcon,
  variant,
  startIcon,
  size = 'lg',
  sx,
  handleClickVoid = false,
  icon,
  iconWithTooltip,
  tooltipText,
  disabled,
}: ScrollDialogContentProps) {
  const { handleClose, handleOpen, open } = useModal();

  return (
    <>
      {btnLabel && (
        <Button
          variant={variant}
          onClick={() => {
            if (handleClickVoid) {
              return '';
            }
            handleOpen();
          }}
          endIcon={endIcon}
          startIcon={startIcon}
          disableElevation
          sx={sx}
          disabled={disabled}
        >
          {btnLabel}
        </Button>
      )}
      {icon && (
        <IconButton
          sx={sx}
          onClick={() => {
            if (handleClickVoid) {
              return '';
            }
            handleOpen();
          }}
          disabled={disabled}
        >
          {icon}
        </IconButton>
      )}
      {iconWithTooltip && (
        <Tooltip title={tooltipText} arrow={true}>
          <Box component={'span'}>
            <IconButton
              sx={sx}
              onClick={() => {
                if (handleClickVoid) {
                  return '';
                }
                handleOpen();
              }}
              disabled={disabled}
            >
              {iconWithTooltip}
            </IconButton>
          </Box>
        </Tooltip>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={size}
        fullWidth
      >
        {title && (
          <DialogTitle
            variant="h5"
            id="scroll-dialog-title"
            sx={{ paddingBlock: 1, paddingInline: 1.5 }}
          >
            {title}
          </DialogTitle>
        )}
        <DialogContent dividers={true} sx={{ padding: 0 }}>
          {content}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function ScrollDialog(props: ScrollDialogContentProps) {
  return (
    <ModalProvider>
      <ScrollDialogContent {...props} />
    </ModalProvider>
  );
}
