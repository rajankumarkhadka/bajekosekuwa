'use client';

import React, { useMemo, useState } from 'react';
import { useOutlet } from '@/context/OutletContext';
import { ContactApiResponse } from '@/types';
import ContactForm from './contact';
import { MapPin, Store, ChevronDown, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VendorBranch } from '@/types/vendorBranch';

// Default Fallback Coordinates (Kathmandu, Nepal)
const DEFAULT_LAT = 27.701;
const DEFAULT_LNG = 85.32;

export default function ContactClient() {
  const { outlets, selectedOutlet, setSelectedOutlet } = useOutlet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dynamically generate Google Maps embed URL using selected outlet latitude & longitude
  const { mapEmbedUrl, lat, lng } = useMemo(() => {
    const currentLat = selectedOutlet?.latitude ?? DEFAULT_LAT;
    const currentLng = selectedOutlet?.longitude ?? DEFAULT_LNG;
    
    // Construct zero-API-key Google Maps Embed URL using exact coordinates
    const url = `https://maps.google.com/maps?q=${currentLat},${currentLng}&hl=en&z=15&output=embed`;
    return { mapEmbedUrl: url, lat: currentLat, lng: currentLng };
  }, [selectedOutlet]);

  const handleOutletSelect = (outlet: VendorBranch) => {
    setSelectedOutlet(outlet);
    setIsDropdownOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-8 lg:gap-12 items-stretch">
      <div className="flex flex-col gap-4 w-full h-full">
                <div className="relative flex-1 min-h-[350px] h-full w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Bajeko Sekuwa Location — ${
              selectedOutlet ? selectedOutlet.name : 'Battisputali, Kathmandu'
            }`}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-left pointer-events-none">
            <p className="text-white font-bold text-base flex items-center gap-1.5 drop-shadow-sm">
              <MapPin className="w-4 h-4 text-[#C4010F] shrink-0" />
              {selectedOutlet ? selectedOutlet.name : 'Battisputali, Kathmandu'}
            </p>
            <p className="text-gray-200 text-xs mt-1 drop-shadow-sm line-clamp-1">
              {selectedOutlet?.address
                ? selectedOutlet.address
                : 'Head Office · Open Daily 10 AM – 10 PM'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-6 sm:p-10 w-full h-full flex flex-col justify-center">
        <ContactForm />
      </div>
    </div>
  );
}
