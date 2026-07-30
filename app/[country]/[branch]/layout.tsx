import React from 'react';
import OutletRouteSync from '@/components/layout/OutletRouteSync';
import vendorBranchService from '@/api/services/vendorBranch.service';
import { slugifyBranchName } from '@/utils/outletMatcher';

interface BranchLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const branches = await vendorBranchService.getBranches();
    if (branches && branches.length > 0) {
      return branches.map((b) => ({
        country: 'nepal',
        branch: slugifyBranchName(b.name),
      }));
    }
  } catch (err) {
    console.warn('generateStaticParams branches API warning:', err);
  }
  return [{ country: 'nepal', branch: 'anamnagar' }];
}

export const dynamicParams = true;

export default async function BranchLayout({ children, params }: BranchLayoutProps) {
  const { country, branch } = await params;

  return (
    <>
      <OutletRouteSync country={country} branch={branch} />
      {children}
    </>
  );
}
