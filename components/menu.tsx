'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveOutletMenu } from '@/api/hooks/useBranchMenu';
import SafeImage from '@/components/ui/SafeImage';
import { MapPin, Utensils, Sparkles } from 'lucide-react';

export interface DisplayMenuItem {
  id: string; // product_id
  itemId: string; // item_id
  name: string;
  price: number;
  categoryTitle: string;
  categoryId: string;
  menuId: string;
  isVeg: boolean;
  image: string;
  isRecommended?: boolean;
}

export default function MenuComponent() {
  const params = useParams();
  const routeBranch = typeof params?.branch === 'string' ? params.branch : null;

  // Step 1: Fetch Menu data using resolved branch_id -> menu_id -> product_id pipeline
  const {
    data: menuData,
    isLoading: isMenuLoading,
    activeOutlet,
    isOutletLoading,
  } = useActiveOutletMenu(routeBranch);

  const [selectedCategory, setSelectedCategory] = useState<string>('All Dishes');
  const [isVegActive, setIsVegActive] = useState(false);
  const [isNonVegActive, setIsNonVegActive] = useState(false);

  // Step 2: Process menu items extracted from branch_id -> menu_id -> category_id -> product_id
  const apiProducts = useMemo(() => {
    if (!menuData || !menuData.categories || menuData.categories.length === 0) {
      return [];
    }

    const itemsList: DisplayMenuItem[] = [];

    menuData.categories.forEach((cat) => {
      if (cat.items && Array.isArray(cat.items)) {
        cat.items.forEach((item) => {
          if (item.product) {
            const p = item.product;
            const pName = p.name || 'Menu Item';
            const lowerName = pName.toLowerCase();
            const lowerDiet = (p.dietary_preference || '').toLowerCase();
            
            const isVeg = lowerDiet.includes('veg') && !lowerDiet.includes('non')
              ? true
              : lowerName.includes('veg') && !lowerName.includes('non');

            itemsList.push({
              id: p.id || item.product_id,
              itemId: item.id,
              name: pName,
              price: p.sale_price ?? p.regular_price ?? 0,
              categoryTitle: cat.title || 'General',
              categoryId: cat.id,
              menuId: cat.menu_id || menuData.id,
              isVeg,
              image: p.image || '/images/img1.png',
              isRecommended: Boolean(p.is_recommended),
            });
          }
        });
      }
    });

    return itemsList;
  }, [menuData]);

  // Step 3: Extract unique category titles dynamically from live API products
  const categoriesList = useMemo(() => {
    const set = new Set<string>(['All Dishes']);
    apiProducts.forEach((item) => {
      if (item.categoryTitle) set.add(item.categoryTitle);
    });
    return Array.from(set);
  }, [apiProducts]);

  // Step 4: Filter products based on selected category & dietary toggles
  const filteredItems = useMemo(() => {
    return apiProducts.filter((item) => {
      if (selectedCategory !== 'All Dishes' && item.categoryTitle !== selectedCategory) {
        return false;
      }
      if (isVegActive && !isNonVegActive && !item.isVeg) {
        return false;
      }
      if (isNonVegActive && !isVegActive && item.isVeg) {
        return false;
      }
      return true;
    });
  }, [apiProducts, selectedCategory, isVegActive, isNonVegActive]);

  const isLoading = isMenuLoading || isOutletLoading;

  return (
    <div className="w-full flex flex-col gap-8 py-6">
      {/* Branch Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C4010F]/10 border border-[#C4010F]/20 flex items-center justify-center text-[#C4010F]">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-2">
              <span>{activeOutlet?.name || menuData?.name || 'Bajeko Sekuwa'} Menu</span>
              <span className="bg-[#C4010F] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                Live Outlet
              </span>
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>{activeOutlet?.address || 'Authentic Himalayan Sekuwa'}</span>
            </p>
          </div>
        </div>

        {menuData?.id && (
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
            <Sparkles className="w-3.5 h-3.5 text-[#C4010F]" />
            <span>Menu ID: {menuData.id.slice(0, 8)}...</span>
          </div>
        )}
      </div>

      {/* Filter Tabs & Veg Toggles */}
      <div className="w-full border-b border-gray-200 pb-2 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center overflow-x-auto no-scrollbar w-full md:w-auto divide-x divide-gray-200">
          {categoriesList.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-3 text-sm font-bold transition-colors whitespace-nowrap ${
                  isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBorder"
                    className="absolute bottom-[0px] left-0 right-0 h-[2px] bg-[#C4010F]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsVegActive(!isVegActive)}
            className={`relative flex items-center w-20 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300 select-none ${
              isVegActive ? 'bg-[#2e7d32]' : 'bg-[#e5e7eb]'
            }`}
          >
            <span
              className={`absolute text-xs font-bold transition-colors duration-300 ${
                isVegActive ? 'left-3 text-white' : 'right-3 text-gray-500'
              }`}
            >
              Veg
            </span>
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-md z-10"
              animate={{ x: isVegActive ? 44 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          </button>

          <button
            type="button"
            onClick={() => setIsNonVegActive(!isNonVegActive)}
            className={`relative flex items-center w-24 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300 select-none ${
              isNonVegActive ? 'bg-[#C4010F]' : 'bg-[#e5e7eb]'
            }`}
          >
            <span
              className={`absolute text-xs font-bold transition-colors duration-300 whitespace-nowrap ${
                isNonVegActive ? 'left-3 text-white' : 'right-3 text-gray-500'
              }`}
            >
              Non Veg
            </span>
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-md z-10"
              animate={{ x: isNonVegActive ? 60 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          </button>
        </div>
      </div>

      {/* Grid Content / Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className="h-64 rounded-2xl bg-gray-100 animate-pulse border border-gray-200" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center text-gray-400 font-medium text-sm flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Utensils className="w-10 h-10 text-gray-300 mb-2" />
          <span>No menu products found matching the selected filters.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isVeg = item.isVeg;
              const isSolidBg = item.isRecommended;

              return (
                <motion.div
                  key={item.itemId || item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200/60 shadow-xs">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackSrc="/images/img1.png"
                    />

                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs p-1 rounded-md shadow-xs z-20">
                      <div
                        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                          isVeg ? 'border-[#2e7d32]' : 'border-[#C4010F]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isVeg ? 'bg-[#2e7d32]' : 'bg-[#C4010F]'
                          }`}
                        />
                      </div>
                    </div>

                    {item.categoryTitle && (
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase border border-white/20">
                        {item.categoryTitle}
                      </div>
                    )}
                  </div>

                  <div
                    className={`rounded-xl border border-gray-100 p-3.5 -mt-6 mx-3 relative z-10 flex flex-col gap-2 transition-all duration-300 shadow-md ${
                      isSolidBg
                        ? isVeg
                          ? 'bg-[#2e7d32] text-white border-[#2e7d32]'
                          : 'bg-[#C4010F] text-white border-[#C4010F]'
                        : isVeg
                        ? 'bg-white text-gray-900 group-hover:bg-[#2e7d32] group-hover:text-white group-hover:border-[#2e7d32]'
                        : 'bg-white text-gray-900 group-hover:bg-[#C4010F] group-hover:text-white group-hover:border-[#C4010F]'
                    }`}
                  >
                    <h4 className="font-bold text-xs sm:text-sm tracking-wide uppercase line-clamp-1">
                      {item.name}
                    </h4>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-sm sm:text-base">
                        Rs. {item.price.toFixed(2)}
                      </span>

                      <button
                        type="button"
                        className={`font-bold text-xs px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors active:scale-95 shadow-xs ${
                          isSolidBg
                            ? 'bg-white/20 hover:bg-white hover:text-gray-900 text-white'
                            : isVeg
                            ? 'bg-[#f59e0b] hover:bg-[#d97706] text-white group-hover:bg-white/20 group-hover:hover:bg-white group-hover:hover:text-[#2e7d32]'
                            : 'bg-[#f59e0b] hover:bg-[#d97706] text-white group-hover:bg-white/20 group-hover:hover:bg-white group-hover:hover:text-[#C4010F]'
                        }`}
                      >
                        <span>+ Order</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
