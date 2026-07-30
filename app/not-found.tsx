import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 relative overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#C4010F]/5 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-[#E79C1E]/5 blur-[70px]" />
      </div>

      <div className="relative z-10 max-w-lg space-y-8 px-4 flex flex-col items-center">
        <Link href="/" className="block mb-4 shrink-0 transition-opacity hover:opacity-90">
          <Image
            src="/images/logo.png"
            alt={`BajeKo Sekuwa Logo`}
            width={140}
            height={100}
            className="w-36 md:w-40 h-auto object-contain"
            priority
          />
        </Link>

        <div className="space-y-2">
          <h1 className="font-serif text-8xl md:text-9xl font-black text-[#C4010F] tracking-tight leading-none">
            404
          </h1>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Oops! Page <em className="text-[#C4010F] italic">Not Found</em>
          </h2>
        </div>

        <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm pt-2">
          <Button
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C4010F] hover:bg-[#9c000b] text-white px-8 py-4 rounded-lg font-bold text-base tracking-wide transition-all duration-300"
          >
            Back to Home
          </Button>
          <Button
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E79C1E] hover:bg-[#c8880a] text-white px-8 py-4 rounded-lg font-bold text-base tracking-wide transition-all duration-300"
          >
            View Our Menu
          </Button>
        </div>

        {/* Footer help note */}
        <p className="text-gray-400 text-xs">
          Need help? Contact us at{' '}
          <a href={`mailto:[EMAIL_ADDRESS]`} className="text-[#C4010F] hover:underline font-semibold">
            [EMAIL_ADDRESS]
          </a>
        </p>
      </div>
    </main>
  );
}
