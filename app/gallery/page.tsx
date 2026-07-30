import Banner from '@/components/layout/banner';
import GalleryContainer from '@/components/gallery/GalleryContainer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outlet Gallery | Bajeko Sekuwa',
  description: 'Explore branch-specific visual stories of Himalayan food, charcoal sekuwa, and ambiance.',
};

export default function GalleryPage() {
  return (
    <>
      <div className="pt-28">
        <Banner
          subtitle="Culinary Artistry"
          image="/images/bajelogo.png"
          title={["Explore Our", "Gallery"]}
          description="Discover authentic sekuwa preparation, vibrant ambiance, and culinary moments across all our outlets worldwide."
        />
      </div>

      <GalleryContainer />
    </>
  );
}