'use client';

import React, { createContext, useContext } from 'react';
import type { VendorBranch } from '@/types';

interface BranchDetailsContextType {
  branch: VendorBranch | null;
}

const BranchDetailsContext = createContext<BranchDetailsContextType | null>(null);

export function BranchDetailsProvider({
  branch,
  children,
}: {
  branch: VendorBranch | null;
  children: React.ReactNode;
}) {
  return (
    <BranchDetailsContext.Provider value={{ branch }}>
      {children}
    </BranchDetailsContext.Provider>
  );
}

export function useBranchDetails() {
  const context = useContext(BranchDetailsContext);
  return context ?? { branch: null };
}

export function useCurrentBranch() {
  const context = useContext(BranchDetailsContext);
  return context?.branch ?? null;
}
