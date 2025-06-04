import React from 'react';
import { ToggleProvider } from './SideBarToggleContext';
import SidebarContent from './SidebarContent';

export default function Index() {
  return (
    <ToggleProvider>
      <SidebarContent />
    </ToggleProvider>
  );
}
