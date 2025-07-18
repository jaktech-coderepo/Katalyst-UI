import CreateBranchField from '@/components/BranchField/CreateBranchField';
import fetchProgrammeSchema, {
  FetchProgrammeType,
} from '@/validation/fetchProgramme';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function DashboardHeader() {
  const [filterValue, setFilterValue] = React.useState('mtd');
  const { setValue, trigger } = useForm<FetchProgrammeType>({
    defaultValues: {
      programme_id: undefined,
    },
    resolver: zodResolver(fetchProgrammeSchema),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue((event.target as HTMLInputElement).value);
  };
  return (
    <Grid2
      container
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      spacing={2}
    >
      <Grid2 size={{ xs: 11.8, md: 5.8, lg: 3.8 }}>
        <Typography variant="h3">Dashboard</Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6, lg: 4 }}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        gap={4}
      >
        <Typography variant="h6" fontWeight={600}>
          Branch :
        </Typography>
        <Box flex={1}>
          <CreateBranchField
            name="programme_id"
            setValue={setValue}
            trigger={trigger}
            isFormLabel={false}
            TextFieldProps={{
              variant: 'outlined',
            }}
          />
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6, lg: 4 }}
        display={'flex'}
        justifyContent={'end'}
      >
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{
              boxShadow: 'rgba(0, 0, 0, .2) 0px 1px 4px',
              gap: 1,
              paddingInlineStart: 2,
              borderRadius: 3,
              bgcolor: 'common.white',
            }}
            value={filterValue}
            onChange={handleChange}
          >
            <FormControlLabel value="mtd" control={<Radio />} label="MTD" />
            <FormControlLabel value="qtd" control={<Radio />} label="QTD" />
            <FormControlLabel value="ytd" control={<Radio />} label="YTD" />
          </RadioGroup>
        </FormControl>
      </Grid2>
    </Grid2>
  );
}
