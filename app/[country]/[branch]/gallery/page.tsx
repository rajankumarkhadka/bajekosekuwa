import type { Metadata } from 'next';
import Banner from '@/components/layout/banner';
import GalleryContainer from '@/components/gallery/GalleryContainer';

import { generateBranchStaticParams } from '@/utils/staticParams';

interface OutletGalleryPageProps {
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export const generateStaticParams = generateBranchStaticParams;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: OutletGalleryPageProps): Promise<Metadata> {
  const { branch } = await params;
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return {
    title: `Gallery | ${branchName} Outlet | Bajeko Sekuwa`,
    description: `Explore visual stories, food artistry, and ambiance at Bajeko Sekuwa ${branchName} outlet.`,
  };
}

export default async function OutletGalleryPage({ params }: OutletGalleryPageProps) {
  const { branch } = await params;
  const formattedBranch = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return (
    <>
      <div className="pt-28">
        <Banner
          subtitle={`Culinary Artistry — ${formattedBranch}`}
          image="/images/bajelogo.png"
          title={[`${formattedBranch}`, 'Gallery']}
          description={`Discover authentic sekuwa preparation, vibrant dining ambiance, and special moments captured at Bajeko Sekuwa ${formattedBranch}.`}
        />
      </div>

      <GalleryContainer />
    </>
  );
}
