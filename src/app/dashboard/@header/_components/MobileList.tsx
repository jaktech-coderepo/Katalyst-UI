import React from 'react';
import {
  Box,
  Tooltip,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import useAppMenu from '@/app/hooks/appMenu';

export default function MobileList() {
  const appMenu = useAppMenu();
  return (
    <Box>
      {appMenu.map((obj, i) => {
        const IconComponent = obj.icon;
        return (
          <Tooltip
            title={<Typography variant="body2">{obj.name}</Typography>}
            key={i}
            placement="right"
            arrow
          >
            <ListItemButton
              sx={{
                paddingBlock: 1,
                paddingInline: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                }}
              >
                <IconComponent sx={{ fontSize: 25 }} />
              </ListItemIcon>
              <ListItemText
                primary={obj.name}
                sx={{
                  margin: 0,
                }}
              />
            </ListItemButton>
          </Tooltip>
        );
      })}
    </Box>
  );
}
