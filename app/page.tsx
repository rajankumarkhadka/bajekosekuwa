import AboutSection from "@/components/home/aboutsection";
import DeliverySection from "@/components/home/DeliverySection";
import GalleryTeaser from "@/components/home/Gallary";
import InstagramFeed from "@/components/home/InstagramFeed";
import PromoSection from "@/components/home/PromoSection";
import SignatureSection from "@/components/home/SignatureSection";
import StatsBar from "@/components/home/statsbar";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HeroSection from "@/components/home/hero";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <HeroSection/>
      <AboutSection />
      <StatsBar />
      <PromoSection />
      <SignatureSection />
      <GalleryTeaser />
      <TestimonialsSection />
      <InstagramFeed/>
      <DeliverySection/>
    </div>
  );
}
