'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Logo from './Logo';
import MenuList from './MenuList';
import { useSideBarToggle } from './SideBarToggleContext';
import IconList from './IconList';

export default function SidebarContent() {
  const { isToggled } = useSideBarToggle();
  return (
    <>
      <Box
        display={!isToggled ? 'flex' : 'none'}
        rowGap={2}
        flexDirection="column"
      >
        <Logo />
        <Box>
          <Divider
            sx={{
              border: 1,
              height: '1px',
              color: 'grey.300',
            }}
          />
        </Box>
        <MenuList />
      </Box>
      <IconList />
    </>
  );
}
