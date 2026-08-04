'use client';

import React from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import { OutletProvider } from '@/context/OutletContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from './cart/CartDrawer';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <OutletProvider>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </OutletProvider>
    </ReactQueryProvider>
  );
}
