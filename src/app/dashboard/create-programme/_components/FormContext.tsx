'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, use } from 'react';
import templateCreateSchema, {
  ProgrammeCreateType,
} from '@/validation/programmeCreate.schema';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';

const CreateProgrammeFormProvider = ({ children }: { children: ReactNode }) => {
  const { data } = use(GetCurrentUserContext);
  const methods = useForm<ProgrammeCreateType>({
    resolver: zodResolver(templateCreateSchema),
    defaultValues: {
      programe_name: '',
      created_by: data.data.userid,
      is_active: true,
      channel_id: undefined,
      programe_type_id: undefined,
      enable_qr: false,
      attendance: false,
      fields: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default CreateProgrammeFormProvider;
