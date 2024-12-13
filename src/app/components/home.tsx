'use client';

import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { Search } from './search';
import Link from 'next/link';

export const Home: FC = () => {
  return <Search />;
};
