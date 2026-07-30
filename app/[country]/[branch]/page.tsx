import type { Metadata } from 'next';
import Banner from '@/components/layout/banner';
import GalleryContainer from '@/components/gallery/GalleryContainer';
import AboutSection from '@/components/home/aboutsection';
import SignatureSection from '@/components/home/SignatureSection';
import StatsBar from '@/components/home/statsbar';

interface BranchPageProps {
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export async function generateMetadata({ params }: BranchPageProps): Promise<Metadata> {
  const { country, branch } = await params;
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';
  const countryName = country
    ? country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ')
    : 'Nepal';

  return {
    title: `${branchName} Outlet | ${countryName} | Bajeko Sekuwa`,
    description: `Welcome to Bajeko Sekuwa ${branchName} outlet in ${countryName}. Discover menu, sekuwa specialties, visual story, and table reservations.`,
  };
}

export default async function BranchHomePage({ params }: BranchPageProps) {
  const { country, branch } = await params;

  const formattedBranch = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';
  const formattedCountry = country
    ? country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ')
    : 'Nepal';

  return (
    <>
      <div className="pt-28">
        <Banner
          subtitle={`Bajeko Sekuwa — ${formattedCountry}`}
          image="/images/bajelogo.png"
          title={['Welcome to', `${formattedBranch} Outlet`]}
          description={`Experience authentic Himalayan charcoal sekuwa, rich heritage, and fine dining at our ${formattedBranch} location.`}
        />
      </div>

      <StatsBar />
      <AboutSection />
      <SignatureSection />
      <GalleryContainer />
    </>
  );
}
