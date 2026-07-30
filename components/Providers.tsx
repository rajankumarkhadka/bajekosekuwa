'use client';

import React from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import { OutletProvider } from '@/context/OutletContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <OutletProvider>{children}</OutletProvider>
    </ReactQueryProvider>
  );
}
