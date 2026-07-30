'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import Banner from "../layout/banner";

export const testimonials= [
    {
        id: 1,
        name: "Rajan Shrestha",
        location: "Kathmandu, Nepal",
        rating: 5,
        quote: "Bajeko Sekuwa is more than a restaurant — it is a cultural experience. The charcoal sekuwa here takes me back to my childhood in the hills. Nothing else compares.",
        avatar: "RS",
        color: "#C4010F",
    },
    {
        id: 2,
        name: "Priya Tamang",
        location: "Pokhara, Nepal",
        rating: 5,
        quote: "I've tried sekuwa across Nepal, but Bajeko Sekuwa's spice blend and slow-roasting technique is absolutely unmatched. The Thakali set meal is a must-try for everyone.",
        avatar: "PT",
        color: "#E79C1E",
    },
    {
        id: 3,
        name: "Sanjay Karki",
        location: "Queens, New York, USA",
        rating: 5,
        quote: "Finding Bajeko Sekuwa in New York was the best surprise of my year. It genuinely tastes like home — the same smoky aroma, the same warmth. Incredible quality abroad.",
        avatar: "SK",
        color: "#2563EB",
    },
    {
        id: 4,
        name: "Anita Gurung",
        location: "Melbourne, Australia",
        rating: 5,
        quote: "We visit the Melbourne outlet every weekend without fail. The staff is warm, the food is consistently amazing, and the momo here is the best I've had outside Nepal.",
        avatar: "AG",
        color: "#059669",
    },
    {
        id: 5,
        name: "Deepak Rai",
        location: "Dubai, UAE",
        rating: 5,
        quote: "Bajeko Sekuwa in Dubai brings the entire Nepali community together. The food quality never wavers — every visit feels like a fresh experience. Highly recommended!",
        avatar: "DR",
        color: "#7C3AED",
    },
    {
        id: 6,
        name: "Manisha Adhikari",
        location: "Biratnagar, Nepal",
        rating: 5,
        quote: "Celebrating special occasions at Bajeko Sekuwa has become our family tradition. The hospitality is outstanding and the Himalayan spiced chicken sekuwa is simply divine.",
        avatar: "MA",
        color: "#C4010F",
    },
];

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);

    return (
        <section className="py-20 lg:py-28 bg-gray-50 overflow-hidden">
            <div className="w-full max-w-550 mx-auto px-6 lg:px-16 2xl:px-32 space-y-20">
                <Banner
                    subtitle="Our Testimonials"
                    title={["Loved Across the", "World"]}
                    description="From Kathmandu to New York — here is what our guests have to say about their Bajeko Sekuwa experience."
                    image=""
                    titleBreak={false}
                    titleClassName="!text-[60px] !leading-[75px]"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            onMouseEnter={() => setActive(i)}
                            className={`group relative bg-white rounded-lg border p-6 lg:p-7 flex flex-col gap-4 transition-all duration-300 cursor-default
                                ${active === i ? "border-[#C4010F]/30 -translate-y-1" : "border-gray-100 hover:border-[#C4010F]/20 hover:shadow-lg"}`}
                        >
                            {/* Quote mark */}
                            <div
                                className="absolute top-5 right-6 text-6xl font-serif leading-none opacity-10 select-none"
                                style={{ color: t.color }}
                            >
                                &ldquo;
                            </div>

                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, starIdx) => (
                                    <svg
                                        key={starIdx}
                                        className={`w-4 h-4 ${starIdx < t.rating ? "text-[#E79C1E]" : "text-gray-200"}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed flex-grow italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                    style={{ backgroundColor: t.color }}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-400">{t.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Google Review CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://www.google.com/search?q=Bajeko+Sekuwa+reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:border-[#C4010F] hover:text-[#C4010F] transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="currentColor" />
                        </svg>
                        Read More Reviews on Google
                    </a>
                </motion.div>
            </div>
        </section>
    );
}