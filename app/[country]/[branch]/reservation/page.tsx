import type { Metadata } from 'next';
import Banner from "@/components/layout/banner";
import ChooseOutlet from "@/components/reservation/chooseoutlet";
import BookingPoliciesAndFAQ from "@/components/reservation/BookingPoliciesAndFAQ";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";

interface OutletReservationPageProps {
  params: Promise<{
    country: string;
    branch: string;
  }>;
}

export async function generateMetadata({ params }: OutletReservationPageProps): Promise<Metadata> {
  const { branch } = await params;
  const branchName = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return {
    title: `Book Table | ${branchName} Outlet | Bajeko Sekuwa`,
    description: `Reserve your table at Bajeko Sekuwa ${branchName} outlet for dining, private parties, and Himalayan charcoal delights.`,
  };
}

export default async function OutletReservationPage({ params }: OutletReservationPageProps) {
  const { branch } = await params;
  const formattedBranch = branch
    ? branch.charAt(0).toUpperCase() + branch.slice(1).replace(/-/g, ' ')
    : 'Outlet';

  return (
    <>
      <div className="pt-24">
        <Banner
          subtitle={`Reservation — ${formattedBranch}`}
          title={["Book Your Table at", `${formattedBranch}`]}
          description={`Reserve a table for family, friends, or private gatherings at Bajeko Sekuwa ${formattedBranch}.`}
          image="/images/bajelogo.png"
          titleBreak={false}
        />
      </div>

      <MaxWidthWrapper className="py-16 mx-auto grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-10">
        <BookingPoliciesAndFAQ />
        <ChooseOutlet />
      </MaxWidthWrapper>
    </>
  );
}
