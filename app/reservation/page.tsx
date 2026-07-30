import Banner from "@/components/layout/banner";
import ChooseOutlet from "@/components/reservation/chooseoutlet";
import BookingPoliciesAndFAQ from "@/components/reservation/BookingPoliciesAndFAQ";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Table | Bajeko Sekuwa",
  description: "Reserve your table at your nearest Bajeko Sekuwa outlet for dining, private parties, and Himalayan charcoal delights.",
};

export default function ReservationPage() {
  return (
    <>
      <div className="pt-24">
        <Banner
          subtitle="Reservation"
          title={["Book Your", "Table"]}
          description="Select your favorite Bajeko Sekuwa dining location and confirm your reservation."
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