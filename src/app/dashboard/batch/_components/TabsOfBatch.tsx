'use client';

import React, { ReactNode, use } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTabContext } from '@/context/TabProvider';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';
import { GetAllBatchContext } from './context/BatchGetAllContext';
import { GetBatchByUserIdContext } from './context/BatchGetByUserIdContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  if (value !== index) {
    return null;
  }

  return (
    <Box {...other} sx={{ p: { xs: 1, md: 2 } }}>
      {children}
    </Box>
  );
}

export default function TabsOfBatch({ elements }: { elements: ReactNode[] }) {
  const { data: currData } = use(GetCurrentUserContext);
  const {
    paginatedQuery: { setQueryParam },
  } =
    currData.data.roleid === 1
      ? use(GetAllBatchContext)
      : use(GetBatchByUserIdContext);
  const { value, setValue } = useTabContext();

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={value}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'common.black',
            },
          }}
        >
          <Tab
            label="Open"
            disableRipple
            onClick={() => {
              setValue(0);
              setQueryParam('flag', 1);
            }}
            sx={{
              color: 'common.black',
              opacity: 0.5,
              '&.Mui-selected': {
                color: 'common.black',
                opacity: 1,
              },
            }}
          />
          <Tab
            label="Close"
            disableRipple
            onClick={() => {
              setValue(1);
              setQueryParam('flag', 0);
            }}
            sx={{
              color: 'common.black',
              opacity: 0.5,
              '&.Mui-selected': {
                color: 'common.black',
                opacity: 1,
              },
            }}
          />
        </Tabs>
      </Box>
      {elements.map((ele, i) => (
        <CustomTabPanel value={value} key={`tab-${i}`} index={i}>
          {ele}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
