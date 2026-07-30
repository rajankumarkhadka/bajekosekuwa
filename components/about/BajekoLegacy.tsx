import Image from "next/image";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import Banner from "../layout/banner";
import { timelineEvents } from "@/data/timeline";
import MotionDiv from "../ui/MotionDiv";
import { MapPin } from "lucide-react";

export default function BajekoLegacy() {
    return (
        <section className="relative py-10 md:py-20 bg-gray-50 border-t border-b border-gray-200  overflow-hidden">
            <MaxWidthWrapper className="space-y-24 relative z-10">
                <Banner
                    subtitle=" Our Story"
                    title={["The Bajeko ", "Legacy"]}
                    titleBreak={false}
                    description="How a simple roadside charcoal grill near Kathmandu Airport grew into a worldwide symbol of authentic Himalayan hospitality."
                    image=""
                />
                <div className="relative">
                    <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C4010F]/40 via-[#E79C1E]/40 to-[#C4010F]/10 -translate-x-1/2" />

                    <div className="space-y-10 sm:space-y-16 md:space-y-24">
                        {timelineEvents?.slice().reverse().map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={event.year} className="relative flex flex-col md:flex-row items-stretch">
                                    <div className="absolute left-6 sm:left-8 md:left-1/2 top-5 sm:top-6 -translate-x-1/2 z-30">
                                        <MotionDiv
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-[#C4010F] shadow-lg flex items-center justify-center overflow-hidden"
                                        >
                                            <Image
                                                src={event.image}
                                                alt="Logo"
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </MotionDiv>
                                    </div>

                                    <div className="md:hidden w-full pl-16 sm:pl-20 pt-1">
                                        <MotionDiv
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8 }}
                                            className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(196,1,15,0.05)] hover:border-[#C4010F]/20 transition-all duration-500 w-full"
                                        >
                                            <span className="font-serif text-3xl sm:text-4xl font-black text-[#C4010F] mb-2 block">{event.year}</span>
                                            <h3 className="text-lg sm:text-xl font-serif text-gray-900 font-bold mb-3">{event.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm mb-3">{event.description}</p>
                                            <p className="text-gray-400 text-xs italic mb-3">{event.details}</p>
                                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                <MapPin className="w-4 h-4 text-[#C4010F]" />
                                                {event.location}
                                            </div>
                                        </MotionDiv>
                                    </div>


                                    <div className={`hidden md:flex w-1/2 pl-0 pr-16 justify-end ${isEven ? 'md:flex' : 'md:hidden'}`}>
                                        <MotionDiv
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8 }}
                                            className="bg-white p-8 rounded-3xl border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(196,1,15,0.05)] hover:border-[#C4010F]/20 transition-all duration-500 w-full max-w-xl text-right flex flex-col items-end"
                                        >
                                            <span className="font-serif text-4xl md:text-5xl font-black text-[#C4010F] mb-2">{event.year}</span>
                                            <h3 className="text-xl md:text-2xl font-serif text-gray-900 font-bold mb-4">{event.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">{event.description}</p>
                                            <p className="text-gray-400 text-xs italic mb-4">{event.details}</p>
                                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                <MapPin className="w-4 h-4 text-[#C4010F]" />
                                                {event.location}
                                            </div>
                                        </MotionDiv>
                                    </div>

                                    <div className={`hidden md:block w-1/2 ${isEven ? '' : 'order-first'}`} />

                                    <div className={`hidden md:flex w-1/2 pl-16 justify-start ${isEven ? 'md:hidden' : 'md:flex'}`}>
                                        <MotionDiv
                                            initial={{ opacity: 0, x: 30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8 }}
                                            className="bg-white p-8 rounded-3xl border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(196,1,15,0.05)] hover:border-[#C4010F]/20 transition-all duration-500 w-full max-w-xl text-left"
                                        >
                                            <span className="font-serif text-4xl md:text-5xl font-black text-[#C4010F] mb-2 block">{event.year}</span>
                                            <h3 className="text-xl md:text-2xl font-serif text-gray-900 font-bold mb-4">{event.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">{event.description}</p>
                                            <p className="text-gray-400 text-xs italic mb-4">{event.details}</p>
                                            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                <MapPin className="w-4 h-4 text-[#C4010F]" />
                                                {event.location}
                                            </div>
                                        </MotionDiv>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}