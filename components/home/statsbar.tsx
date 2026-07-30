'use client';

import { motion } from "framer-motion";
import Banner from "@/components/layout/banner";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
// import { stats } from "@/data/stats";
// import { useCountUp } from "@/hooks/useCountUp";
import {
    Clock3,
    Users,
    Building2,
    Globe,
} from "lucide-react";

export const stats = [
    {
        value: 45,
        suffix: "+",
        label: "Years in Business",
        sublabel: "Since 1978",
        icon: Clock3,

    },
    {
        value: 3,
        suffix: "M+",
        label: "Happy Customers",
        sublabel: "Across the globe",
        icon: Users,
    },
    {
        value: 25,
        suffix: "+",
        label: "Outlets Worldwide",
        sublabel: "Nepal & International",
        icon: Building2,
    },
    {
        value: 7,
        suffix: "",
        label: "International Locations",
        sublabel: "USA · Australia · UAE",
        icon: Globe,
    },
];
export default function StatsBar() {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50 to-white">
            <MaxWidthWrapper className="">
                <Banner
                    subtitle="Our Milestones"
                    title={["A Legacy Built on", "Trust"]}
                    titleBreak={false}
                    titleClassName="text-[70px] font-normal leading-[68px]"
                    image=""
                    description=""
                />

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 mt-14">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.55,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            whileHover={{ y: -6 }}
                            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#C4010F] to-[#9c010c] p-6 lg:p-9 flex flex-col items-center text-center gap-4 shadow-[0_8px_24px_rgba(196,1,15,0.18)] hover:shadow-[0_20px_45px_rgba(196,1,15,0.35)] transition-shadow duration-500"
                        >
                            <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors duration-500" />

                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-lg bg-white/15 flex items-center justify-center text-white ring-1 ring-white/20 group-hover:bg-white/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <stat.icon />
                            </div>

                            <p className="relative text-4xl lg:text-5xl font-serif font-black text-white tracking-tight">
                                <span>
                                    {stat.value}
                                    {stat.suffix}
                                </span>
                            </p>

                            <div className="relative">
                                <p className="text-sm lg:text-base text-white font-semibold tracking-wide">
                                    {stat.label}
                                </p>
                                <p className="text-xs lg:text-sm text-white/70 mt-1.5">
                                    {stat.sublabel}
                                </p>
                            </div>

                            <div className="relative w-8 h-0.5 bg-white/30 rounded-full group-hover:w-16 group-hover:bg-white/60 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    );
}