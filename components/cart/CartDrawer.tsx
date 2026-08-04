'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Utensils, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useOutlet } from '@/context/OutletContext';
import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    cartItems,
    cartsByOutlet,
    currentOutletId,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();
  const { selectedOutlet } = useOutlet();

  const otherOutletsCount = React.useMemo(() => {
    return Object.keys(cartsByOutlet).filter(
      (id) => id !== currentOutletId && (cartsByOutlet[id]?.length || 0) > 0
    ).length;
  }, [cartsByOutlet, currentOutletId]);

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    const outletName = selectedOutlet?.name || 'Bajeko Sekuwa';
    let message = `Hello ${outletName}! I would like to place an order:\n\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.quantity} - Rs. ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total Subtotal:* Rs. ${subtotal.toFixed(2)}`;
    message += `\n*Selected Branch:* ${outletName}`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9779801234567?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C4010F]/10 border border-[#C4010F]/20 flex items-center justify-center text-[#C4010F]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <span>Your Order Cart</span>
                      <span className="bg-[#C4010F] text-white text-xs font-extrabold px-2 py-0.5 rounded-full">
                        {totalItems}
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C4010F]" />
                      <span>{selectedOutlet ? selectedOutlet.name : 'Select an Outlet'}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {otherOutletsCount > 0 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between gap-2">
                    <span>
                      💡 You have separate items saved in <strong>{otherOutletsCount} other outlet cart(s)</strong>.
                    </span>
                  </div>
                )}
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-16">
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#C4010F] mb-4">
                      <Utensils className="w-10 h-10 opacity-70" />
                    </div>
                    <h4 className="font-bold text-gray-800 text-base">Your cart is empty</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                      Explore our delicious Sekuwa menu items and click + Order to add them here!
                    </p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="mt-6 px-6 py-2.5 rounded-full bg-[#C4010F] text-white font-bold text-xs shadow-md hover:bg-[#a0010c] transition-all"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-white shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                        <SafeImage
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          fallbackSrc="/images/img1.png"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs font-extrabold text-[#C4010F] mt-0.5">
                          Rs. {item.price.toFixed(2)}
                        </p>

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
                          <span className="text-[11px] text-gray-400 font-medium">Quantity</span>
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-0.5 border border-gray-200">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-md bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-gray-900 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-md bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Selected Outlet</span>
                    <span className="font-bold text-gray-800">
                      {selectedOutlet ? selectedOutlet.name : 'General Branch'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                    <span className="font-bold text-gray-700 text-sm">Subtotal</span>
                    <span className="font-extrabold text-[#C4010F] text-lg">
                      Rs. {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="px-3 py-3 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-500 font-bold text-xs transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={handleCheckoutWhatsApp}
                      className="flex-1 py-3.5 px-4 rounded-xl bg-[#C4010F] hover:bg-[#a6000c] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                    >
                      <span>Checkout / Order Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
