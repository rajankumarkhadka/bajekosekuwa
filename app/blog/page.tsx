import type { Metadata } from 'next';
import Banner from '@/components/layout/banner';
import BlogClient from '@/components/ui/blog';

export const metadata: Metadata = {
    title: 'Blog | Bajeko Sekuwa',
    description: 'Stay updated with tales, news, and recipes from Bajeko Sekuwa.',
};


export default function Blog() {
    return (
        <div>
            <main className="min-h-screen bg-white text-gray-900 pt-28 pb-24 relative overflow-hidden space-y-24 font-small">
                <Banner
                    subtitle="The Sekuwa Chronicles"
                    title={["Himalayan", "Tales & Taste"]}
                    description="Experience the timeless traditions and authentic flavors passed down through generations."
                    image="/images/writing.jpg"
                />

                <BlogClient />
            </main>
        </div>
    );
}