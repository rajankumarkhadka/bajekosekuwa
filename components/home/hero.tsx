'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  ArrowRight,
  Pause,
  Play,
  Calendar,
  UtensilsCrossed,
} from 'lucide-react';
import { useOutlet } from '@/context/OutletContext';
import OutletSelectorModal from '@/components/layout/OutletSelectorModal';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  highlightTitle: string;
  description: string;
  image: string;
  primaryCta: {
    text: string;
    href: string;
    isModalTrigger?: boolean;
  };
  secondaryCta: {
    text: string;
    href: string;
    icon?: 'calendar' | 'menu' | 'map';
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: 'Authentic Nepalese Sekuwa',
    title: 'Traditional Himalayan',
    highlightTitle: 'Charcoal Sekuwa',
    description:
      'Savor the legendary 45+ year recipe of Himalayan charcoal-grilled skewers marinated with secret spices passed down through generations.',
    image: '/images/img1.png',
    primaryCta: { text: 'Explore Menu', href: '/menu' },
    secondaryCta: { text: 'Book A Table', href: '/reservation', icon: 'calendar' },
  },
  {
    id: 2,
    badge: 'Culinary Legacy Since 1978',
    title: 'A Heritage Built On',
    highlightTitle: 'Unmatched Flavor',
    description:
      "Founded by Bajeko (Mr. Dinanath Gupta), carrying forward Nepal's most beloved food tradition with warmth and authentic recipes.",
    image: '/images/banner.jpg',
    primaryCta: { text: 'Our Story', href: '/about' },
    secondaryCta: { text: 'View Gallery', href: '/gallery' },
  },
  {
    id: 3,
    badge: 'Global Multi-Vendor Outlets',
    title: 'Experience Bajeko Sekuwa',
    highlightTitle: 'Worldwide Branches',
    description:
      'Discover genuine Nepalese hospitality and signature charcoal grilled delicacies at our nearest location in Nepal, USA, UAE, and beyond.',
    image: '/images/img2.png',
    primaryCta: { text: 'Select Outlet', href: '#', isModalTrigger: true },
    secondaryCta: { text: 'Contact Us', href: '/contact', icon: 'map' },
  },
  {
    id: 4,
    badge: 'Signature Sekuwa & Grill',
    title: 'Sizzling Delicacies &',
    highlightTitle: 'Nepalese Feasts',
    description:
      'From tender mutton sekuwa to authentic house curries and wood-fired specialties prepared fresh daily by master chefs.',
    image: '/images/banner2.jpg',
    primaryCta: { text: 'Order Now', href: '/menu' },
    secondaryCta: { text: 'Book Table', href: '/reservation', icon: 'calendar' },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { selectedOutlet } = useOutlet();

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Auto-play timer (6 seconds max per slide)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [current, isAutoPlaying, nextSlide]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative h-screen min-h-[720px] max-h-[900px] flex items-center justify-center overflow-hidden pt-16 bg-neutral-950 select-none group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image Carousel with Framer Motion crossfade & scale zoom */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays for rich contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 sm:px-10 text-center flex flex-col items-center">
        {/* Branch Context Awareness Pill */}
        {selectedOutlet && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-medium mb-4 shadow-lg"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C4010F]" />
            <span>
              Now Viewing: <strong className="text-amber-400">{selectedOutlet.name}</strong> ({selectedOutlet.country?.name || 'Nepal'})
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-1 text-[11px] underline text-gray-300 hover:text-white cursor-pointer"
            >
              Change
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Slide Badge */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 backdrop-blur-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {slide.badge}
            </motion.span>

            {/* Main Slide Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 drop-shadow-md max-w-4xl"
            >
              {slide.title}
              <br />
              <span className="text-[#C4010F] drop-shadow-lg">{slide.highlightTitle}</span>
            </motion.h1>

            {/* Slide Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-gray-200/90 max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
            >
              {slide.description}
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center items-center"
            >
              {slide.primaryCta.isModalTrigger ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E79C1E] hover:bg-[#d48c15] text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-lg shadow-amber-950/30 hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{slide.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <Link
                  href={slide.primaryCta.href}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E79C1E] hover:bg-[#d48c15] text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-lg shadow-amber-950/30 hover:-translate-y-0.5 text-sm"
                >
                  <span>{slide.primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}

              <Link
                href={slide.secondaryCta.href}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/40 px-8 py-3.5 rounded-xl font-bold tracking-wide backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                {slide.secondaryCta.icon === 'calendar' && <Calendar className="w-4 h-4 text-amber-400" />}
                {slide.secondaryCta.icon === 'menu' && <UtensilsCrossed className="w-4 h-4 text-amber-400" />}
                {slide.secondaryCta.icon === 'map' && <MapPin className="w-4 h-4 text-amber-400" />}
                <span>{slide.secondaryCta.text}</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Navigation Controls - Left & Right Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-[#C4010F] text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-[#C4010F] text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Bar: Slide Counter, Progress Bar & Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
        {/* Slide Counter */}
        <div className="flex items-center gap-3 text-white/80 font-mono text-xs font-bold">
          <span className="text-amber-400 text-sm">{String(current + 1).padStart(2, '0')}</span>
          <span className="text-white/30">/</span>
          <span>{String(HERO_SLIDES.length).padStart(2, '0')}</span>

          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            aria-label={isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
            className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-amber-400" />}
          </button>
        </div>

        {/* Dynamic Progress Bar Indicators */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-500 cursor-pointer"
                style={{ width: isActive ? '48px' : '16px' }}
              >
                <div className="absolute inset-0 bg-white/30" />
                {isActive && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: isAutoPlaying ? 6 : 0.3,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-[#E79C1E] to-[#C4010F]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Outlet Selector Modal */}
      <OutletSelectorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

