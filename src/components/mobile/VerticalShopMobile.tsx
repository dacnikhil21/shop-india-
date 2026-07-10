import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, BANNERS, CATEGORIES } from '../../data/mockData';
import { Carousel } from '../common/Carousel';
import { Search, Star, Clock, Heart } from 'lucide-react';

export const VerticalShopMobile: React.FC = () => {
  const { navigateTo, setSearchQuery } = useApp();
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 44, seconds: 12 });
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const shopProducts = PRODUCTS.filter(p => p.vertical === 'shop');
  const banners = BANNERS.filter(b => b.vertical === 'shop');
  const shopCategories = CATEGORIES.filter(c => c.vertical === 'shop');

  // Deals countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="w-full flex flex-col gap-3 py-3.5 px-3 bg-slate-50 min-h-screen text-[#172337] pb-16">
      {/* Mobile Search Bar Trigger */}
      <div
        onClick={() => { setSearchQuery(''); navigateTo('search'); }}
        className="w-full bg-white border border-fk-border rounded-md py-2.5 px-3.5 flex items-center gap-2 shadow-sm text-slate-400 text-xs font-semibold cursor-pointer transition-shadow active:shadow-md"
      >
        <Search size={14} className="text-slate-400" />
        <span>Search for products, brands & categories</span>
      </div>

      {/* Horizontal Categories Scroll */}
      <div className="w-full flex gap-3.5 overflow-x-auto py-2.5 px-2 bg-white rounded-md border border-fk-border shadow-sm no-scrollbar select-none">
        {shopCategories.map(cat => (
          <div
            key={cat.id}
            onClick={() => { setSearchQuery(cat.name); navigateTo('search'); }}
            className="flex flex-col items-center shrink-0 w-16 text-center cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-full bg-slate-50 border border-fk-border overflow-hidden mb-1 flex items-center justify-center shadow-xs">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[9px] font-bold text-slate-600 truncate w-full tracking-wide">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Hero Banner Carousel with gradient shadows */}
      <div className="w-full aspect-[21/9] rounded-md overflow-hidden shadow-sm">
        <Carousel showArrows={false} showIndicators={true} autoplayDelay={4500}>
          {banners.map(banner => (
            <div
              key={banner.id}
              onClick={() => navigateTo('search')}
              className="w-full h-full relative bg-slate-900"
            >
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 to-transparent flex flex-col justify-center px-6 text-white text-left select-none">
                <span className="text-[8px] bg-[#FF6B00] text-white font-extrabold px-1.5 py-0.5 rounded w-max uppercase tracking-wider mb-1">Plus Deal</span>
                <h3 className="text-xs font-extrabold line-clamp-1">{banner.title}</h3>
                <p className="text-[9px] opacity-90 line-clamp-1">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Mobile Deals of the Day Box */}
      <div className="w-full bg-white rounded-md p-3.5 shadow-sm border border-fk-border flex flex-col gap-3">
        <div className="flex justify-between items-center border-b border-fk-border pb-2 leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold text-[#172337] tracking-tight uppercase">Deals of the Day</span>
            <div className="flex items-center gap-0.5 text-[9px] text-[#E53935] font-extrabold bg-red-50 px-1.5 py-0.5 rounded border border-red-150">
              <Clock size={8} />
              <span>{formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m</span>
            </div>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="text-[10px] font-extrabold text-[#2874F0] uppercase tracking-wider"
          >
            See All
          </button>
        </div>

        {/* Scrollable Deals */}
        <div className="w-full flex gap-3.5 overflow-x-auto no-scrollbar">
          {shopProducts.map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const isWishlisted = wishlist[product.id];
            return (
              <div
                key={product.id}
                onClick={() => navigateTo('detail', product.id)}
                className="w-28 shrink-0 flex flex-col text-left cursor-pointer group relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-white/95 text-gray-400 hover:text-[#E53935] shadow-sm border border-fk-border transition-colors z-10"
                >
                  <Heart size={10} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                </button>

                <div className="w-28 h-28 border border-fk-border rounded-md flex items-center justify-center p-2 bg-slate-50 mb-1.5 overflow-hidden">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="text-[10px] font-bold text-[#172337] line-clamp-1 leading-snug">{product.title}</h4>
                <span className="text-[10px] font-extrabold text-[#172337] mt-0.5">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-[9px] font-bold text-[#FF6B00]">{discount}% OFF</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Double Column Feed for Mobiles */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between border-b border-fk-border pb-1.5 mt-2.5">
          <span className="text-xs font-bold text-[#172337] uppercase tracking-wider">Suggested for You</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {shopProducts.map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const isWishlisted = wishlist[product.id];
            return (
              <div
                key={product.id}
                onClick={() => navigateTo('detail', product.id)}
                className="bg-white border border-fk-border rounded-md p-3 flex flex-col cursor-pointer relative shadow-sm"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/95 text-gray-400 hover:text-[#E53935] shadow-xs border border-fk-border transition-colors z-10"
                >
                  <Heart size={11} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                </button>

                {product.isAssured && (
                  <img
                    src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                    alt="Assured"
                    className="h-3 object-contain absolute top-2.5 left-2.5 z-10"
                  />
                )}
                <div className="w-full aspect-square flex items-center justify-center mb-2.5 bg-slate-50 rounded p-1.5 overflow-hidden">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-[10px] font-bold text-[#172337] line-clamp-2 leading-snug mb-1 min-h-[30px]">
                  {product.title}
                </h3>
                <div className="flex items-center gap-1.5 mb-1.5 mt-auto leading-none">
                  <div className="flex items-center gap-0.5 bg-[#16A34A] text-white font-extrabold text-[8px] px-1 py-0.2 rounded">
                    <span>{product.rating}</span>
                    <Star size={7} className="fill-white text-white" />
                  </div>
                  <span className="text-[9px] text-[#64748B] font-bold">({product.ratingCount.toLocaleString('en-IN')})</span>
                </div>
                <div className="flex items-baseline gap-1 mt-1 leading-none">
                  <span className="text-[11px] font-extrabold text-[#172337]">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-[9px] text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-[8px] font-bold text-[#FF6B00]">{discount}% Off</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
