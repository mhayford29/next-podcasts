'use client';

import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const NavBarLayout: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  const shouldNotRenderAppBar = pathname === '/login';

  if (shouldNotRenderAppBar) return <>{children}</>;

  return (
    <Box>
      <AppBar sx={{ position: 'sticky', top: 0 }}>
        <Toolbar>
          <Link href="/" passHref>
            <Button color="inherit" sx={{ color: 'white' }}>
              Search
            </Button>
          </Link>
          <Link href="/feed" passHref>
            <Button color="inherit" sx={{ color: 'white' }}>
              Feed
            </Button>
          </Link>
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default NavBarLayout;
