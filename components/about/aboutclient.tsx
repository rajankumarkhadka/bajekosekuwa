'use client';

import Image from "next/image";
import { motion, } from "framer-motion";
import Banner from "@/components/layout/banner";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import MotionDiv from "@/components/ui/MotionDiv";
import Button from "@/components/ui/button";


const brandValues = [
    {
        id: "01",
        title: "Pure Authenticity",
        description: "Our dishes follow the same traditional recipes and charcoal roasting techniques that made Bajeko Sekuwa famous.",
    },
    {
        id: "02",
        title: "Sacred Hospitality",
        description: "Guests are treated as family, following the mountain tradition of 'Atithi Devo Bhava'.",
    },
    {
        id: "03",
        title: "Global Reach",
        description: "Seven international outlets carry the flavors of Nepal to audiences in the USA, Australia, and Dubai.",
    },
];
export default function AboutClient() {
    return (
        <main
            className="min-h-screen bg-white text-gray-900  relative overflow-hidden"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
            <div className="absolute bottom-0 right-0 pointer-events-none z-0 opacity-20 transform translate-x-1/4 translate-y-1/4 overflow-hidden">
                <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">

                    {[...Array(15)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M ${150 + i * 40} 0 Q ${800 - i * 30} 400 ${150 + i * 40} 800`}
                            stroke="url(#patternGradient)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 4, delay: i * 0.1, ease: "easeInOut" }}
                        />
                    ))}
                    {[...Array(15)].map((_, i) => (
                        <motion.path
                            key={`h-${i}`}
                            d={`M 0 ${150 + i * 40} Q 400 ${800 - i * 30} 800 ${150 + i * 40}`}
                            stroke="url(#patternGradient)"
                            strokeWidth="0.8"
                            strokeOpacity="0.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 4, delay: i * 0.15, ease: 'easeInOut' }}
                        />
                    ))}
                </svg>
            </div>




            <section className="relative bg-white text-gray-900 py-10 md:py-20  overflow-hidden border-t border-gray-200">
                <div className=" space-y-24 relative z-10">
                    <Banner
                        subtitle=" The Foundation"
                        title={["The Spirit of ", "Bajeko Sekuwa"]}
                        description=""
                        image=""
                    />


                    <MaxWidthWrapper className="grid grid-cols-1 md:grid-cols-3 gap-y-10 sm:gap-y-16">
                        {brandValues.map((value, index) => (
                            <motion.div
                                key={value.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.8 }}
                                className="group flex flex-col gap-4 sm:gap-6"
                            >
                                <div className="flex items-center gap-4 border-b border-gray-200 pb-4 sm:pb-6 group-hover:border-[#C4010F]/30 transition-colors duration-500">
                                    <span className="text-[11px] tracking-[0.3em] text-[#C4010F] font-bold shrink-0">
                                        {value.id}
                                    </span>
                                    <h3 className="font-cormorant text-xl sm:text-2xl font-semibold group-hover:text-gray-900 transition-colors">
                                        {value.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </MaxWidthWrapper>
                </div>
            </section>

            <section className="py-10 sm:py-20 bg-gray-50 ">
                <div className="flex justify-center px-4 sm:px-6">
                    <div className="">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-10 space-y-4 sm:space-y-6"
                        >
                            {/* <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl  font-serif text-gray-900 leading-[1.1] md:leading-[0.95] tracking-tight">
                                Our Vision & <span className="italic text-[#C4010F]">Mission</span>
                            </h2> */}
                            <Banner
                                subtitle=""
                                title={["Our Vision", "& Mission"]}

                                description=""
                                titleBreak={false}

                                image=""
                            />

                        </motion.div>

                        <MaxWidthWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 px-2 sm:px-0">
                            {/* Vision */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#C4010F]">
                                    Vision
                                </p>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black leading-relaxed">
                                    Global F&B Brand That Adds Value to the Nation
                                </h3>
                                <p className="text-black leading-relaxed text-sm sm:text-base">
                                    To be recognized internationally as a premier food and beverage establishment that embodies the essence of Nepali excellence and innovation.
                                </p>
                            </motion.div>

                            {/* Mission */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="space-y-4"
                            >
                                <p className="text-xs tracking-[0.1em] font-bold uppercase text-[#C4010F]">
                                    Mission
                                </p>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black leading-relaxed">
                                    Specializing in Beverages & Grill-Based Nepali Cuisine
                                </h3>
                                <p className="text-black leading-relaxed text-sm sm:text-base">
                                    Crafting memorable culinary experiences by artfully combining authentic Nepali traditions with sophisticated beverage selections and refined grilling techniques.
                                </p>
                            </motion.div>
                        </MaxWidthWrapper>
                    </div>
                </div>
            </section>

            <section className="relative py-10 sm:py-20   bg-white border-t border-gray-200">
                <div className="w-full max-w-7xl mx-auto space-y-20 sm:space-y-28 md:space-y-32 lg:space-y-40">

                    <Banner
                        subtitle="Ecosystem"
                        title={["Sister", "Concerns"]}
                        description="Expanding the legacy of Bajeko Sekuwa through specialized ventures that preserve authenticity while exploring new dimensions of Nepali cuisine."
                        titleBreak={false}
                        image=""
                    />

                    <div className="flex px-4 flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">
                        <div className="w-full lg:flex-1 space-y-6 sm:space-y-8 lg:space-y-10">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900">
                                Bajeko Masala
                            </h3>

                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl">
                                Bajeko Masala, the sister concern of Bajeko Sekuwa, is dedicated to producing high-quality masalas that elevate the flavors of authentic Nepali cuisine.
                                Led by founder and chairman <span className="text-gray-900 font-bold">Mrs. Nitima Karki Bhandari</span>, it operates as a separate entity focused on producing and distributing a diverse range of spices.
                                From sekuwa masala, momo masala, chowmein masala to curry blends, each product is crafted with precision to enhance culinary experiences.
                            </p>

                            <div className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl">
                                Her passion for food and commitment to quality drive the vision and operations, ensuring every meal prepared with Bajeko Masala becomes a true delight.
                            </div>
                        </div>
                        <div className="w-full lg:w-auto shrink-0">
                            <Image
                                src="/images/bajekomasala.png"
                                alt="Bajeko Masala"
                                width={500}
                                height={500}
                                className="w-full max-w-sm sm:max-w-md lg:w-[500px] mx-auto"
                            />
                        </div>
                    </div>

                    <div className="flex px-4 flex-col-reverse lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">
                        <div className="w-full lg:w-auto shrink-0">
                            <Image
                                src="/images/timmure.png"
                                alt="Timmure"
                                width={500}
                                height={500}
                                className="w-full max-w-sm sm:max-w-md lg:w-[500px] mx-auto"
                            />
                        </div>
                        <div className="w-full lg:flex-1 space-y-6 sm:space-y-8 lg:space-y-10">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900">
                                Timmure
                            </h3>

                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl">
                                Similarly, <span className="text-gray-900 font-bold">Timmure</span> offers an economy-friendly dining experience, serving a menu reminiscent of Bajeko Sekuwa&apos;s authentic flavors.
                                With a focus on quality food in a welcoming ambiance, it stands out with liquor at MRP pricing.
                            </p>

                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl">
                                Currently operating outlets in Kamalbinayak, Mid Baneshwor, Durbarmarg, Mhepi, and Anamnagar,
                                Timmure brings accessible yet satisfying Nepali dining to a wider audience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-16 sm:py-20 px-4 text-center bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
                <MotionDiv
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto space-y-24 relative z-10"
                >
                    {/* <div className="flex items-center justify-center gap-4">
                        <div className="w-8 h-px bg-[#C4010F]" />
                        <span className="text-[10px] tracking-[0.30em] uppercase text-[#C4010F] font-bold">Join The Legacy</span>
                        <div className="w-8 h-px bg-[#C4010F]" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-[1.1] md:leading-[0.95] tracking-tight">
                        Experience the <br />
                        <em className="italic text-[#C4010F]">Heritage.</em>
                    </h2> */}
                    <Banner
                        subtitle="Join The Legacy"
                        title={["Experience the ", "Heritage"]}
                        description=""
                        image=""
                    />

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 ">
                        <Button
                            href="/menu"
                            className="group flex items-center  justify-center gap-3 bg-[#C4010F] text-white w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base tracking-[0.1em] font-semibold uppercase transition-colors duration-300"
                        >
                            Explore Menu
                            <svg className="group-hover:translate-x-1 transition-transform" width="16" height="10" viewBox="0 0 16 10" fill="none">
                                <path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                        <Button
                            href="/"
                            className="w-full sm:w-auto bg-black text-white px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base tracking-[0.1em] font-semibold uppercase transition-all duration-300 hover:bg-black hover:text-white"
                        >
                            Back to Home
                        </Button>
                    </div>
                </MotionDiv>
            </section>
        </main >
    );
}
