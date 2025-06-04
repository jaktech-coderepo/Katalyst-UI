'use client';

import { Button, Stack } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import React from 'react';
import { useSideBarToggle } from './SideBarToggleContext';
import ProfileComponent from './ProfileComponent';

function Logo() {
  const { toggle } = useSideBarToggle();
  return (
    <Stack flexDirection={'row'} justifyContent={'space-between'}>
      <ProfileComponent />
      <Button
        sx={{
          bgcolor: 'grey.50',
          width: 40,
          height: 40,
          borderRadius: '50%',
          padding: 0,
          minWidth: 0,
        }}
        onClick={toggle}
      >
        <MenuOpenIcon
          sx={{
            fontSize: 20,
            color: 'common.black',
          }}
        />
      </Button>
    </Stack>
  );
}

export default Logo;
