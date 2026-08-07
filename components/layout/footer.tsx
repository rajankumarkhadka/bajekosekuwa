'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import { SITE } from '@/data/basic';
import { InstagramIcon } from '@/components/ui/icon';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { useOutlet } from '@/context/OutletContext';
import { useBranchDetails } from '@/context/BranchDetailsContext';
import OutletSelectorModal from '@/components/layout/OutletSelectorModal';
import { getOutletUrlPath } from '@/utils/outletMatcher';

export default function Footer() {
  const { selectedOutlet } = useOutlet();
  const { branch: contextBranch } = useBranchDetails();
  const activeOutlet = contextBranch || selectedOutlet;
  const [isOutletModalOpen, setIsOutletModalOpen] = useState(false);

  const flagUrl = activeOutlet?.country?.flag_url_4x3 || 'https://auth.bajekoshop.com/bajekoshop/flags/4x3/+977.svg';

  const homeHref = getOutletUrlPath(activeOutlet, '');
  const aboutHref = getOutletUrlPath(activeOutlet, 'about');
  const galleryHref = getOutletUrlPath(activeOutlet, 'gallery');
  const blogHref = getOutletUrlPath(activeOutlet, 'blog');
  const contactHref = getOutletUrlPath(activeOutlet, 'contact');
  const menuHref = getOutletUrlPath(activeOutlet, 'menu');
  const reservationHref = getOutletUrlPath(activeOutlet, 'reservation');

  return (
    <div className="bg-white">
      <MaxWidthWrapper className="bg-white text-gray-600 pt-16 pb-0 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10 mb-12">
          {/* Brand & Outlet Selector Column */}
          <div className="xl:col-span-2 space-y-6">
            <Link href={homeHref} className="inline-block">
              <Image
                src="/images/logo.png"
                alt={`Logo`}
                width={400}
                height={300}
                className="w-40 md:w-48 h-auto object-contain"
                priority
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{SITE.description}</p>

            {/* Branch / Outlet Selector Button */}
            {/* <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C4010F]" />
                Selected Branch Location
              </span>
              <button
                type="button"
                onClick={() => setIsOutletModalOpen((prev) => !prev)}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer w-full max-w-xs shadow-2xs group border text-left",
                  activeOutlet
                    ? "border-gray-200 hover:border-gray-400 bg-gray-50/80 hover:bg-white"
                    : "border-[#C4010F]/30 hover:border-[#C4010F] bg-red-50/50"
                )}
              >
                {flagUrl && (
                  <div className="relative w-6 h-4 rounded overflow-hidden shrink-0 border border-gray-200 shadow-2xs">
                    <Image
                      src={flagUrl}
                      alt={countryName}
                      fill
                      sizes="24px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 min-w-0 leading-tight">
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                    {countryName}
                  </span>
                  <span className="text-xs font-bold text-gray-900 group-hover:text-[#C4010F] transition-colors truncate">
                    {outletName}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#C4010F] transition-colors shrink-0" />
              </button>
            </div> */}

            <div className="flex flex-col lg:flex-row gap-6 pt-1">
              <NewsletterForm />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-headline font-bold text-gray-900 tracking-tight">Navigation</h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href={homeHref}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={aboutHref}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={galleryHref}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href={blogHref}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={contactHref}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-headline font-bold text-gray-900 tracking-tight">Useful Links</h4>
            <ul className="space-y-3.5">
              <li>
                <button
                  type="button"
                  onClick={() => setIsOutletModalOpen(true)}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Our Outlets</span>
                  <span className="bg-red-100 text-[#C4010F] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    Select
                  </span>
                </button>
              </li>
              <li>
                <Link
                  href={menuHref}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href={reservationHref}
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  Reservations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 font-semibold hover:text-[#C4010F] hover:pl-1 transition-all duration-200 text-sm inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-7">
            <div className="space-y-4">
              <h4 className="text-xl font-headline font-bold text-gray-900 tracking-tight">
                Download App
              </h4>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#"
                  className="block rounded-lg overflow-hidden hover:opacity-85 transition-opacity duration-200"
                >
                  <img src="/images/appstore.png" alt="App Store" className="w-40 object-contain" />
                </Link>
                <Link
                  href="#"
                  className="block rounded-lg overflow-hidden hover:opacity-85 transition-opacity duration-200"
                >
                  <img src="/images/playstore.png" alt="Play Store" className="w-40 object-contain" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <Link
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 hover:bg-[#1877f2] hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(24,119,242,0.35)] flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(253,29,29,0.3)] flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 hover:bg-[#25D366] hover:text-white hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,211,102,0.35)] flex items-center justify-center transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-200 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-400 text-xs">
            Copyright © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <Link
            href="https://sayathari.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <Image
              src="/images/sayathari.jpg"
              alt="Design By"
              width={25}
              height={25}
              className="rounded"
            />
          </Link>
        </div>
      </MaxWidthWrapper>
      <OutletSelectorModal
        isOpen={isOutletModalOpen}
        onClose={() => setIsOutletModalOpen(false)}
      />
    </div>
  );
}
