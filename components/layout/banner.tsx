import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv";

interface BannerProps {
  subtitle: string;
  title: [string, string];
  description: string;
  image?: string; // optional
  titleBreak?: boolean;
  className?: string;
  titleClassName?: string;
}

export default function Banner({
  subtitle,
  title,
  description,
  image,
  titleBreak = true,
  className,
  titleClassName,
}: BannerProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}>
      <section className={`relative flex flex-col items-center text-center ${className}`}>
        <div className="space-y-6 relative z-10">

          {subtitle && (
            <div className={`flex items-center justify-center gap-4 ${className}`}>
              <span className="text-[10px] tracking-[0.30em] uppercase text-[#C4010F] font-bold whitespace-nowrap">
                {subtitle}
              </span>
            </div>
          )}

          <h1
            className={`text-2xl  md:text-6xl lg:text-7xl xl:text-8xl font-serif text-gray-900 leading-tight md:leading-[1.1] lg:leading-[0.95] tracking-tight ${titleClassName} ${!titleBreak ? "whitespace-nowrap" : ""
              }`}
          >
            {titleBreak ? (
              <>
                {title[0]}
                <br />
                <em className="text-[#C4010F] italic">{title[1]}</em>
              </>
            ) : (
              <>
                {title[0]}{" "}
                <em className="text-[#C4010F] italic">{title[1]}</em>
              </>
            )}
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            {description}
          </p>
        </div>
        {image && (
          <div className="absolute md:h-[250px] w-[250px] right-0 overflow-hidden">
            <Image
              src={image}
              alt="Decorative banner image"
              className="object-contain"
              fill
              sizes="250px"
              style={{
                opacity: 0.18,
                filter: "blur(0.8px) saturate(0.8)",
                transform: "scale(1.2)",
              }}
            />
          </div>
        )}
      </section>
    </MotionDiv>
  );
}