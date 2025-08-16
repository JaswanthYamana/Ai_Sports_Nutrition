"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

interface CartItem {
  _id: string;
  equipment: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    brand: string;
    category: string;
  };
  quantity: number;
  price: number;
}

interface Cart {
  _id?: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cart: Cart;
  loading: boolean;
  addToCart: (equipmentId: string, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart>({ items: [], totalItems: 0, totalPrice: 0 });
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  };

  const refreshCart = async () => {
    if (!user) {
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (equipmentId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ equipmentId, quantity })
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
        toast.success('Item added to cart!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ quantity })
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
        toast.success('Cart updated!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
        toast.success('Item removed from cart!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        setCart({ items: [], totalItems: 0, totalPrice: 0 });
        toast.success('Cart cleared!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshCart();
    }
  }, [user]);

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
