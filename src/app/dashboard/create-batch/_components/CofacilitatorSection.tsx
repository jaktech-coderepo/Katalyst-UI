import SimpleCheckboxField from '@/components/SimpleCheckboxField';
import { Button, Grid2 } from '@mui/material';
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from 'react-hook-form';
import { BatchCreateType } from '@/validation/batchCreate.schema';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TrainerRow from './TrainerRow';

export type CofacilitatorSectionProps = {
  form: UseFormReturn<BatchCreateType>;
  cofacilitators: {
    trainerFields: FieldArrayWithId<BatchCreateType, 'cofacilitators', 'id'>[];
    appendTrainer: UseFieldArrayAppend<BatchCreateType, 'cofacilitators'>;
    removeTrainer: UseFieldArrayRemove;
  };
};

export default function CofacilitatorSection({
  form,
  cofacilitators,
}: CofacilitatorSectionProps) {
  const { control, watch, setValue } = form;
  const hasCo = watch('has_cofacilitator');

  return (
    <Grid2 container size={12}>
      <Grid2 size={{ xs: 12, sm: 6 }} container alignItems={'center'}>
        <Grid2 size={{ xs: 12, sm: 'auto' }}>
          <SimpleCheckboxField
            control={control}
            name="is_virtual"
            label="Is Virtual"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 'auto' }}>
          <SimpleCheckboxField
            control={control}
            name="has_cofacilitator"
            label="Co-Facilitator"
          />
        </Grid2>
        {hasCo && (
          <Grid2 size={{ xs: 12, sm: 'auto' }}>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={() =>
                cofacilitators.appendTrainer({
                  assigned_date: `${new Date().toISOString().split('T')[0]}`,
                  cofacilitator_id: undefined,
                  start_time: watch('batch_start_time') ?? '10:10',
                  end_time: watch('batch_end_time') ?? '10:10',
                })
              }
            >
              Add Trainer
            </Button>
          </Grid2>
        )}
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}></Grid2>

      {hasCo &&
        cofacilitators.trainerFields.map((f, i) => (
          <TrainerRow
            key={f.id}
            index={i}
            control={control}
            setValue={setValue}
            removeTrainer={cofacilitators.removeTrainer}
            watch={watch}
          />
        ))}
    </Grid2>
  );
}
