'use client';

import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { Search } from './search';

export const Home: FC = () => {
  return (
    <Box>
      <AppBar position="relative">
        <Toolbar>
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Search />
    </Box>
  );
};
