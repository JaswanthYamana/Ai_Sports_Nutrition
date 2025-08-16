"use client"

import { useState } from 'react';
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from 'react-toastify';

export default function CartPage() {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingItems(prev => new Set(prev).add(itemId));
    try {
      await updateCartItem(itemId, newQuantity);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setUpdatingItems(prev => new Set(prev).add(itemId));
    try {
      await removeFromCart(itemId);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleCheckout = () => {
    toast.info("Checkout functionality coming soon!");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        <div className="pt-24 px-6 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to view your cart.</p>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/equipment">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          {cart.items.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link href="/equipment">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <Card key={item._id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                          {item.equipment.images?.[0] ? (
                            <Image
                              src={item.equipment.images[0]}
                              alt={item.equipment.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{item.equipment.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.equipment.brand} • {item.equipment.category}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item._id)}
                              disabled={updatingItems.has(item._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || updatingItems.has(item._id)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                disabled={updatingItems.has(item._id)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline" onClick={clearCart} disabled={loading}>
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.totalItems} items)</span>
                      <span>${cart.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(cart.totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(cart.totalPrice * 1.08).toFixed(2)}</span>
                    </div>
                    <Button className="w-full" onClick={handleCheckout} disabled={loading}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Secure checkout powered by SportsPro
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
