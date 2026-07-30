import React from 'react';
import OutletRouteSync from '@/components/layout/OutletRouteSync';

interface BranchLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export default async function BranchLayout({ children, params }: BranchLayoutProps) {
  const { country, branch } = await params;

  return (
    <>
      <OutletRouteSync country={country} branch={branch} />
      {children}
    </>
  );
}
