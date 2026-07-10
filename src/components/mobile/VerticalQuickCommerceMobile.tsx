import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Plus, Minus, ShoppingBag, Clock, ArrowRight, Heart } from 'lucide-react';

export const VerticalQuickCommerceMobile: React.FC = () => {
  const { cart, addToCart, updateQuantity, navigateTo } = useApp();
  const [activeCat, setActiveCat] = useState('q-fruits');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const quickProducts = PRODUCTS.filter(p => p.vertical === 'quick');
  const quickCategories = CATEGORIES.filter(c => c.vertical === 'quick');
  const currentProducts = quickProducts.filter(p => p.category === activeCat);

  const getCartQty = (id: string) => {
    const item = cart.find(i => i.product.id === id);
    return item ? item.quantity : 0;
  };

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const activeCartItems = cart.filter(i => i.product.vertical === 'quick');
  const activeCartCount = activeCartItems.reduce((acc, i) => acc + i.quantity, 0);
  const activeCartTotal = activeCartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  return (
    <div className="w-full flex flex-col gap-2.5 py-3.5 px-3 bg-slate-50 min-h-screen text-[#172337] pb-28">
      {/* 10 Min Header Strip */}
      <div className="w-full py-2 px-3.5 rounded-md bg-[#eefcf2] text-[#16A34A] flex justify-between items-center text-[10px] font-bold border border-[#16A34A]/10">
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="animate-pulse" />
          Delivering groceries in 10 minutes
        </span>
        <span className="text-[8px] uppercase tracking-wider bg-[#16A34A] text-white px-2 py-0.5 rounded">10 MINS</span>
      </div>

      {/* Horizontal Scroll Categories Tag List */}
      <div className="w-full flex gap-2 overflow-x-auto py-1 no-scrollbar select-none">
        {quickCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-4 py-2 rounded-full font-bold text-[10px] whitespace-nowrap tracking-wide border transition-all ${
              activeCat === cat.id
                ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-sm'
                : 'bg-white text-slate-600 border-fk-border hover:text-[#172337]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid List (2-column layout) */}
      <div className="grid grid-cols-2 gap-2 mt-1 select-none">
        {currentProducts.map(product => {
          const qty = getCartQty(product.id);
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          const isWishlisted = wishlist[product.id];

          return (
            <div
              key={product.id}
              onClick={() => navigateTo('detail', product.id)}
              className="bg-white border border-fk-border rounded-lg p-3 flex flex-col relative h-full cursor-pointer hover:shadow-sm"
            >
              {/* Wishlist Button */}
              <button
                onClick={(e) => toggleWishlist(product.id, e)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 text-gray-400 hover:text-[#E53935] shadow-xs border border-fk-border transition-colors z-10"
              >
                <Heart size={11} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
              </button>

              {/* Discount tag overlay */}
              {discount > 0 && (
                <span className="absolute top-2 left-2 bg-[#16A34A] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-xs z-10">
                  {discount}% OFF
                </span>
              )}

              {/* Product Image */}
              <div className="w-full aspect-square flex items-center justify-center mb-2.5 bg-slate-50 rounded overflow-hidden p-1.5">
                <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain rounded" />
              </div>

              {/* Title & Info */}
              <h3 className="text-[10px] font-bold text-[#172337] line-clamp-2 leading-snug mb-0.5 min-h-[30px]">
                {product.title}
              </h3>
              <span className="text-[9px] text-[#64748B] font-bold mb-3.5">
                {product.specs?.['Weight'] || product.specs?.['Volume'] || 'Pack'}
              </span>

              {/* Price & Quantity Actions Row */}
              <div className="flex items-center justify-between mt-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-extrabold text-[#172337]">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-[9px] text-[#64748B] line-through mt-0.5">₹{product.originalPrice}</span>
                  )}
                </div>

                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="px-3.5 py-1.5 border border-[#16A34A]/40 bg-[#eefcf2] text-[#16A34A] text-[10px] font-extrabold rounded uppercase shadow-xs transition-colors"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center border border-[#16A34A] bg-[#16A34A] text-white rounded overflow-hidden text-[10px] font-extrabold shadow-xs">
                    <button
                      onClick={() => updateQuantity(product.id, qty - 1)}
                      className="px-1.5 py-1.5 hover:bg-green-700 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={10} strokeWidth={3} />
                    </button>
                    <span className="px-2 min-w-[15px] text-center select-none">{qty}</span>
                    <button
                      onClick={() => updateQuantity(product.id, qty + 1)}
                      className="px-1.5 py-1.5 hover:bg-green-700 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={10} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar for Quick Commerce (Blinkit style on Mobile) */}
      {activeCartCount > 0 && (
        <div className="fixed bottom-16 left-3 right-3 bg-[#16A34A] text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center justify-between z-40 transition-transform duration-300 hover:bg-[#1557D6]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-green-800/40 relative">
              <ShoppingBag size={15} />
              <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-quick-yellow text-[8px] font-extrabold text-gray-900">
                {activeCartCount}
              </span>
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-extrabold text-xs">₹{activeCartTotal.toLocaleString('en-IN')}</span>
              <span className="text-[8px] text-emerald-100 font-bold uppercase tracking-wider">Checkout Quick Cart</span>
            </div>
          </div>
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-1 bg-white text-[#16A34A] px-3 py-1 rounded text-[10px] font-extrabold shadow hover:bg-gray-100 transition-colors"
          >
            <span>Proceed</span>
            <ArrowRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};
