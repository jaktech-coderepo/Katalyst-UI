import React, { use } from 'react';
import { Grid2, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DateField from '@/components/SimpleDateField';
import TimeField from '@/components/SimpleTimeField';
import type {
  Control,
  UseFieldArrayRemove,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { BatchCreateType } from '@/validation/batchCreate.schema';
import timeStringToDate from '@/utils/timeStringToDate';
import CreateCoFacilitatorField from '@/components/CoFacilitatorField/CreateCoFacilitatorField';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';

interface TrainerRowProps {
  index: number;
  control: Control<BatchCreateType>;
  setValue: UseFormSetValue<BatchCreateType>;
  removeTrainer: UseFieldArrayRemove;
  watch: UseFormWatch<BatchCreateType>;
}

export default function TrainerRow({
  index,
  control,
  setValue,
  removeTrainer,
  watch,
}: TrainerRowProps) {
  const { data: currData } = use(GetCurrentUserContext);
  return (
    <Grid2 size={12} container key={index} spacing={2}>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <CreateCoFacilitatorField
          name={`cofacilitators.${index}.cofacilitator_id`}
          setValue={setValue}
          TextFieldProps={{
            variant: 'standard',
            sx: { minWidth: { xs: '100%', md: '200px' } },
          }}
          userId={currData.data.userid}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <DateField
          control={control}
          name={`cofacilitators.${index}.assigned_date`}
          label="Select Date"
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 2.5 }}>
        <TimeField
          control={control}
          name={`cofacilitators.${index}.start_time`}
          label="Cofacilitator Start Time"
          format="hh:mm a"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 2.5 }}>
        <TimeField
          control={control}
          name={`cofacilitators.${index}.end_time`}
          label="Cofacilitator End Time"
          format="hh:mm a"
          minTime={
            watch(`cofacilitators.${index}.start_time`)
              ? timeStringToDate(watch(`cofacilitators.${index}.start_time`))
              : undefined
          }
        />
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 1 }} display="flex" alignItems="center">
        <IconButton onClick={() => removeTrainer(index)} color="error">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid2>
    </Grid2>
  );
}
