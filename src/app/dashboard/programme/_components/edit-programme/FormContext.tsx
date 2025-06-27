'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import programmeEditSchema, {
  ProgrammeEditType,
} from '@/validation/programmeEdit.schema';
import { IProgrammeDetails } from '@/types';

const EditProgrammeFormProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: IProgrammeDetails;
}) => {
  const methods = useForm<ProgrammeEditType>({
    resolver: zodResolver(programmeEditSchema),
    defaultValues: {
      programe_name: data.programme_name || '',
      created_by: data.created_by,
      created_date: data.created_at || '',
      is_active: data.is_active || true,
      fields: data.fields || [],
      channel_id: data.channel_id || undefined,
      programe_type_id: data.programme_type_id || undefined,
      attendance: data.attendance || false,
      enable_qr: data.enable_qr || false,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default EditProgrammeFormProvider;
