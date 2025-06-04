import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import nextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@mui/material';
import useAppMenu from '@/app/hooks/appMenu';
import { useStepper } from '../../stepper/StepperContext';

interface TemporaryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({ open, onClose }) => {
  const { setActiveStep } = useStepper();
  const appMenu = useAppMenu();
  const pathname = usePathname();

  const DrawerList = (
    <Box
      sx={{
        width: 210,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <Box sx={{ paddingInlineStart: 2, paddingBlock: 2 }}>
        <Typography variant="h5" fontWeight={600} color="primary.dark">
          Katalyst
        </Typography>
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List>
          {appMenu.map((item, i) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{ paddingInline: 0.6 }}
            >
              <ListItemButton
                component={nextLink}
                href={item.url}
                onClick={() => setActiveStep(i)}
                sx={{
                  paddingBlock: 1,
                  paddingInline: 1.5,
                  borderRadius: 2,
                  color: pathname === item.url ? 'common.black' : 'grey.400',
                  paddingInlineEnd: 8,
                  whiteSpace: 'nowrap',
                  marginBlock: 0.8,
                  backgroundColor:
                    pathname === item.url ? 'grey.50' : 'transparent',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 30,
                    color: pathname === item.url ? 'common.black' : 'grey.400',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    margin: 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
};

export default TemporaryDrawer;
