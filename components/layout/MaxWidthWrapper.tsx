import { cn } from "@/utils/utils";

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
}


export default function MaxWidthWrapper({
  children,
  className,
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[1450px] mx-auto px-4 md:px-6 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
