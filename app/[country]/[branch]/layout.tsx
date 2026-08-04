import React, { cache } from 'react';
import { notFound } from 'next/navigation';
import OutletRouteSync from '@/components/layout/OutletRouteSync';
import vendorBranchService from '@/api/services/vendorBranch.service';
import { slugifyBranchName } from '@/utils/outletMatcher';
import { BranchDetailsProvider } from '@/context/BranchDetailsContext';

interface BranchLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    country: string;
    branch: string;
  }>;
}


const getCachedBranchDetails = cache(async (branchName: string) => {
  return await vendorBranchService.getBranchByName(branchName);
});

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

export const dynamic = 'force-static';
export const dynamicParams = true;

export default async function BranchLayout({ children, params }: BranchLayoutProps) {
  const { country, branch } = await params;

  const branchData = await getCachedBranchDetails(branch);

  if (!branchData) {
    notFound();
  }

  return (
    <BranchDetailsProvider branch={branchData}>
      <OutletRouteSync country={country} branch={branch} />
      {children}
    </BranchDetailsProvider>
  );
}

