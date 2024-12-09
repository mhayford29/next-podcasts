'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';

export const Form = () => {
  return (
    <Button
      variant="contained"
      onClick={() => signIn('google', { redirectTo: '/' })}
    >
      Sign In With Google
    </Button>
  );
};
