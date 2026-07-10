import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Plus, Minus, Clock, ShoppingCart, ArrowRight, Heart } from 'lucide-react';

export const VerticalQuickCommerce: React.FC = () => {
  const { cart, addToCart, updateQuantity, navigateTo } = useApp();
  const [selectedCatId, setSelectedCatId] = useState<string>('q-fruits');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Filter 10-Min quick commerce items
  const quickProducts = PRODUCTS.filter(p => p.vertical === 'quick');
  const quickCategories = CATEGORIES.filter(c => c.vertical === 'quick');
  const activeProducts = quickProducts.filter(p => p.category === selectedCatId);

  // Cart matching helper
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
    <div className="w-full flex flex-col min-h-screen bg-slate-50 text-[#172337] relative select-none">
      {/* Promo banner strip */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#1557D6] text-white px-12 py-3.5 flex justify-between items-center text-xs font-bold shadow-sm">
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-quick-yellow animate-pulse" />
          <span>SUPERFAST 10 MINUTE DELIVERY — Fresh groceries, cold drinks & snacks at your doorstep!</span>
        </div>
        <div className="flex items-center gap-1 hover:underline cursor-pointer" onClick={() => navigateTo('search')}>
          <span>Explore Groceries</span>
          <ArrowRight size={14} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-12 py-6 flex gap-6">
        {/* Left Column: Vertical Category Navigation Menu (Blinkit style) */}
        <aside className="w-[240px] flex flex-col bg-white border border-fk-border rounded-lg shadow-sm shrink-0 h-fit sticky top-[130px]">
          <span className="p-4 border-b border-fk-border font-extrabold text-xs uppercase tracking-wider text-[#16A34A]">
            Shop by Category
          </span>
          <div className="flex flex-col py-2 max-h-[500px] overflow-y-auto no-scrollbar">
            {quickCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`flex items-center gap-3.5 px-4 py-3 text-left transition-colors border-l-4 font-bold text-xs ${
                  selectedCatId === cat.id
                    ? 'bg-green-50/50 text-[#16A34A] border-[#16A34A]'
                    : 'border-transparent hover:bg-gray-50 text-[#64748B] hover:text-[#172337]'
                }`}
              >
                <div className="w-8 h-8 rounded bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center border border-fk-border">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Column: Grid and Products */}
        <main className="flex-1 flex flex-col gap-6 text-left">
          {/* Active Category Header */}
          <div className="flex items-center justify-between border-b border-fk-border pb-3">
            <h2 className="text-lg font-extrabold text-[#172337] flex items-center gap-2.5">
              <span>{quickCategories.find(c => c.id === selectedCatId)?.name}</span>
              <span className="text-xs text-[#64748B] font-semibold">({activeProducts.length} items available)</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#16A34A] bg-[#eefcf2] px-3 py-1 rounded-full font-extrabold border border-[#16A34A]/10 shadow-xs">
              <Clock size={13} />
              <span>Delivered in 10 mins</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-4 gap-4">
            {activeProducts.map(product => {
              const qty = getCartQty(product.id);
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const isWishlisted = wishlist[product.id];

              return (
                <div
                  key={product.id}
                  className="bg-white border border-fk-border rounded-lg p-3.5 flex flex-col relative hover:shadow-fkCardHover hover:-translate-y-0.5 transition-all duration-300 group h-full cursor-pointer"
                  onClick={() => navigateTo('detail', product.id)}
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-[#E53935] shadow-xs border border-fk-border transition-colors z-10"
                  >
                    <Heart size={12} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                  </button>

                  {/* Discount tag overlay */}
                  {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-[#16A34A] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm z-10">
                      {discount}% OFF
                    </span>
                  )}

                  {/* Image container */}
                  <div className="w-full aspect-square flex items-center justify-center mb-3 bg-slate-50 rounded p-1.5 overflow-hidden">
                    <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  {/* Time badge */}
                  <div className="flex items-center gap-1 text-[9px] text-[#16A34A] font-extrabold bg-[#eefcf2] border border-[#16A34A]/10 rounded-sm w-max px-1.5 py-0.5 mb-2 leading-none shadow-xs">
                    <Clock size={10} className="text-[#16A34A]" />
                    <span>{product.deliveryTime}</span>
                  </div>

                  {/* Title & info */}
                  <h3 className="text-xs font-bold text-[#172337] line-clamp-2 leading-relaxed mb-1 min-h-[36px] group-hover:text-[#16A34A] transition-colors">
                    {product.title}
                  </h3>
                  <div className="text-[10px] text-[#64748B] font-bold mb-3">
                    {product.specs?.['Weight'] || product.specs?.['Volume'] || 'Pack'}
                  </div>

                  {/* Price & Add to Cart row */}
                  <div className="flex items-center justify-between mt-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col leading-none">
                      <span className="text-sm font-extrabold text-[#172337]">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-[#64748B] line-through mt-0.5">₹{product.originalPrice}</span>
                      )}
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4.5 py-1.5 border border-[#16A34A]/40 hover:border-[#16A34A]/80 bg-[#eefcf2] text-[#16A34A] text-xs font-bold rounded hover:bg-[#16A34A]/10 transition-all uppercase tracking-wider shadow-xs select-none"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center border border-[#16A34A] bg-[#16A34A] text-white rounded overflow-hidden text-xs font-bold shadow-xs">
                        <button
                          onClick={() => updateQuantity(product.id, qty - 1)}
                          className="px-2 py-1.5 hover:bg-green-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} strokeWidth={3} />
                        </button>
                        <span className="px-2.5 min-w-[20px] text-center select-none">{qty}</span>
                        <button
                          onClick={() => updateQuantity(product.id, qty + 1)}
                          className="px-2 py-1.5 hover:bg-green-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Floating Bottom Cart Bar for Quick Commerce (Blinkit style) */}
      {activeCartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl bg-[#16A34A] text-white px-5 py-3 rounded-lg shadow-fkCardHover flex items-center justify-between z-40 transition-transform duration-300 transform translate-y-0 scale-100 hover:bg-[#1557D6]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-green-800/40 relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-quick-yellow text-[9px] font-extrabold text-gray-900">
                {activeCartCount}
              </span>
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span className="font-extrabold text-sm">₹{activeCartTotal.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-green-100 font-bold uppercase tracking-wider">Checkout with Quick Cart</span>
            </div>
          </div>
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-1.5 bg-white text-[#16A34A] px-4 py-1.5 rounded text-xs font-bold shadow hover:bg-gray-100 transition-colors"
          >
            <span>View Cart</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
