import { Form } from './components';
import { Box } from '@mui/material';
import { redirect } from 'next/navigation';
import { auth } from '../api/auth/auth';

const Page = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <Box>
      <Form />
    </Box>
  );
};

export default Page;
