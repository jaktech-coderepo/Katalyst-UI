import SnakberProvider from '@/context/AppProvider';
import QueryClientProvider from '@/context/QueryClientProvider';
import ThemeProvider from '@/context/ThemeProvider';
import { PropsWithChildren, ReactNode } from 'react';

interface RootLayoutProps extends PropsWithChildren {
  params: Promise<{
    lang: string;
  }>;
  children: ReactNode;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <ThemeProvider isRtl={lang === 'ar'}>
        <SnakberProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </SnakberProvider>
      </ThemeProvider>
    </html>
  );
}
