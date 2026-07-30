'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Drinks';
  isVeg: boolean;
  image: string;
  isFeatured?: boolean;
}

const MENU_CATEGORIES = [
  'All Dishes',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Drinks',
] as const;

type Category = (typeof MENU_CATEGORIES)[number];

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'MUTTON SADA SEKUWA',
    price: 480.0,
    category: 'Dinner',
    isVeg: false,
    image: '/images/img1.png',
  },
  {
    id: '2',
    name: 'MUTTON JHANEKO SEKUWA',
    price: 550.0,
    category: 'Dinner',
    isVeg: false,
    image: '/images/img2.png',
  },
  {
    id: '3',
    name: 'CHICKEN SADA SEKUWA',
    price: 380.0,
    category: 'Lunch',
    isVeg: false,
    image: '/images/img3.jpg',
  },
  {
    id: '4',
    name: 'CHICKEN JHANEKO SEKUWA',
    price: 450.0,
    category: 'Lunch',
    isVeg: false,
    image: '/images/img4.png',
  },
  {
    id: '5',
    name: 'BANDEL POLEKO (WILD BOAR)',
    price: 490.0,
    category: 'Dinner',
    isVeg: false,
    image: '/images/img1.png',
  },
  {
    id: '6',
    name: 'VEG SADA SEKUWA',
    price: 290.0,
    category: 'Snacks',
    isVeg: true,
    image: '/images/img2.png',
  },
  {
    id: '7',
    name: 'JIMBU THAKALI SET (VEG)',
    price: 450.0,
    category: 'Lunch',
    isVeg: true,
    image: '/images/img3.jpg',
  },
  {
    id: '8',
    name: 'CHUSTA TAREKO',
    price: 320.0,
    category: 'Snacks',
    isVeg: false,
    image: '/images/img4.png',
  },
  {
    id: '9',
    name: 'KALEJO POLEKO',
    price: 350.0,
    category: 'Snacks',
    isVeg: false,
    image: '/images/img1.png',
  },
  {
    id: '10',
    name: 'VEG STEAMED MOMO',
    price: 180.0,
    category: 'Snacks',
    isVeg: true,
    image: '/images/img2.png',
  },
  {
    id: '11',
    name: 'BHATMAS SANDHEKO',
    price: 160.0,
    category: 'Snacks',
    isVeg: true,
    image: '/images/img3.jpg',
  },
  {
    id: '12',
    name: 'PEANUT SANDHEKO',
    price: 190.0,
    category: 'Snacks',
    isVeg: true,
    image: '/images/img4.png',
  },
];

export default function MenuComponent() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All Dishes');
  const [isVegActive, setIsVegActive] = useState(false);
  const [isNonVegActive, setIsNonVegActive] = useState(false);

  const filteredItems = useMemo(() => {
    return MOCK_MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'All Dishes' && item.category !== selectedCategory) {
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
  }, [selectedCategory, isVegActive, isNonVegActive]);

  return (
    <div className="w-full flex flex-col gap-8 py-6">
      <div className="w-full border-b border-gray-200 pb-2 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center overflow-x-auto no-scrollbar w-full md:w-auto divide-x divide-gray-200">
          {MENU_CATEGORIES.map((category) => {
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
                    className="absolute bottom-[0px] left-0 right-0 h-[1px] bg-[#C4010F]"
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

      {filteredItems.length === 0 ? (
        <div className="py-16 text-center text-gray-400 font-medium text-sm">
          No menu items found matching the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isVeg = item.isVeg;
              const isSolidBg = item.isFeatured;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200/60">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  </div>

                  <div
                    className={`rounded-md border border-gray-100 p-3.5 -mt-6 mx-3 relative z-10 flex flex-col gap-2 transition-all duration-300 shadow-md ${
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
