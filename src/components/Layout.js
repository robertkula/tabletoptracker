import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      {/* Top Menu Bar */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Table Top Tracker
          </Typography>
          <Button color="inherit">
            <Link href="/" passHref>
              <Typography variant="button">Home</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/chart" passHref>
              <Typography variant="button">Chart</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/chart2" passHref>
              <Typography variant="button">Chart2</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/append" passHref>
              <Typography variant="button">Append</Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container sx={{ marginTop: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
