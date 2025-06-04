'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import uploadDocumentSchema, {
  UploadDocumentType,
} from '@/validation/uploadDocument.schema';

const UploadDocumentFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<UploadDocumentType>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      file: [],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default UploadDocumentFormProvider;
