'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import Button from "../ui/button";

export default function PromoSection() {
    const badges = {
        primary: {
            badge: "LIMITED TIME",
            title: "First Order Special - 10% OFF",
            description: "Enjoy 10% off on your first home delivery through our mobile app."
        },
        secondary: {
            badge: "LUNCH COMBO",
            title: "The Thakali Experience",
            description: ""
        }
    }
    return (
        <section className="py-20 lg:py-28 bg-[#0A0A0A]">
            <MaxWidthWrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center gap-3 mb-12 lg:mb-16 text-center"
                >
                    <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#F5C451] font-bold px-4 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full " />
                        Special Offers
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <motion.div
                        key={badges.primary.badge}
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-lg p-8 sm:p-10 lg:p-12 flex flex-col justify-center items-start relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <span className="bg-[#C4010F] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5 inline-block shadow-[0_4px_14px_rgba(196,1,15,0.35)]">
                                {badges.primary.badge}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-headline font-black leading-tight tracking-tight mb-4 text-neutral-900">
                                {badges.primary.title}
                            </h2>
                            <p className="mb-8 max-w-xs text-neutral-600 leading-relaxed">
                                {badges.primary.description}
                            </p>
                            <Button className="group/btn inline-flex items-center gap-2 bg-[#C4010F] text-white px-7 py-3.5 rounded-lg font-semibold tracking-wide  transition-transform duration-700">
                                Claim Now
                                <span className="transition-transform duration-300">→</span>
                            </Button>
                        </div>
                        <div className="absolute -right-4 -bottom-8 opacity-[0.07] group-hover:scale-110 group-hover:opacity-[0.1] transition-all duration-500 pointer-events-none select-none">
                            <span className="font-headline text-[13rem] sm:text-[16rem] text-[#C4010F] leading-none">
                                %
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        key={badges.secondary.badge}
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-lg p-8 sm:p-10 lg:p-12 flex flex-col justify-center items-start relative overflow-hidden border border-white/10"
                    >
                        <div className="absolute inset-0">
                            <Image
                                src="/images/banner.jpg"
                                alt="Top view of a traditional meal set on a copper plate with various bowls of curry, dal, and pickles"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover brightness-[0.9] contrast-110 saturate-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <span className="bg-[#C4010F] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5 inline-block">
                                {badges.secondary.badge}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-headline font-black leading-tight tracking-tight text-white mb-4">
                                {badges.secondary.title}
                            </h2>

                            <Button href={badges.secondary.description} className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-lg font-semibold tracking-wide transition-transform duration-700">
                                Explore Gallery
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}