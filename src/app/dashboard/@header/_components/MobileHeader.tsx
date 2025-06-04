'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid2 } from '@mui/material';
import TemporaryDrawer from './MobileDrawer';

const MobileHeader: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }} display={{ xs: 'block', md: 'none' }}>
        <AppBar
          position="static"
          sx={{ bgcolor: 'transparent', color: 'common.black' }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Grid2 color={'primary.main'} container spacing={2}>
              <Grid2 size={9}></Grid2>

              <Grid2
                size={3}
                alignItems={'end'}
                display={'flex'}
                justifyContent={'center'}
              >
                <IconButton LinkComponent={'a'} href="/logout">
                  <LogoutIcon
                    sx={{
                      fontSize: { xs: '20px', lg: '30px' },
                      color: 'common.black',
                    }}
                  />
                </IconButton>
              </Grid2>
            </Grid2>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <TemporaryDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
    </>
  );
};

export default MobileHeader;
