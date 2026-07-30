'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Banner from "../layout/banner";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import Button from "../ui/button";

export interface SignatureDish {
    id: number;
    image: string;
}

export const signatureDishes: SignatureDish[] = [
    { id: 1, image: "/images/img13.png" },
    { id: 2, image: "/images/img6.png" },
    { id: 3, image: "/images/img10.png" },
];
export default function SignatureSection() {
    return (
        <section className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
            <MaxWidthWrapper>
                <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">
                        <div className="lg:w-1/2 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[500px] md:min-h-[520px]">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 rounded-r-[6rem] hidden lg:block"
                                style={{
                                    width: '52%',
                                    height: '82%',
                                    background: 'linear-gradient(160deg, #E79C1E 0%, #d98a10 100%)',
                                    zIndex: 0,
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0, x: -50, scale: 0.92 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                className="relative z-10 rounded-full overflow-hidden  border-[6px] sm:border-[10px] border-white ring-1 ring-black/5 group w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] transition-shadow duration-500 "
                            >
                                <Image
                                    src="/images/img3.png"
                                    alt="Signature Thakali Set"
                                    fill
                                    sizes="(max-width: 768px) 340px, 400px"
                                    className="object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out contrast-105 brightness-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
                                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
                            </motion.div>

                            <div className="absolute inset-0 z-20 pointer-events-none hidden xl:block">
                                {signatureDishes.map((dish, index) => {
                                    const radius = 290;
                                    const startAngle = -40;
                                    const spread = 80;

                                    const angle =
                                        (startAngle + (index / (signatureDishes.length - 1)) * spread) *
                                        (Math.PI / 180);

                                    const x = radius * Math.cos(angle);
                                    const y = radius * Math.sin(angle);

                                    return (
                                        <motion.div
                                            key={dish.id}
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            whileHover={{ y: -6, scale: 1.06 }}
                                            className="absolute rounded-full overflow-hidden border-[5px] border-white group/small cursor-pointer pointer-events-auto transition-all duration-500 "
                                            style={{
                                                width: 116,
                                                height: 116,
                                                left: `calc(50% + ${x}px - 58px)`,
                                                top: `calc(50% + ${y}px - 58px)`
                                            }}
                                        >
                                            <Image
                                                src={dish.image}
                                                alt="Food Image"
                                                fill
                                                sizes="116px"
                                                className="object-cover group-hover/small:scale-125 transition-transform duration-700 ease-out brightness-90 group-hover/small:brightness-105"
                                            />
                                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="relative z-10 flex flex-row xl:hidden justify-center gap-5 sm:gap-6 mt-12">
                                {signatureDishes.map((dish, index) => (
                                    <motion.div
                                        key={dish.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.4 + index * 0.15,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileTap={{ scale: 0.92 }}
                                        className="relative rounded-full overflow-hidden border-[3px] border-white  group/small cursor-pointer transition-transform duration-300"
                                        style={{ width: 84, height: 84, flexShrink: 0 }}
                                    >
                                        <Image
                                            src={dish.image}
                                            alt="Food Image"
                                            fill
                                            sizes="84px"
                                            className="object-cover brightness-90 contrast-110"
                                        />
                                        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-1/2 pl-0 lg:pl-10 2xl:pl-20 space-y-10 mt-16 lg:mt-0">
                            <Banner
                                subtitle="Signature Collection"
                                title={["Signature Culinary", "Masterpieces."]}
                                description="Our most loved dishes, crafted with the freshest ingredients and our secret family recipes. A taste of authentic Nepali cuisine that has won hearts across generations."
                                image=""
                                className="text-start justify-start items-center"
                                titleClassName="!text-[44px] sm:!text-[56px] lg:!text-[72px] !font-normal !leading-[1.08]"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.44, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-2"
                            >
                                <Button href="/menu" className="text-white px-10 md:px-12 py-4 md:py-5 border-1 border-gray-300 transition-all duration-300">
                                    Explore Menu
                                </Button>
                                <Button href="/about" className=" bg-gray-50 text-black border border-gray-200 px-10 md:px-12 py-4 md:py-5 rounded-lg font-bold text-base md:text-lg tracking-wide hover:bg-gray-100 hover:border-gray-300 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-sm text-center">
                                    Our Heritage
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}