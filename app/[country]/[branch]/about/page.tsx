import type { Metadata } from 'next';
import Banner from "@/components/layout/banner";
import Team from "@/components/about/team";
import BajekoLegacy from "@/components/about/BajekoLegacy";
import AboutClient from "@/components/about/aboutclient";

interface OutletAboutPageProps {
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: OutletAboutPageProps): Promise<Metadata> {
  const { country, branch } = await params;
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return {
    title: `About Us | ${branchName} Outlet | Bajeko Sekuwa`,
    description: `Discover the history, story, and culinary journey of Bajeko Sekuwa ${branchName} outlet.`,
  };
}

export default async function OutletAboutPage({ params }: OutletAboutPageProps) {
  const { country, branch } = await params;
  const formattedBranch = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return (
    <div className="pt-28">
      <Banner
        subtitle={`Our Legacy — ${formattedBranch}`}
        title={["About Our", `${formattedBranch} Outlet`]}
        description={`Experience timeless Himalayan sekuwa traditions, authentic spice blends, and warm hospitality at Bajeko Sekuwa ${formattedBranch}.`}
        image="/images/bajelogo.png"
      />
      <Team />
      <BajekoLegacy />
      <AboutClient />
    </div>
  );
}
