'use client';

import React, { useState, useMemo } from 'react';
import { useOutlet } from '@/context/OutletContext';
import { useActiveOutletGallery, useBranchGallery } from '@/api/hooks/useBranchGallery';
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import { ZoomIn, X, MapPin, Store, ChevronDown, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BranchGalleryItem, VendorBranch } from '@/types';
import SafeImage from '@/components/ui/SafeImage';


export default function GalleryContainer() {
  const { outlets, selectedOutlet, setSelectedOutlet, isLoading: isOutletsLoading } = useOutlet();
  
  // Fetch real live gallery data for the selected outlet UUID via /api/v1/public/branches/{branch_id}/gallery
  const {
    data: apiGalleryData,
    isLoading: isGalleryLoading,
    isError,
    refetch,
  } = useActiveOutletGallery();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<BranchGalleryItem | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Determine displayed items: API response if available & non-empty, otherwise standard fallback
  const galleryItems = useMemo(() => {
    if (apiGalleryData && apiGalleryData.length > 0) {
      return apiGalleryData;
    }
    return [];
  }, [apiGalleryData]);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    galleryItems.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [galleryItems]);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleBranchSelect = (outlet: VendorBranch) => {
    setSelectedOutlet(outlet);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <MaxWidthWrapper className="py-12 flex flex-col items-center">
          {categories.length > 1 && (
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#C4010F] text-white shadow-md shadow-[#C4010F]/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {isGalleryLoading || isOutletsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="h-[300px] w-full rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl w-full max-w-2xl">
          <ImageIcon className="w-12 h-12 text-gray-300 mb-3" />
          <h4 className="text-lg font-bold text-gray-700">No Gallery Media Found</h4>
          <p className="text-sm text-gray-500 mt-1">There are currently no photos uploaded for this outlet category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {paginatedItems.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative h-[320px] w-full overflow-hidden rounded-2xl cursor-pointer group border border-gray-200 shadow-xs"
              onClick={() => setLightboxItem(item)}
            >
              <SafeImage
                src={item.image}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt={item.title || item.description || 'Gallery item'}
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                fallbackSrc="/images/icon.jpg"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {item.category && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {item.title && (
                  <h4 className="text-white text-base font-bold tracking-tight line-clamp-1 drop-shadow-md">
                    {item.title}
                  </h4>
                )}
                {item.description && (
                  <p className="text-gray-300 text-xs mt-1 line-clamp-2 drop-shadow-sm font-normal">
                    {item.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#FFC72C] font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>{selectedOutlet?.name || 'Bajeko Sekuwa'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-14 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                currentPage === page
                  ? 'bg-[#C4010F] text-white shadow-md shadow-[#C4010F]/20'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[60vh] sm:h-[70vh] w-full">
                <SafeImage
                  src={lightboxItem.image_url || lightboxItem.image}
                  fill
                  sizes="100vw"
                  alt={lightboxItem.title || 'Lightbox image'}
                  className="object-contain"
                  fallbackSrc="/images/icon.jpg"
                />
              </div>

              <div className="p-6 bg-gradient-to-t from-gray-950 via-gray-900 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {lightboxItem.category && (
                      <span className="bg-[#C4010F] text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-md">
                        {lightboxItem.category}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {selectedOutlet?.name} Outlet
                    </span>
                  </div>
                  {lightboxItem.title && (
                    <h3 className="text-xl font-bold text-white">{lightboxItem.title}</h3>
                  )}
                  {lightboxItem.description && (
                    <p className="text-sm text-gray-300 mt-1">{lightboxItem.description}</p>
                  )}
                </div>

                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2.5 border border-white/20 hover:bg-[#C4010F] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MaxWidthWrapper>
  );
}
