'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export function Providers({ children }: Props) {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
}
