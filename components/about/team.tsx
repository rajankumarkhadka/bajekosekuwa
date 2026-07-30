import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import Image from "next/image";
import { teamData } from "@/data/team";

export default function Team() {
    return (
        <MaxWidthWrapper className="relative py-20 ">
                <div className="w-full space-y-10  md:space-y-28">
                    {teamData.map((section, index) => (
                        <div
                            key={section.title}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-12  group`}
                        >
                            <div className="w-full space-y-6 sm:space-y-8 lg:space-y-10 relative z-10">
                                <div
                                    className="space-y-6 sm:space-y-8"
                                >
                                    <div className="flex flex-col">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-gray-900 leading-[1.1] md:leading-[0.95] tracking-tight group-hover:text-[#E59F27] transition-colors duration-500">
                                            {section.title}
                                        </h2>
                                    </div>

                                    <div className="w-12 h-px bg-[#E59F27]/40 group-hover:w-full group-hover:bg-[#E59F27] transition-all duration-700" />

                                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed ">
                                        &ldquo;{section.description}&rdquo;
                                    </p>
                                </div>
                            </div>

                            <div
                                className="w-full   relative h-[600px] overflow-visible bg-gray-50"
                            >
                                <Image
                                    src={section.image}
                                    alt={section.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105"
                                />

                                <div className="absolute -bottom-6 sm:-bottom-8 left-0 sm:-left-8 z-20 bg-[#C4010F] rounded-lg px-4 sm:px-5 py-3 sm:py-4 backdrop-blur-sm hover:shadow-3xl hover:scale-105 transition-all duration-300">
                                    <div className="space-y-1 sm:space-y-1.5">
                                        <div className="flex items-center gap-2.5">
                                            <p className="text-sm sm:text-base font-bold text-white">
                                                {section.name}
                                            </p>
                                        </div>
                                        <p className="text-xs sm:text-[13px] text-white pl-0 sm:pl-4">
                                            {section.designation}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </MaxWidthWrapper>
    )
}