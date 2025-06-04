'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, use } from 'react';
import templateCreateSchema, {
  programmeCreateType,
} from '@/validation/programmeCreate.schema';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';

const CreateProgrammeFormProvider = ({ children }: { children: ReactNode }) => {
  const { data } = use(GetCurrentUserContext);
  const methods = useForm<programmeCreateType>({
    resolver: zodResolver(templateCreateSchema),
    defaultValues: {
      programe_name: '',
      created_by: data.data.userid,
      is_active: true,
      fields: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default CreateProgrammeFormProvider;
