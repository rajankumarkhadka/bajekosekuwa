'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Bike, ArrowRight } from "lucide-react";
import Banner from "../layout/banner";
// import { deliveryFeatures } from "@/data/delivery";
import Button from "../ui/button";

const FEATURE_ICONS = {
    zap: Zap,
    bike: Bike,
};
 const deliveryFeatures = [
    {
        id: "rapid-service",
        title: "Rapid Service",
        description: "Avg. delivery time 30-45 minutes",
        iconKey: "zap",
        badgeColorClass: "bg-[#ffb124]/10",
        textColorClass: "text-[#ffb124]",
        hoverBgClass: "group-hover:bg-[#ffb124]"
    },
    {
        id: "free-delivery",
        title: "Free Delivery",
        description: "On all orders above Rs. 3000",
        iconKey: "bike",
        badgeColorClass: "bg-[#C4010F]/10",
        textColorClass: "text-[#C4010F]",
        hoverBgClass: "group-hover:bg-[#C4010F]"
    }
];

export default function DeliverySection() {
    return (
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100/60 mt-20 border border-gray-200/80 w-[92vw] sm:w-[80vw] max-w-screen-xl 2xl:max-w-[2500px] mx-auto rounded-3xl p-6 sm:p-10 md:p-16 mb-20 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-[#C4010F]/5 rounded-full blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-[#ffb124]/10 rounded-full blur-[100px]" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                >
                    <Banner
                        subtitle="Food Delivered To Your Home"
                        title={["Bajeko Sekwa", "Worldwide Taste"]}
                        description="From our original stall in Kathmandu to seven international outlets, Bajeko Sekwa brings 48 years of Himalayan flavor, hospitality, and heritage to every table."
                        image=""
                        titleClassName="!text-[36px] sm:!text-[44px] lg:!text-[50px] !leading-[1.15]"
                        className="items-center text-start justify-start"
                    />

                    <div className="space-y-4">
                        {deliveryFeatures.map((feature) => {
                            const IconComponent = FEATURE_ICONS[feature.iconKey as keyof typeof FEATURE_ICONS];
                            return (
                                <div
                                    key={feature.id}
                                    className="flex items-center gap-4 p-3"
                                >
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${feature.badgeColorClass} ${feature.textColorClass} ${feature.hoverBgClass}`}>
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 tracking-tight">{feature.title}</h4>
                                        <p className="text-sm text-gray-600 mt-0.5">{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Button className="group inline-flex items-center justify-center gap-2 bg-[#C4010F] text-white px-9 py-4  font-bold text-base tracking-wide  hover:-translate-y-1 active:translate-y-0 transition-all duration-300 w-full sm:w-auto text-center cursor-pointer">
                        Order for Delivery
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-[280px] sm:h-[380px] md:h-[440px] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-gray-200 group"
                >
                    <Image
                        src="/images/img13.png"
                        alt="Delivery service direct to your door"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </motion.div>
            </div>
        </section>
    );
}