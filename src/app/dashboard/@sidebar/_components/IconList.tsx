'use client';

import React from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useAppMenu from '@/app/hooks/appMenu';
import { useSideBarToggle } from './SideBarToggleContext';

export default function IconList() {
  const { toggle, isToggled } = useSideBarToggle();
  const appMenu = useAppMenu();

  const pathname = usePathname();

  return (
    <>
      <Box
        display={isToggled ? 'block' : 'none'}
        sx={{
          width: 'fit-content',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={toggle}
          sx={{
            bgcolor: 'grey.50',
            display: isToggled ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: '50%',
            padding: 2,
            minWidth: 0,
            marginBlockEnd: 1,
          }}
        >
          <MenuOpenIcon
            sx={{
              fontSize: 20,
              color: 'common.black',
              transform: 'rotate(-180deg)',
            }}
          />
        </Button>
        {appMenu.map((ele, i) => {
          const IconComponent = ele.icon;
          return (
            <Tooltip
              title={<Typography variant="body2">{ele.name}</Typography>}
              key={i}
              placement="right"
              arrow
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 1,
                  bgcolor: pathname === ele.url ? 'grey.50' : 'transparent',
                  borderRadius: '50%',
                  marginBlockEnd: appMenu.length - 1 === i ? 0 : 1,
                }}
              >
                <IconButton LinkComponent={Link} href={ele.url} disableRipple>
                  <IconComponent
                    sx={{
                      fontSize: 20,
                      color: pathname === ele.url ? 'common.black' : 'grey.400',
                    }}
                  />
                </IconButton>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </>
  );
}
