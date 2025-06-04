import React from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  SxProps,
  TextField,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { format } from 'date-fns';

interface DateRangeFieldProps<T extends FieldValues> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  startName: FieldPath<T>;
  endName: FieldPath<T>;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps;
  disablePast?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const formatDisplayDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const DateRangePopover = <T extends FieldValues>({
  open,
  anchorEl,
  onClose,
  control,
  setValue,
  startName,
  endName,
  disablePast,
  disableFuture,
  disabled,
  readOnly,
}: {
  open: boolean;
  anchorEl: HTMLDivElement | null;
  onClose: () => void;
  setValue: UseFormSetValue<T>;
} & Pick<
  DateRangeFieldProps<T>,
  | 'control'
  | 'startName'
  | 'endName'
  | 'disablePast'
  | 'disableFuture'
  | 'disabled'
  | 'readOnly'
>) => {
  const { errors } = useFormState({ control });
  const startError = errors[startName]?.message as string | undefined;
  const endError = errors[endName]?.message as string | undefined;
  const startValue = useWatch({ control, name: startName });
  const endValue = useWatch({ control, name: endName });

  const getMinDate = () => {
    if (startValue) return new Date(startValue);
    if (disablePast) return new Date();
    return undefined;
  };

  const withSafeTime = (dateStr: string) => new Date(`${dateStr}T12:00:00`);
  const toLocalISODate = (date: Date) => format(date, 'yyyy-MM-dd');

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      slotProps={{ paper: { sx: { borderRadius: 2, boxShadow: 4 } } }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          p: 3,
          minWidth: 450,
          bgcolor: 'background.paper',
        }}
      >
        <Controller
          name={startName}
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              value={field.value ? withSafeTime(field.value) : null}
              onChange={(date) => {
                const isoDate = toLocalISODate(date || new Date()) ?? '';
                field.onChange(isoDate);

                // Automatically update end date if needed
                const currentEndDate = endValue ? new Date(endValue) : null;
                if (!currentEndDate || (date && date > currentEndDate)) {
                  setValue(endName, isoDate as PathValue<T, Path<T>>);
                }
              }}
              disablePast={disablePast}
              disableFuture={disableFuture}
              disabled={disabled}
              readOnly={readOnly}
              sx={{ flex: 1 }}
              slotProps={{
                textField: {
                  error: !!startError,
                  helperText: startError,
                },
              }}
              format="dd/MM/yyyy"
            />
          )}
        />

        <Controller
          name={endName}
          control={control}
          render={({ field }) => (
            <DatePicker
              label="End Date"
              value={field.value ? withSafeTime(field.value) : null}
              onChange={(date) => {
                const isoDate = toLocalISODate(date || new Date()) ?? '';
                field.onChange(isoDate);
              }}
              disablePast={disablePast}
              disableFuture={disableFuture}
              minDate={getMinDate()}
              disabled={disabled || !startValue}
              readOnly={readOnly}
              sx={{ flex: 1 }}
              slotProps={{
                textField: {
                  error: !!endError,
                  helperText: endError,
                },
              }}
              format="dd/MM/yyyy"
            />
          )}
        />
      </Box>
    </Popover>
  );
};

const DateRangeTextField = ({
  start,
  end,
  error,
  helperText,
  onClick,
  onClear,
  disabled,
  readOnly,
  fullWidth,
  size,
  sx,
}: {
  start?: string;
  end?: string;
  error?: boolean;
  helperText?: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClear: () => void;
  disabled?: boolean;
  readOnly?: boolean;
} & Pick<DateRangeFieldProps<any>, 'fullWidth' | 'size' | 'sx'>) => {
  const displayValue = `${formatDisplayDate(start) || 'Start Date'} - ${formatDisplayDate(end) || 'End Date'}`;
  const cursorStyle = disabled || readOnly ? 'default' : 'pointer';
  const showClearButton = Boolean(start || end) && !disabled && !readOnly;

  return (
    <TextField
      value={displayValue}
      onClick={onClick}
      fullWidth={fullWidth}
      size={size || 'small'}
      sx={{
        ...sx,
        cursor: cursorStyle,
        '& .MuiInputBase-input': { cursor: cursorStyle },
      }}
      error={error}
      helperText={helperText}
      disabled={disabled}
      slotProps={{
        input: {
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              {showClearButton && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  sx={{ visibility: showClearButton ? 'visible' : 'hidden' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
              <ArrowDropDownIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default function DateRangeField<T extends FieldValues>(
  props: DateRangeFieldProps<T>
) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const { control, startName, endName, disabled, readOnly, setValue } = props;
  const { errors } = useFormState({ control });

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && !readOnly) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleClear = () => {
    setValue(startName, '' as PathValue<T, Path<T>>);
    setValue(endName, '' as PathValue<T, Path<T>>);
  };

  return (
    <>
      <Controller
        control={control}
        name={startName}
        render={({ field: { value: startValue } }) => (
          <Controller
            control={control}
            name={endName}
            render={({ field: { value: endValue } }) => (
              <DateRangeTextField
                start={startValue}
                end={endValue}
                error={!!errors[startName] || !!errors[endName]}
                helperText={[
                  errors[startName]?.message,
                  errors[endName]?.message,
                ]
                  .filter(Boolean)
                  .join('; ')}
                onClick={handleOpen}
                onClear={handleClear}
                {...props}
              />
            )}
          />
        )}
      />

      <DateRangePopover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        control={control}
        setValue={setValue}
        startName={startName}
        endName={endName}
        disablePast={props.disablePast}
        disableFuture={props.disableFuture}
        disabled={props.disabled}
        readOnly={props.readOnly}
      />
    </>
  );
}
