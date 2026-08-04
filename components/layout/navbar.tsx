'use client';

import { useState } from "react";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, ChevronDown, MapPin, UtensilsCrossed, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/utils/utils";
import { useOutlet } from "@/context/OutletContext";
import { useBranchDetails } from "@/context/BranchDetailsContext";

import { getOutletUrlPath } from "@/utils/outletMatcher";

import OutletSelectorModal from "./OutletSelectorModal";

export default function Navbar() {
    const pathname = usePathname();
    const { selectedOutlet } = useOutlet();
    const { branch: contextBranch } = useBranchDetails();
    const activeOutlet = contextBranch || selectedOutlet;
    const [isOutletModalOpen, setIsOutletModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const flagUrl = activeOutlet?.country?.flag_url_4x3 || "https://auth.bajekoshop.com/bajekoshop/flags/4x3/+977.svg";
    const countryName = activeOutlet?.country?.name || "Nepal";
    const outletName = activeOutlet?.name || "Outlet";

    const homeHref = getOutletUrlPath(activeOutlet, '');
    const aboutHref = getOutletUrlPath(activeOutlet, 'about');
    const blogHref = getOutletUrlPath(activeOutlet, 'blog');
    const galleryHref = getOutletUrlPath(activeOutlet, 'gallery');
    const contactHref = getOutletUrlPath(activeOutlet, 'contact');
    const menuHref = getOutletUrlPath(activeOutlet, 'menu');
    const reservationHref = getOutletUrlPath(activeOutlet, 'reservation');

    const navItems = [
        { href: homeHref, label: "Home" },
        { href: aboutHref, label: "About" },
        { href: blogHref, label: "Blog" },
        { href: galleryHref, label: "Gallery" },
        { href: contactHref, label: "Contact" },
    ];

    const isActive = (itemHref: string) => {
        if (itemHref === homeHref) {
            return pathname === homeHref;
        }
        return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
    };

    const isMenuActive = pathname === menuHref || pathname.startsWith(`${menuHref}/`);
    const isReservationActive = pathname === reservationHref || pathname.startsWith(`${reservationHref}/`);

    return (
        <>
            <div className="fixed top-0 left-0 w-full py-3.5 z-50 bg-white/95 backdrop-blur-md text-black shadow-xs border-b border-gray-100">
                <MaxWidthWrapper className="mx-auto w-full">
                    <div className="flex justify-between items-center">
                        {/* Left: Brand Logo & Outlet Selector */}
                        <div className="flex gap-2 sm:gap-3 items-center">
                            <Link href={homeHref} className="relative w-32 sm:w-36 h-10 sm:h-12 shrink-0">
                                <Image src="/images/logo.png" alt="Bajeko Sekuwa Logo" fill sizes="(max-width: 640px) 120px, 150px" className="object-contain" />
                            </Link>

                            <button
                                onClick={() => {
                                    setIsOutletModalOpen((prev) => !prev);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={cn(
                                    "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ml-1 sm:ml-2 shadow-2xs group border",
                                    activeOutlet
                                        ? "border-gray-300 hover:border-gray-400 bg-white"
                                        : "border-[#C4010F]/30 hover:border-[#C4010F] bg-red-50/50 hover:bg-red-50"
                                )}
                                aria-label="Choose Outlet"
                            >
                                {activeOutlet ? (
                                    <>
                                        <div className="relative w-6 sm:w-7 h-4 sm:h-4.5 rounded overflow-hidden shrink-0">
                                            <Image
                                                src={flagUrl}
                                                fill
                                                sizes="28px"
                                                alt={countryName}
                                                className="object-contain"
                                                unoptimized={flagUrl.startsWith('http') || flagUrl.endsWith('.svg')}
                                            />
                                        </div>
                                        <p className="text-black text-xs sm:text-sm font-semibold leading-none truncate max-w-[90px] sm:max-w-none">
                                            {outletName}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <MapPin className="w-4 h-4 text-[#C4010F] shrink-0" />
                                        <p className="text-[#C4010F] text-xs sm:text-sm font-bold leading-none">
                                            Choose Outlet
                                        </p>
                                    </>
                                )}
                                <ChevronDown
                                    size={16}
                                    className={cn(
                                        "transition-transform duration-300 text-gray-600 group-hover:text-[#C4010F]",
                                        isOutletModalOpen ? "rotate-180" : "translate-y-0"
                                    )}
                                />
                            </button>
                        </div>

                        {/* Center: Desktop Navigation Links (>= 1024px) */}
                        <div className="hidden lg:flex gap-8 items-center">
                            <ul className="flex gap-6 items-center">
                                {navItems.map((item, index) => {
                                    const active = isActive(item.href);
                                    return (
                                        <li key={index} className="relative py-1">
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "transition-all duration-200 text-sm font-semibold relative inline-block py-1",
                                                    active
                                                        ? "text-[#C4010F] font-bold"
                                                        : "text-gray-800 hover:text-[#C4010F]"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Right: Desktop Action Buttons (>= 1024px) */}
                        <div className="hidden lg:flex items-center gap-3 md:gap-4">
                            <Link
                                href={menuHref}
                                className={cn(
                                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs lg:text-sm tracking-wide transition-all duration-300 shadow-xs",
                                    isMenuActive
                                        ? "bg-[#ca8908] text-white shadow-md ring-2 ring-[#E79C1E]/50"
                                        : "bg-[#E79C1E] text-white hover:bg-[#ca8908] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                )}
                            >
                                <UtensilsCrossed className="w-3.5 h-3.5" />
                                <span>Menu</span>
                            </Link>

                            <Link
                                href={reservationHref}
                                className={cn(
                                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs lg:text-sm tracking-wide transition-all duration-300 shadow-xs",
                                    isReservationActive
                                        ? "bg-[#9c000b] text-white shadow-md ring-2 ring-[#C4010F]/50"
                                        : "bg-[#C4010F] text-white hover:bg-[#9c000b] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                )}
                            >
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Book Table</span>
                            </Link>
                        </div>

                        {/* Mobile Hamburger Button (< 1024px / < lg) */}
                        <div className="flex lg:hidden items-center gap-2">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen((prev) => !prev);
                                    setIsOutletModalOpen(false);
                                }}
                                className="p-2 rounded-lg text-gray-700 hover:text-[#C4010F] hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                                aria-label="Toggle Navigation Menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6 text-[#C4010F]" />
                                ) : (
                                    <MenuIcon className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </MaxWidthWrapper>

                {/* Mobile Drawer Menu (< 1024px / < lg) */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden mt-3"
                        >
                            <MaxWidthWrapper className="py-4 space-y-4">
                                <ul className="flex flex-col gap-2">
                                    {navItems.map((item, index) => {
                                        const active = isActive(item.href);
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={cn(
                                                        "block px-4 py-2.5 rounded-lg text-sm font-bold transition-colors",
                                                        active
                                                            ? "bg-red-50 text-[#C4010F]"
                                                            : "text-gray-800 hover:bg-gray-50 hover:text-[#C4010F]"
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href={menuHref}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xs",
                                            isMenuActive
                                                ? "bg-[#ca8908] text-white shadow-md"
                                                : "bg-[#E79C1E] text-white hover:bg-[#ca8908]"
                                        )}
                                    >
                                        <UtensilsCrossed className="w-4 h-4" />
                                        <span>Menu</span>
                                    </Link>

                                    <Link
                                        href={reservationHref}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xs",
                                            isReservationActive
                                                ? "bg-[#9c000b] text-white shadow-md"
                                                : "bg-[#C4010F] text-white hover:bg-[#9c000b]"
                                        )}
                                    >
                                        <Calendar className="w-4 h-4" />
                                        <span>Book Table</span>
                                    </Link>
                                </div>
                            </MaxWidthWrapper>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Popover Outlet Selector Modal matching exact screenshot layout */}
            <OutletSelectorModal
                isOpen={isOutletModalOpen}
                onClose={() => setIsOutletModalOpen(false)}
            />
        </>
    );
}