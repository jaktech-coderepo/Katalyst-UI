import React from 'react';
import { Box, Button } from '@mui/material';
import nextLink from 'next/link';
import { usePathname } from 'next/navigation';
import useAppMenu from '@/app/hooks/appMenu';

export default function MenuList() {
  const pathname = usePathname();
  const appMenu = useAppMenu();

  return (
    <Box>
      {appMenu.map((ele, i) => {
        const Icon = ele.icon;
        return (
          <Box
            key={i}
            sx={{
              marginBlock: 0.8,
              borderRadius: 2,
              paddingBlock: 0.5,
              paddingInlineEnd: 20,
              bgcolor: pathname === ele.url ? 'grey.50' : 'transparent',
            }}
          >
            <Button
              variant="contained"
              startIcon={<Icon />}
              LinkComponent={nextLink}
              href={ele.url}
              sx={{
                color: pathname === ele.url ? 'common.black' : 'grey.400',
                bgcolor: 'transparent',
                paddingInlineEnd: 8,
                whiteSpace: 'nowrap',
                transition: 'color 0.1s ',
              }}
            >
              {ele.name}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
