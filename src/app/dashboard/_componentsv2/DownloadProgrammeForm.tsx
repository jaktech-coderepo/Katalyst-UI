import { Button, Grid2 } from '@mui/material';
import React, { useState } from 'react';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import fetchProgrammeSchema, {
  FetchProgrammeType,
} from '@/validation/fetchProgramme';
import { AppActionType } from '@/types';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { CSVLink } from 'react-csv';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { getDashboardDownloadProgrammeData } from '@/action/dashboard.action';
import generateFileName from '@/utils/generateFileName';
import { format } from 'date-fns';
import CreateProgrammeField from './CreateProgrammeField';

export default function DownloadProgrammeForm() {
  const { dispatch } = useSnakberContext();

  const [state, setState] = useState<{
    data: any[];
    status: 'idle' | 'error' | 'success' | 'loading';
    message: string;
  }>({
    data: [],
    status: 'idle',
    message: '',
  });
  const { setValue, handleSubmit, reset, trigger } =
    useForm<FetchProgrammeType>({
      defaultValues: {
        programme_id: undefined,
      },
      resolver: zodResolver(fetchProgrammeSchema),
    });

  // useEffect(() => {
  //   setState({ data: [], status: 'idle', message: 'changed field' });
  // }, [watch('programme_id')]);

  async function onSubmit(formdata: FetchProgrammeType) {
    if (formdata.programme_id) {
      const id = formdata.programme_id;
      setState({ data: [], status: 'loading', message: '' });
      const response = await getDashboardDownloadProgrammeData({
        id,
      });

      if ('error' in response) {
        setState({ data: [], status: 'error', message: response.message });
        dispatch({
          type: AppActionType.ADD_ALERT,
          payload: {
            message: response.message ? response.message : response.error,
            type: 'error',
          },
        });
      } else {
        setState({
          ...state,
          data: [
            Object.keys(response.data[0]),
            ...response.data.map((obj) =>
              Object.keys(response.data[0]).map((key) =>
                // eslint-disable-next-line no-nested-ternary
                key === 'Batch_CreationDate' ||
                key === 'Batch_StartDate' ||
                key === 'Batch_EndDate'
                  ? key === 'Batch_CreationDate'
                    ? format(
                        new Date(obj[key as keyof typeof obj] as string),
                        'dd-MMM-yy pp'
                      )
                    : format(
                        new Date(obj[key as keyof typeof obj] as string),
                        'dd-MMM-yy'
                      )
                  : obj[key as keyof typeof obj]
              )
            ),
          ],
          status: 'success',
        });
        dispatch({
          type: AppActionType.ADD_ALERT,
          payload: {
            message: 'Fetched data Successfully',
            type: 'success',
          },
        });
        reset();
      }
    }
  }

  return (
    <Grid2
      container
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'end'}
      spacing={2}
      padding={{ xs: 1, md: 2 }}
    >
      <Grid2 size={{ xs: 12, md: 6 }}>
        <CreateProgrammeField
          name="programme_id"
          setValue={setValue}
          trigger={trigger}
          label="Download Raw Programme"
          setState={setState}
        />
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        display={'flex'}
        alignItems={'end'}
        justifyContent={{ xs: 'end', md: 'start' }}
      >
        {state.status === 'idle' && (
          <Button
            type="submit"
            variant="outlined"
            startIcon={<DownloadingIcon />}
          >
            fetch
          </Button>
        )}
        {state.status === 'loading' && (
          <Button variant="outlined" disabled startIcon={<DownloadingIcon />}>
            fetching...
          </Button>
        )}
        {state.status === 'success' && (
          <CSVLink
            data={state.data}
            filename={generateFileName(state.message, 'csv')}
          >
            <Button
              variant="outlined"
              onClick={() =>
                setState({
                  data: [],
                  status: 'idle',
                  message: '',
                })
              }
              startIcon={<FileDownloadOutlinedIcon />}
            >
              Download Now
            </Button>
          </CSVLink>
        )}
      </Grid2>
    </Grid2>
  );
}
