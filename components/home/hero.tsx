'use client';

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ImageIcon, ArrowRight } from "lucide-react";
import Button from "../ui/button";



export default function HeroSection() {



    const slides = [
        {
            title: "Authentic Nepalese, Indian and Asian cuisine",
            description:
                "Discover the authentic taste of Ceylon tea, grown and harvested in the lush highlands of Sri Lanka. Experience luxury, tradition, and unparalleled quality in every sip.",
            image:
                "/images/img1.png",
            badge: " Ceylon Tea Since 1982",
            href: "/product-category/tea",
            cta: "explore Tea"
        },

        {
            title: "Natural Health & Wellness",
            description:
                "Embrace a lifestyle of wellness with our all-natural range of supplements, herbal teas, and health products. Pure ingredients, proven results.",
            image:
                "/images/hero/slide-02.jpg",
            badge: "Herbal Care",
            href: "/product-category/herbal-care",
            cta: "Explore Wellness"
        },

        {
            title: "The Spice Route Experience",
            description:
                "Awaken your senses with our premium selection of pure Sri Lankan spices. Rich aroma, unmatched freshness, and authentic flavor guaranteed.",
            image:
                "/images/hero/slide-03.jpg",
            badge: "Spices of Ceylon",
            href: "/product-category/spices",
            cta: "Buy Spices"
        },

        {
            title: "Coconut Wellness Collection",
            description:
                "Experience the power of coconut – nature’s gift of pure wellness. Virgin coconut oil, natural beauty products, and more.",
            image:
                "/images/hero/slide-04.jpg",
            badge: "Coconut Products",
            href: "/product-category/coconut-products",
            cta: "Discover Coconut"
        }
    ];

    // --------------------------------------
    // Simple, non-reactive slider logic
    // --------------------------------------
    const current = 0;
    const direction = 1;
    const slide = slides[current];

    return (
        <section className="relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden pt-16 bg-neutral-950">

            <div className="absolute inset-0 z-0">
                {slides.map((s, index) => (
                    <motion.div
                        key={s.image + index}
                        initial={{ opacity: 0, scale: 1.12 }}
                        animate={{
                            opacity: index === current ? 1 : 0,
                            scale: index === current ? 1 : 1.08,
                        }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={s.image}
                            alt="Hero"
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="100vw"
                        />
                    </motion.div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/40 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/30" />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-6 sm:px-10 text-center">

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -28 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-5 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#F5C451]   "
                        >
                            {slide.badge}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.7 }}
                            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#101828] leading-[1.08] tracking-tight mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)]"
                        >
                            Traditional Favorites
                            <br />
                            <span className="text-[#C91623]">Different Taste</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.7 }}
                            className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            {slide.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button href={slide.href} className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E79C1E] text-white px-8 py-4 rounded-lg font-semibold tracking-wide  hover:bg-[#E79C1E]  hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                                {slide.cta}
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                            <Button href="/gallery" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/25 px-8 py-4 rounded-lg font-semibold tracking-wide backdrop-blur-md hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                                <ImageIcon className="w-4 h-4" />
                                View Gallery
                            </Button>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>


            </div>


        </section>
    );
}
