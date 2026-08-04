'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useOutlet } from '@/context/OutletContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isVeg?: boolean;
  categoryTitle?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartsByOutlet: Record<string, CartItem[]>;
  currentOutletId: string;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY_BY_OUTLET = 'bajeko_shopping_cart_by_outlet';
const LEGACY_STORAGE_KEY = 'bajeko_shopping_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { selectedOutlet } = useOutlet();
  const currentOutletId = selectedOutlet?.id || 'default_outlet';

  const [cartsByOutlet, setCartsByOutlet] = useState<Record<string, CartItem[]>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize carts from localStorage on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY_BY_OUTLET);
      if (saved) {
        setCartsByOutlet(JSON.parse(saved));
      } else {
        const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacySaved) {
          const items = JSON.parse(legacySaved);
          if (Array.isArray(items) && items.length > 0) {
            setCartsByOutlet({ [currentOutletId]: items });
          }
        }
      }
    } catch (err) {
      console.warn('Failed to parse carts from localStorage', err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save carts to localStorage whenever cartsByOutlet updates
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem(CART_STORAGE_KEY_BY_OUTLET, JSON.stringify(cartsByOutlet));
    } catch (err) {
      console.warn('Failed to save carts to localStorage', err);
    }
  }, [cartsByOutlet, isInitialized]);

  // Current outlet's cart items
  const cartItems = useMemo(() => {
    return cartsByOutlet[currentOutletId] || [];
  }, [cartsByOutlet, currentOutletId]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartsByOutlet((prev) => {
      const currentList = prev[currentOutletId] || [];
      const existingIdx = currentList.findIndex((i) => i.id === item.id);
      const addQty = item.quantity ?? 1;

      let updatedList: CartItem[];
      if (existingIdx > -1) {
        updatedList = [...currentList];
        updatedList[existingIdx] = {
          ...updatedList[existingIdx],
          quantity: updatedList[existingIdx].quantity + addQty,
        };
      } else {
        updatedList = [...currentList, { ...item, quantity: addQty }];
      }

      return {
        ...prev,
        [currentOutletId]: updatedList,
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCartsByOutlet((prev) => {
      const currentList = prev[currentOutletId] || [];
      return {
        ...prev,
        [currentOutletId]: currentList.filter((item) => item.id !== id),
      };
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartsByOutlet((prev) => {
      const currentList = prev[currentOutletId] || [];
      const updatedList = currentList
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      return {
        ...prev,
        [currentOutletId]: updatedList,
      };
    });
  };

  const clearCart = () => {
    setCartsByOutlet((prev) => ({
      ...prev,
      [currentOutletId]: [],
    }));
  };

  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartsByOutlet,
        currentOutletId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
