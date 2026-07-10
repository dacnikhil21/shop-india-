import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, BANNERS } from '../../data/mockData';
import { Carousel } from '../common/Carousel';
import { Star, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const VerticalShop: React.FC = () => {
  const { navigateTo } = useApp();
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Filter products for this vertical
  const shopProducts = PRODUCTS.filter(p => p.vertical === 'shop');
  const banners = BANNERS.filter(b => b.vertical === 'shop');

  // Deals countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  // Categories for sections
  const mobiles = shopProducts.filter(p => p.category === 's-mobiles');
  const electronics = shopProducts.filter(p => p.category === 's-electronics');

  return (
    <div className="w-full flex flex-col gap-5 py-5 px-12 bg-fk-lightGray min-h-screen text-[#172337]">
      {/* Hero Banner Carousel with cinematic lighting and animations */}
      <div className="w-full h-[280px] rounded overflow-hidden shadow-fk">
        <Carousel showArrows={true} showIndicators={true} autoplayDelay={5000}>
          {banners.map(banner => (
            <div
              key={banner.id}
              className="w-full h-[280px] flex items-center justify-between relative text-white bg-slate-950"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-[8000ms] ease-out scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-0" />
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative z-10 pl-16 flex flex-col max-w-lg select-none text-left"
              >
                <span className="bg-[#FF6B00] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded w-max tracking-wider mb-3 shadow-sm">
                  LIMITED OFFER
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight mb-2 drop-shadow-md leading-tight">
                  {banner.title}
                </h2>
                <p className="text-sm font-semibold text-slate-200 opacity-95 leading-relaxed mb-5">
                  {banner.subtitle}
                </p>
                <button
                  onClick={() => navigateTo('search')}
                  className="px-6 py-2.5 bg-[#2874F0] hover:bg-[#1557D6] text-white rounded font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition-all duration-350 transform active:scale-95 w-max uppercase"
                >
                  SHOP NOW
                </button>
              </motion.div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Flipkart-style Deals of the Day */}
      <div className="w-full bg-white flex shadow-fk rounded-sm overflow-hidden select-none border border-fk-border">
        {/* Deal info & Timer (Left Column) */}
        <div className="w-[260px] p-6 border-r border-fk-border flex flex-col items-center justify-center text-center shrink-0 bg-cover bg-bottom bg-no-repeat"
             style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format')` }}>
          <h3 className="text-lg font-bold mb-3 tracking-tight text-slate-800 uppercase text-xs tracking-wider">Deals of the Day</h3>
          <div className="flex items-center gap-1.5 mb-6">
            <span className="w-6 h-6 flex items-center justify-center bg-[#E53935] text-white font-extrabold rounded text-xs shadow-sm">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="font-bold text-red-600">:</span>
            <span className="w-6 h-6 flex items-center justify-center bg-[#E53935] text-white font-extrabold rounded text-xs shadow-sm">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="font-bold text-red-600">:</span>
            <span className="w-6 h-6 flex items-center justify-center bg-[#E53935] text-white font-extrabold rounded text-xs shadow-sm">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
          <button
            onClick={() => navigateTo('search')}
            className="px-5 py-2 bg-[#2874F0] hover:bg-[#1557D6] text-white font-bold text-[10px] tracking-wider rounded-sm shadow-sm transition-colors uppercase"
          >
            View All
          </button>
        </div>

        {/* Dynamic Horizontal Product Scroll (Right Column) */}
        <div className="w-full flex gap-5 overflow-x-auto p-5 py-6 scroll-smooth no-scrollbar">
          {shopProducts.slice(0, 5).map(product => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const isWishlisted = wishlist[product.id];
            return (
              <div
                key={product.id}
                onClick={() => navigateTo('detail', product.id)}
                className="w-[180px] flex-shrink-0 flex flex-col items-center text-center group cursor-pointer relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-1 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-[#E53935] shadow-sm border border-fk-border transition-colors z-10"
                >
                  <Heart size={12} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                </button>

                <div className="w-[130px] h-[130px] flex items-center justify-center mb-3 bg-slate-50 border border-slate-100 rounded p-2 overflow-hidden">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-xs font-bold text-[#172337] line-clamp-1 group-hover:text-[#2874F0] transition-colors px-2 leading-tight">
                  {product.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-1.5 justify-center leading-none">
                  <span className="text-xs font-extrabold text-[#172337]">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <span className="text-[10px] text-[#FF6B00] font-bold mt-1 bg-orange-50 px-2 py-0.5 rounded-full">
                  {discount}% OFF
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Multi-Column Product Display Grids */}
      <div className="w-full grid grid-cols-4 gap-5">
        {/* Left Column: Product Grid Sections (Span 3) */}
        <div className="col-span-3 flex flex-col gap-5">
          {/* Section 1: Mobile & Smart Devices */}
          <div className="w-full bg-white p-5 rounded-sm shadow-fk flex flex-col gap-4 border border-fk-border">
            <div className="flex justify-between items-center border-b border-fk-border pb-3">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 bg-[#2874F0] rounded-full"></span>
                <h3 className="text-sm font-extrabold text-[#172337] uppercase tracking-wide">Latest Mobiles & Tablets</h3>
              </div>
              <button onClick={() => navigateTo('search')} className="text-xs font-bold text-[#2874F0] hover:underline">VIEW ALL</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {mobiles.map(product => {
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                const isWishlisted = wishlist[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => navigateTo('detail', product.id)}
                    className="border border-fk-border rounded-md p-4 flex flex-col bg-white hover:shadow-fkCardHover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer h-full group relative"
                  >
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-[#E53935] shadow-sm border border-fk-border transition-colors z-10"
                    >
                      <Heart size={13} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                    </button>

                    <div className="w-full aspect-square flex items-center justify-center mb-4 relative overflow-hidden rounded bg-slate-50 p-2">
                      <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                      {product.isAssured && (
                        <img
                          src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                          alt="Assured"
                          className="h-3.5 object-contain absolute bottom-2 left-2 shadow-xs"
                        />
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-[#172337] line-clamp-2 leading-relaxed mb-2 group-hover:text-[#2874F0] transition-colors min-h-[36px]">
                      {product.title}
                    </h4>

                    <div className="flex items-center gap-2 mb-2.5 mt-auto leading-none">
                      <div className="flex items-center gap-0.5 bg-[#16A34A] text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                        <span>{product.rating}</span>
                        <Star size={8} className="fill-white text-white" />
                      </div>
                      <span className="text-[10px] text-[#64748B] font-semibold">({product.ratingCount.toLocaleString('en-IN')})</span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-1 leading-none">
                      <span className="text-sm font-extrabold text-[#172337]">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] font-bold text-[#FF6B00]">{discount}% Off</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Electronics & Audio */}
          <div className="w-full bg-white p-5 rounded-sm shadow-fk flex flex-col gap-4 border border-fk-border">
            <div className="flex justify-between items-center border-b border-fk-border pb-3">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 bg-[#2874F0] rounded-full"></span>
                <h3 className="text-sm font-extrabold text-[#172337] uppercase tracking-wide">Hot Electronics & Audio Deals</h3>
              </div>
              <button onClick={() => navigateTo('search')} className="text-xs font-bold text-[#2874F0] hover:underline">VIEW ALL</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {electronics.map(product => {
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                const isWishlisted = wishlist[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => navigateTo('detail', product.id)}
                    className="border border-fk-border rounded-md p-4 flex flex-col bg-white hover:shadow-fkCardHover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer h-full group relative"
                  >
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-[#E53935] shadow-sm border border-fk-border transition-colors z-10"
                    >
                      <Heart size={13} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                    </button>

                    <div className="w-full aspect-square flex items-center justify-center mb-4 relative overflow-hidden rounded bg-slate-50 p-2">
                      <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                      {product.isAssured && (
                        <img
                          src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                          alt="Assured"
                          className="h-3.5 object-contain absolute bottom-2 left-2 shadow-xs"
                        />
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-[#172337] line-clamp-2 leading-relaxed mb-2 group-hover:text-[#2874F0] transition-colors min-h-[36px]">
                      {product.title}
                    </h4>

                    <div className="flex items-center gap-2 mb-2.5 mt-auto leading-none">
                      <div className="flex items-center gap-0.5 bg-[#16A34A] text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                        <span>{product.rating}</span>
                        <Star size={8} className="fill-white text-white" />
                      </div>
                      <span className="text-[10px] text-[#64748B] font-semibold">({product.ratingCount.toLocaleString('en-IN')})</span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-1 leading-none">
                      <span className="text-sm font-extrabold text-[#172337]">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] font-bold text-[#FF6B00]">{discount}% Off</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Promotional Sidebar / Advertisements (Span 1) */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="w-full bg-white p-5 rounded-sm shadow-fk flex flex-col gap-4 border border-fk-border">
            <span className="font-extrabold text-xs tracking-wider text-[#172337] uppercase">Shop Premium Partner</span>
            <div className="relative aspect-[3/4] rounded-md overflow-hidden shadow-inner group cursor-pointer bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format"
                alt="Nike Ad"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[9px] font-bold uppercase tracking-wider text-fk-yellow mb-1">Brand Spotlight</span>
                <h4 className="text-base font-extrabold leading-tight mb-1">Step Into The Future</h4>
                <p className="text-[11px] text-gray-300 leading-normal mb-3">Air Jordan collection at lowest prices.</p>
                <button
                  onClick={() => navigateTo('search')}
                  className="px-4 py-2 bg-[#2874F0] text-white rounded font-bold text-[9px] tracking-wide w-max shadow hover:bg-[#1557D6] transition-colors"
                >
                  EXPLORE NOW
                </button>
              </div>
            </div>
          </div>

          <div className="w-full bg-white p-5 rounded-sm shadow-fk flex flex-col gap-3 border border-fk-border">
            <div className="flex gap-3 items-center">
              <Award size={20} className="text-[#FF6B00]" />
              <div className="flex flex-col leading-tight text-left">
                <span className="font-extrabold text-xs text-[#172337]">Flipkart Plus Partner</span>
                <span className="text-[10px] text-[#64748B] font-semibold">Guaranteed free shipping</span>
              </div>
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed border-t border-fk-border pt-2.5 text-left font-medium">
              Enjoy 1-day delivery and special discount prices on items displaying the <strong>Flipkart Assured</strong> badge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
