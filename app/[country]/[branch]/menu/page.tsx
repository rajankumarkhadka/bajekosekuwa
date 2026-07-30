import type { Metadata } from 'next';
import Banner from "@/components/layout/banner";
import MenuComponent from "@/components/menu";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

import { generateBranchStaticParams } from '@/utils/staticParams';

interface OutletMenuPageProps {
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export const generateStaticParams = generateBranchStaticParams;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: OutletMenuPageProps): Promise<Metadata> {
  const { branch } = await params;
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return {
    title: `Our Menu | ${branchName} Outlet | Bajeko Sekuwa`,
    description: `Explore authentic Himalayan Sekuwa menu, grilled dishes, snacks, and refreshing beverages at ${branchName} outlet.`,
  };
}

export default async function OutletMenuPage({ params }: OutletMenuPageProps) {
  const { branch } = await params;
  const formattedBranch = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return (
    <>
      <div className="pt-24">
        <Banner
          subtitle={`Our Menu — ${formattedBranch}`}
          title={[`${formattedBranch}`, 'Menu']}
          titleBreak={false}
          description={`Explore authentic Himalayan grilled delicacies and refreshing beverages available at Bajeko Sekuwa ${formattedBranch}.`}
          image="/images/img4.png"
        />
      </div>

      <MaxWidthWrapper className="py-12 mx-auto">
        <MenuComponent />
      </MaxWidthWrapper>
    </>
  );
}
