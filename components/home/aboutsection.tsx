import Image from "next/image";
import Banner from "@/components/layout/banner";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import MotionDiv from "@/components/ui/MotionDiv";
import { UtensilsCrossed, Soup, ChefHat, Globe2, } from "lucide-react";
export const aboutCaptions = [
    {
        id: 1,
        icon: UtensilsCrossed,
        text: "Authentic Taste",
        description: "Traditional Himalayan Flavours",
    },
    {
        id: 2,
        icon: Soup,
        text: "Freshly Prepared",
        description: "Cooked Fresh Every Day",
    },
    {
        id: 3,
        icon: ChefHat,
        text: "Family Recipes",
        description: "Passed Through Generations",
    },
    {
        id: 4,
        icon: Globe2,
        text: "Global Presence",
        description: "Serving Across The World",
    },
];

export default function AboutSection() {
  return (
    <section className="py-15 bg-white overflow-hidden relative">
      <MaxWidthWrapper className=" relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between ">
          <div className="lg:w-[50%] ">
            <div className="flex items-start justify-start">
              <Banner
                subtitle="Authentic Heritage"
                title={["Discover Your", "Taste."]}
                description="As we celebrate our legacy, we're thrilled to share the flavors of Nepal with the world. Bajeko Sekuwa now proudly boasts 7 international outlets in New York, Dallas, Colorado, Melbourne, Sydney and Dubai."
                image=""
                className="text-start justify-start"
                titleClassName="!text-[72px] !font-normal !leading-[68px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
              {aboutCaptions.map((caption, index) => {
                const Icon = caption.icon;
                return (
                  <MotionDiv
                    key={caption.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-[#E79C1E]/10 group-hover:border-[#E79C1E]/30 transition-all duration-300">
                      <Icon className="text-[#E79C1E] w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg py-2  font-bold leading-relaxed ">
                        {caption.text}
                      </h3>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>

          </div>

          <div className="lg:w-[45%] relative group">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-lg overflow-hidden mt-30 border border-gray-200 bg-gray-50 w-[650px] h-[400px]"
            >
              <Image
                src="/images/img11.png"
                alt="Authentic Thakali Experience"
                width={650}
                height={600}
                className="object-contain group-hover:scale-105 group-hover:-translate-y-4 transition-transform duration-1000 contrast-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </MotionDiv>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}