import React from 'react';
import TabsOfProgramme from './TabsOfProgramme';
import ProgrammeTableHeader from './TableHeader';

export default function MasterOfProgramme() {
  return (
    <TabsOfProgramme
      elements={[
        <ProgrammeTableHeader key={0} isActive={true} />,
        <ProgrammeTableHeader key={1} isActive={false} />,
      ]}
    />
  );
}
