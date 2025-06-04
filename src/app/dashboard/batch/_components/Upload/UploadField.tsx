import React from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AppActionType } from '@/types/appContext';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { IFileStatus } from '@/types/interface';

interface DropZoneProps {
  isDragging: boolean;
}

const DropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDragging',
})<DropZoneProps>(({ theme, isDragging }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  padding: theme.spacing(3),
  border: `2px dashed ${theme.palette.primary.dark}`,
  backgroundColor: isDragging ? theme.palette.common.white : 'transparent',
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function UploadFileField({
  setFiles,
  filesArray,
}: {
  filesArray: IFileStatus[];
  setFiles: React.Dispatch<React.SetStateAction<IFileStatus[]>>;
}) {
  const { dispatch } = useSnakberContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const simulateProgress = (
    index: number,
    fileSize: number,
    currentProgress: number = 0
  ) => {
    if (currentProgress >= 100) {
      setFiles((prev) =>
        prev.map((f, i) => (i === index ? { ...f, progress: 100 } : f))
      );
      return;
    }

    const increment = Math.max(500 / (fileSize / 1024), 1);

    setFiles((prev) =>
      prev.map((f, i) =>
        i === index
          ? { ...f, progress: Math.min(currentProgress + increment, 100) }
          : f
      )
    );

    setTimeout(() => {
      simulateProgress(index, fileSize, currentProgress + increment);
    }, 100);
  };

  const handleFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter(
      (file) =>
        file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')
    );

    if (validFiles.length === 0) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Invalid file type. Please upload CSV files only.',
          type: 'error',
        },
      });
      return;
    }

    const newFiles = validFiles.map((file) => ({
      file,
      progress: 0,
    }));

    const filesWithNoDuplicates = newFiles.filter(
      (newFile) =>
        !filesArray.some(
          (existingFile) => existingFile.file.name === newFile.file.name
        )
    );

    if (newFiles.length > filesWithNoDuplicates.length) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Duplicate files detected. Please upload unique files.',
          type: 'error',
        },
      });
      return;
    }

    setFiles((prev) => {
      const updatedFiles = [...prev, ...newFiles];

      newFiles.forEach((file, idx) => {
        const absoluteIndex = prev.length + idx;
        simulateProgress(absoluteIndex, file.file.size);
      });

      return updatedFiles;
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    handleFiles(files);
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  return (
    <DropZone
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      isDragging={isDragging}
      paddingBlock={10}
    >
      <Box
        sx={{ pointerEvents: isDragging ? 'none' : 'auto', paddingBlock: 5 }}
      >
        <CloudUploadIcon
          color={isDragging ? 'inherit' : 'primary'}
          sx={{ height: 50, width: 50 }}
        />
        <Typography variant="h6" gutterBottom>
          {isDragging
            ? 'Drop files here'
            : 'Drag & Drop or Choose file to upload'}
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ marginBlock: 2 }}
        >
          Select Files
          <VisuallyHiddenInput
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
            multiple
          />
        </Button>
      </Box>
    </DropZone>
  );
}

export default UploadFileField;
