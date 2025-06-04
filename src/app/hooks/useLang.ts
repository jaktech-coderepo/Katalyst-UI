'use client';

import { useParams } from 'next/navigation';

export default function useLang() {
  return useParams<{ lang: 'en' | 'ar' }>();
}
