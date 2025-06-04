import { Typography } from '@mui/material';
import { redirect } from 'next/navigation';

export default async function page() {
  redirect('signin');
  return (
    <Typography variant="h4" textAlign={'center'}>
      Something went wrong
    </Typography>
  );
}
