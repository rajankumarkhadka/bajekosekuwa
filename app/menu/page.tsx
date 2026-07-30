import Banner from "@/components/layout/banner";
import MenuComponent from "@/components/menu";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Menu | Bajeko Sekuwa",
  description: "Explore our authentic Himalayan Sekuwa menu, grilled dishes, snacks, and refreshing beverages.",
};

export default function MenuPage() {
  return (
    <>
      <div className="pt-24">
        <Banner
          subtitle="our Menu"
          title={['Our', 'Menu']}
          titleBreak={false}
          description="Explore our authentic Himalayan grilled delicacies and refreshing beverages."
          image="/images/img4.png"
        />
      </div>

      <MaxWidthWrapper className="py-12 mx-auto">
        <MenuComponent />
      </MaxWidthWrapper>
    </>
  );
}