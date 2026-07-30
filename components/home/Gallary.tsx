'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Banner from "../layout/banner";
import { ArrowUpRight } from "lucide-react";
import { useActiveOutletGallery } from "@/api/hooks/useBranchGallery";
import { useMemo } from "react";
import SafeImage from "@/components/ui/SafeImage";

const FALLBACK_IMAGES = ["/images/img7.png", "/images/img2.png", "/images/img8.png"];

export default function GalleryTeaser() {
    const { data: galleryData, activeOutlet } = useActiveOutletGallery();

    const displayImages = useMemo(() => {
        if (galleryData && galleryData.length >= 3) {
            return [
                galleryData[0].image_url || galleryData[0].image,
                galleryData[1].image_url || galleryData[1].image,
                galleryData[2].image_url || galleryData[2].image,
            ];
        }
        if (galleryData && galleryData.length > 0) {
            const result = galleryData.map(item => item.image_url || item.image);
            while (result.length < 3) {
                result.push(FALLBACK_IMAGES[result.length % FALLBACK_IMAGES.length]);
            }
            return result;
        }
        return FALLBACK_IMAGES;
    }, [galleryData]);

    return (
        <section className="bg-white py-20 sm:py-28 md:py-40 px-4 sm:px-8 overflow-hidden relative">
            <div className="w-full max-w-550 mx-auto px-6 lg:px-10 2xl:px-18 relative z-10">
                <div className="w-full flex flex-col lg:flex-row justify-between gap-16 lg:gap-32 items-center">
                    <div className="lg:w-[60%] grid grid-cols-2 gap-3 sm:gap-6 h-[350px] sm:h-[450px] md:h-[600px] lg:h-[600px] w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="relative rounded-lg overflow-hidden col-span-1 row-span-2 border border-gray-200 group"
                        >
                            <SafeImage
                                src={displayImages[0]}
                                alt="Visual Story 1"
                                fill
                                sizes="(max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-1000 contrast-110 group-hover:scale-110"
                                fallbackSrc={FALLBACK_IMAGES[0]}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative rounded-lg sm:rounded-lg overflow-hidden col-span-1 row-span-1 border border-gray-200"
                        >
                            <SafeImage
                                src={displayImages[1]}
                                alt="Visual Story 2"
                                fill
                                sizes="(max-width: 1024px) 50vw, 33vw"
                                className="object-cover hover:scale-110 transition-transform duration-1000 contrast-110"
                                fallbackSrc={FALLBACK_IMAGES[1]}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative rounded-lg sm:rounded-lg overflow-hidden col-span-1 row-span-1 border border-gray-200"
                        >
                            <SafeImage
                                src={displayImages[2]}
                                alt="Visual Story 3"
                                fill
                                sizes="(max-width: 1024px) 50vw, 33vw"
                                className="object-cover hover:scale-110 transition-transform duration-1000 contrast-110"
                                fallbackSrc={FALLBACK_IMAGES[2]}
                            />
                        </motion.div>
                    </div>

                    <div className="lg:w-[40%] space-y-10 mb-35">
                        <Banner
                            subtitle={activeOutlet ? `${activeOutlet.name} Outlet` : "Our Visual Story"}
                            title={["Discover the", "Bajeko Sekuwa."]}
                            description={
                                activeOutlet
                                    ? `Explore authentic culinary moments and charcoal sekuwa ambiance from our ${activeOutlet.name} outlet (${activeOutlet.address}).`
                                    : "Capture the essence of the Himalayas through our lens. From vibrant spices to warm heritage interiors, discover the soul of Bajeko Sekwa."
                            }
                            image=""
                            className="items-center text-start justify-start"
                            titleClassName="!text-[70px] !leading-[70px]"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link href="/gallery" className="inline-flex items-center gap-6 group">
                                <span className="text-gray-800 font-bold text-lg border-b-2 border-gray-200 pb-1 group-hover:border-[#C4010F] group-hover:text-[#C4010F] transition-colors font-sans">
                                    Explore Every Moment
                                </span>
                                <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:bg-[#C4010F] group-hover:border-transparent transition-all shadow-sm">
                                    <span className="material-symbols-outlined text-gray-800 text-2xl group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                        <ArrowUpRight />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#C4010F]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        </section>
    );
}