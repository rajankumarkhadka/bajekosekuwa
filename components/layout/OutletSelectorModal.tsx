'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Compass,
  Search,
  Navigation,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useOutlet } from '@/context/OutletContext';
import { VendorBranch, Country } from '@/types';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { getOutletUrlPath } from '@/utils/outletMatcher';
import { formatFlagUrl } from '@/utils/flag';

interface OutletSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_VISIBLE_COUNT = 2; // Shows initial 2 cards as in screenshot, with + Show X more outlets button

function isCountryMatch(countryName: string | undefined | null, category: string): boolean {
  if (!countryName) return false;
  const c = countryName.toLowerCase().trim();
  const cat = category.toLowerCase().trim();

  if (c === cat) return true;

  if (
    (c === 'uae' || c === 'united arab emirates') &&
    (cat === 'uae' || cat === 'united arab emirates')
  ) {
    return true;
  }

  if (
    (c === 'usa' || c === 'united states' || c === 'united states of america') &&
    (cat === 'usa' || cat === 'united states' || cat === 'united states of america')
  ) {
    return true;
  }

  return false;
}

export default function OutletSelectorModal({ isOpen, onClose }: OutletSelectorModalProps) {
  const router = useRouter();
  const {
    outlets,
    countries,
    selectedOutlet,
    setSelectedOutlet,
    setSelectedCountryId,
    searchQuery,
    setSearchQuery,
    userLocation,
    isLocating,
    locationError,
    isLoading,
    requestUserLocation,
    loadMoreOutlets,
  } = useOutlet();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);



  // Dynamic category items containing label & country flag URL
  const categoryItems = useMemo(() => {
    const items: { label: string; flagUrl?: string; countryId?: string }[] = [
      { label: 'All' }
    ];

    const countryMap = new Map<string, Country>();
    outlets.forEach((o) => {
      if (o.country?.name && !countryMap.has(o.country.name)) {
        countryMap.set(o.country.name, o.country);
      }
    });

    countries.forEach((c) => {
      if (c.name && !countryMap.has(c.name)) {
        countryMap.set(c.name, c);
      }
    });

    countryMap.forEach((country, name) => {
      items.push({
        label: name,
        flagUrl: country.flag_url_4x3 || country.flag_url_1x1,
        countryId: country.id,
      });
    });

    const keyLocations = ['Batisputali', 'Kathmandu'];
    keyLocations.forEach((loc) => {
      if (outlets.some((o) => o.name.includes(loc) || o.address.includes(loc))) {
        if (!items.some((item) => item.label.toLowerCase() === loc.toLowerCase())) {
          items.push({ label: loc });
        }
      }
    });

    return items;
  }, [outlets, countries]);

  // Filter & sort outlets dynamically - strictly filter by selected country
  const filteredOutlets = useMemo(() => {
    let result = [...outlets];

    if (activeCategory !== 'All') {
      const matchCountry =
        countries.find((c) => isCountryMatch(c.name, activeCategory)) ||
        outlets.find((o) => isCountryMatch(o.country?.name, activeCategory))?.country;

      if (matchCountry) {
        result = result.filter(
          (o) =>
            o.country?.id === matchCountry.id ||
            isCountryMatch(o.country?.name, activeCategory)
        );
      } else {
        result = result.filter((o) => {
          const nameMatch = o.name.toLowerCase().includes(activeCategory.toLowerCase());
          const addressMatch = o.address.toLowerCase().includes(activeCategory.toLowerCase());
          return nameMatch || addressMatch;
        });
      }
    }

    // If user location exists, sort by proximity
    if (userLocation) {
      result.sort((a, b) => (a.distance_km ?? 99999) - (b.distance_km ?? 99999));
    }

    return result;
  }, [outlets, countries, activeCategory, userLocation]);

  // Limit displayed outlets unless "Show more" is clicked
  const visibleOutlets = useMemo(() => {
    if (showAll || searchQuery.trim() || activeCategory !== 'All') {
      return filteredOutlets;
    }
    return filteredOutlets.slice(0, INITIAL_VISIBLE_COUNT);
  }, [filteredOutlets, showAll, searchQuery, activeCategory]);

  const hiddenCount = filteredOutlets.length - visibleOutlets.length;

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(true);

    const foundCountry =
      countries.find((c) => isCountryMatch(c.name, cat)) ||
      outlets.find((o) => isCountryMatch(o.country?.name, cat))?.country;

    if (foundCountry) {
      setSelectedCountryId(foundCountry.id);
    } else if (cat === 'All') {
      setSelectedCountryId(null);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50 && !isLoading) {
      loadMoreOutlets();
    }
  };

  const handleSelectOutlet = (outlet: VendorBranch) => {
    setSelectedOutlet(outlet);
    const targetUrl = getOutletUrlPath(outlet);
    router.push(targetUrl);
    onClose();
  };

  const handleNearMeClick = async () => {
    const nearest = await requestUserLocation();
    if (nearest) {
      handleSelectCategory('All');
      setShowAll(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[2px]" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-16 sm:top-20 left-3 sm:left-24 md:left-32 z-50 w-[94vw] sm:w-[540px] md:w-[580px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] border border-gray-100"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xs sm:text-sm font-extrabold text-gray-500 tracking-wider uppercase">
              BAJEKO SEKUWA OUTLETS
            </h2>
            <span className="bg-red-50 text-[#C4010F] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {outlets.length} Locations
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="px-5 pt-3 pb-1 flex items-center justify-between gap-2 bg-gray-50/60">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
            <Compass className="w-3.5 h-3.5 text-[#C4010F] animate-pulse shrink-0" />
            <span className="truncate">
              {userLocation
                ? 'Outlets sorted by nearest location first'
                : 'Click Near Me for automatic location calculation'}
            </span>
          </div>

          <button
            onClick={handleNearMeClick}
            disabled={isLocating}
            className="px-3 py-1  bg-[#C4010F] hover:bg-[#a6010d] text-white text-[11px] font-bold rounded-full transition-all flex items-center justify-center gap-1 shrink-0 disabled:opacity-70 cursor-pointer shadow-2xs"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Locating...</span>
              </>
            ) : (
              <>
                <Navigation className="w-3 h-3" />
                <span>{userLocation ? 'Re-detect' : 'Near Me'}</span>
              </>
            )}
          </button>
        </div>

        {locationError && (
          <div className="mx-5 mt-2 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-2 text-[11px] text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{locationError}</span>
            </div>
            <button
              onClick={handleNearMeClick}
              className="text-[#C4010F] font-bold underline shrink-0 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        <div className="px-5 py-3 bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categoryItems.map((item) => {
            const isActive = activeCategory === item.label;
            const formattedFlag = item.flagUrl ? formatFlagUrl(item.flagUrl) : null;

            return (
              <button
                key={item.label}
                onClick={() => handleSelectCategory(item.label)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#C4010F] text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {formattedFlag && (
                  <div className="relative w-6 h-4 rounded overflow-hidden shrink-0  ">
                    <Image
                      src={formattedFlag}
                      fill
                      sizes="24px"
                      alt={item.label}
                      className="object-contain"
                      unoptimized={formattedFlag.startsWith('http') || formattedFlag.endsWith('.svg')}
                    />
                  </div>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="px-5  pt-1.5 bg-white">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search branch by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#C4010F] transition-all"
            />
          </div>
        </div>

        <div
          onScroll={handleScroll}
          className="px-5 py-3 overflow-y-auto flex-1 bg-white space-y-3"
        >
          {isLoading && visibleOutlets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#C4010F] mb-1.5" />
              <p className="text-xs font-medium">Loading outlets...</p>
            </div>
          ) : filteredOutlets.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MapPin className="w-8 h-8 mx-auto mb-1.5 opacity-30 text-[#C4010F]" />
              <p className="text-xs font-bold text-gray-700">No outlets found</p>
              <p className="text-[11px]">Try selecting 'All' or search a different keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visibleOutlets.map((outlet) => {
                const isSelected = selectedOutlet?.id === outlet.id;
                const displayImage = outlet.image || '/images/icon.jpg';
                const countryName = outlet.country?.name;

                return (
                  <div
                    key={outlet.id}
                    onClick={() => handleSelectOutlet(outlet)}
                    className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col cursor-pointer group ${isSelected
                        ? 'border-[#C4010F] ring-1 ring-[#C4010F] shadow-sm'
                        : 'border-gray-200/80 hover:border-gray-300 hover:shadow-sm'
                      }`}
                  >
                    <div className="h-36 sm:h-40 relative overflow-hidden bg-gray-100">
                      <Image
                        src={displayImage}
                        alt={outlet.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 250px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-2.5 left-2.5 shadow-2xs" />

                      <div className="bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1 absolute bottom-2 right-2 border border-white/10">
                        <Navigation className="w-2.5 h-2.5 text-amber-400 rotate-45" />
                        <span>
                          {outlet.latitude.toFixed(2)}°, {outlet.longitude.toFixed(2)}°
                        </span>
                      </div>
                    </div>

                    <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                      <div className="flex items-center justify-between gap-1.5">
                        <h3 className="text-sm font-extrabold text-[#C4010F] leading-tight">
                          {outlet.name}
                        </h3>
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded shrink-0">
                          {countryName}
                        </span>
                      </div>

                      <div className="flex items-start gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-[#C4010F] shrink-0 mt-0.5" />
                        <span className="truncate text-[11px]">{outlet.address}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#E79C1E] pt-0.5">
                        <Navigation className="w-3.5 h-3.5 shrink-0 rotate-45 text-[#E79C1E]" />
                        <span>
                          {outlet.distance_km !== null
                            ? `${outlet.distance_km} km away`
                            : 'GPS location available'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {hiddenCount > 0 && !showAll && (
            <button
              onClick={() => {
                setShowAll(true);
                loadMoreOutlets();
              }}
              className="w-full py-2.5 border border-dashed border-red-200 hover:border-[#C4010F] text-[#C4010F] bg-red-50/20 hover:bg-red-50 rounded-xl font-bold text-xs transition-all text-center cursor-pointer mt-3"
            >
              + Show {hiddenCount} more outlets
            </button>
          )}

          {showAll && filteredOutlets.length > INITIAL_VISIBLE_COUNT && (
            <button
              onClick={() => setShowAll(false)}
              className="w-full py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold text-[11px] transition-all text-center cursor-pointer mt-3"
            >
              Show fewer outlets
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
