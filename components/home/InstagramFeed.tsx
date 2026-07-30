'use client';

import { motion } from "framer-motion";
import Banner from "@/components/layout/banner";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { InstagramIcon } from "@/components/ui/icon";
const instagramPosts = [
    {
        id: 1,
        media_url: "/images/img1.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
    {
        id: 2,
        media_url: "/images/img2.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
    {
        id: 3,
        media_url: "/images/img3.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
    {
        id: 4,
        media_url: "/images/img4.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
    {
        id: 5,
        media_url: "/images/img5.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
    {
        id: 6,
        media_url: "/images/img6.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
    {
        id: 7,
        media_url: "/images/img7.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
    {
        id: 8,
        media_url: "/images/img8.png",
        permalink: "#",
        caption: "Best Sekuwa in town!",
        like_count: 100,
        comments_count: 10,
    },
]
export default function InstagramFeed() {
    return (
        <section className="py-20 lg:py-28 overflow-hidden">
            <MaxWidthWrapper className="space-y-16 lg:space-y-20">
                <Banner
                    subtitle="Social Media"
                    title={["Follow Us on", "Instagram"]}
                    description="Join our community of food lovers. Tag your photos @bajekosekuwa to be featured."
                    titleBreak={false}
                    titleClassName="!text-[40px] sm:!text-[52px] lg:!text-[60px] !leading-[1.15]"
                    image=""
                /> 

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                    {instagramPosts.map((post, i) => (
                        <motion.a
                            key={post.id || i}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4 }}
                            className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 block border border-gray-100  transition-shadow duration-500"
                        >
                            <img
                                src={post.media_url}
                                alt={post.caption || "Instagram Post"}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-white p-4 text-center">
                                <InstagramIcon className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75" />
                                <p className="text-xs font-medium leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {post.caption}
                                </p>
                                <div className="flex gap-4 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                                    <span>❤️ {post.like_count.toLocaleString()}</span>
                                    <span>💬 {post.comments_count.toLocaleString()}</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <a
                        href="https://www.instagram.com/bajekosekuwa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#C4010F] text-white text-sm font-bold tracking-wide  hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                    >
                        <InstagramIcon />
                        Follow @bajekosekuwa
                    </a>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}