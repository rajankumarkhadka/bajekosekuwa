import type { Metadata } from 'next';
import Banner from "@/components/layout/banner";
import Team from "@/components/about/team";
import BajekoLegacy from "@/components/about/BajekoLegacy";
import AboutClient from "@/components/about/aboutclient";
export const metadata: Metadata = {
  title: 'About Us | Bajeko Sekuwa',
  description: 'Discover the story, tradition, and culinary journey of Bajeko Sekuwa.',
};


export default function AboutView() {
  const subtitle = "Our Sacred Legacy";
  const title: [string, string] = ["A Heritage of", "Excellence"];
  const description = "Experience the timeless traditions and authentic flavors passed down through generations.";

  return (
    <div className="pt-28">
      <Banner
        subtitle={subtitle}
        title={title}
        description={description}
        image="/images/bajelogo.png"
      />
      <Team />
      <BajekoLegacy />
      <AboutClient /> 
    </div>
  );
}
