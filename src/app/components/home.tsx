'use client';

import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { Search } from './search';
import Link from 'next/link';

export const Home: FC = () => {
  return (
    <Box>
      <AppBar position="relative">
        <Toolbar>
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Link href="/feed" passHref>
            <Button color="inherit" sx={{ color: 'white' }}>
              Feed
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Search />
    </Box>
  );
};
