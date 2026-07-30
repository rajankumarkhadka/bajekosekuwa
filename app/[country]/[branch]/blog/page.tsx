import type { Metadata } from 'next';
import Banner from '@/components/layout/banner';
import BlogClient from '@/components/ui/blog';

import { generateBranchStaticParams } from '@/utils/staticParams';

interface OutletBlogPageProps {
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export const generateStaticParams = generateBranchStaticParams;
export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: OutletBlogPageProps): Promise<Metadata> {
  const { branch } = await params;
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return {
    title: `Blog | ${branchName} Outlet | Bajeko Sekuwa`,
    description: `Stay updated with stories, news, and recipes from Bajeko Sekuwa ${branchName} outlet.`,
  };
}

export default async function OutletBlogPage({ params }: OutletBlogPageProps) {
  const { branch } = await params;
  const formattedBranch = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return (
    <div>
      <main className="min-h-screen bg-white text-gray-900 pt-28 pb-24 relative overflow-hidden space-y-24 font-small">
        <Banner
          subtitle={`The Sekuwa Chronicles — ${formattedBranch}`}
          title={["Himalayan", `Tales & Taste`]}
          description={`Discover stories, culinary secrets, and community news from Bajeko Sekuwa ${formattedBranch}.`}
          image="/images/writing.jpg"
        />

        <BlogClient />
      </main>
    </div>
  );
}
