import type { Metadata } from 'next';
import Signin from './(auth)/signin/page';

export const metadata: Metadata = {
  title: 'Katalyst',
  description: 'Katalyst',
};

export default async function Home() {
  return <Signin />;
}
