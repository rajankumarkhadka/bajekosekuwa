import type { Metadata } from 'next';
import Banner from '@/components/layout/banner';
import ContactClient from '@/components/contact/ContactClient';
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';

interface OutletContactPageProps {
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateMetadata({ params }: OutletContactPageProps): Promise<Metadata> {
  const { branch } = await params;
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return {
    title: `Contact Us | ${branchName} Outlet | Bajeko Sekuwa`,
    description: `Get in touch with Bajeko Sekuwa ${branchName} outlet for inquiries, catering, directions, and feedback.`,
  };
}

export default async function OutletContactPage({ params }: OutletContactPageProps) {
  const { branch } = await params;
  const formattedBranch = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return (
    <>
      <div className="pt-24">
        <Banner
          subtitle={`Contact — ${formattedBranch}`}
          title={["Connect With", `${formattedBranch}`]}
          description={`Have questions or inquiries for our ${formattedBranch} outlet? Reach out to our team directly.`}
          image="/images/bajelogo.png"
        />
      </div>

      <MaxWidthWrapper className="py-16 mx-auto">
        <ContactClient />
      </MaxWidthWrapper>
    </>
  );
}
