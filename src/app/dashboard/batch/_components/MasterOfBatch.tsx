import React from 'react';
import TabsOfBatch from './TabsOfBatch';
import BatchTableHeader from './TableHeader';

export default function MasterOfBatch() {
  return (
    <TabsOfBatch
      elements={[
        <BatchTableHeader key={0} isActive={true} />,
        <BatchTableHeader key={1} isActive={false} />,
      ]}
    />
  );
}
