import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';
import { Star, ShoppingCart, Zap, ArrowLeft, Heart, Share2, MapPin, BadgePercent, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, addToCart, navigateTo, goBack, currentVertical } = useApp();
  const isMobile = useIsMobile();
  const [pincode, setPincode] = useState('');
  const [pincodeCheckResult, setPincodeCheckResult] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Retrieve the selected product
  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeCheckResult(`Standard delivery by tomorrow, 11:00 AM. Free shipping.`);
    } else {
      setPincodeCheckResult('Invalid pincode. Please enter a 6-digit postal code.');
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigateTo('cart');
  };

  const isServices = currentVertical === 'services';

  const mockReviews = [
    { name: 'Aman Sharma', rating: 5, date: '12 days ago', comment: 'Absolutely outstanding product. Reached in perfect condition, and delivery was exceptionally fast.' },
    { name: 'Priya Patel', rating: 4, date: '1 month ago', comment: 'Highly recommended! Value for money and great customer support.' }
  ];

  // Desktop Page Layout
  const renderDesktop = () => {
    return (
      <div className="max-w-7xl mx-auto px-12 py-8 text-left select-none text-brand-graphite font-sans">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-slate font-bold mb-6 font-heading uppercase tracking-wider">
          <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigateTo('search')} className="hover:underline capitalize">{product.vertical} Catalog</button>
          <ChevronRight size={12} />
          <span className="text-brand-graphite font-black truncate max-w-sm dark:text-white">{product.title}</span>
        </div>

        <div className="grid grid-cols-5 gap-8">
          {/* Left Column: Image & Checkout Buttons (Span 2) */}
          <div className="col-span-2 flex flex-col gap-5">
            <div className={`border rounded-[20px] p-8 aspect-square flex items-center justify-center relative ${
              isServices ? 'bg-[#2C2C2E] border-zinc-800' : 'bg-white border-brand-border shadow-premium'
            }`}>
              {/* Floating Wishlist Heart */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white text-zinc-400 hover:text-brand-red shadow-soft border border-brand-border transition-colors z-10"
              >
                <Heart size={16} className={isWishlisted ? "fill-brand-red text-brand-red" : ""} />
              </motion.button>

              <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain rounded" />
              {product.isAssured && (
                <img
                  src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                  alt="Assured"
                  className="h-4.5 object-contain absolute bottom-4 left-4"
                />
              )}
            </div>

            {/* CTA action buttons (16px curved) */}
            <div className="grid grid-cols-2 gap-3 text-xs font-extrabold select-none font-heading">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-button bg-brand-orange hover:bg-orange-655 text-white flex items-center justify-center gap-2 shadow-premium transition-all uppercase tracking-wider font-black"
              >
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-button bg-brand-blue hover:bg-blue-600 text-white flex items-center justify-center gap-2 shadow-premium transition-all uppercase tracking-wider font-black"
              >
                <Zap size={16} />
                <span>Buy Now</span>
              </motion.button>
            </div>
          </div>

          {/* Right Column: Info details (Span 3) */}
          <div className="col-span-3 flex flex-col gap-6">
            <div>
              <h1 className={`text-lg font-bold leading-relaxed mb-2.5 font-heading ${isServices ? 'text-white' : 'text-brand-graphite'}`}>
                {product.title}
              </h1>
              <div className="flex items-center gap-2 mb-3 leading-none">
                <div className="flex items-center gap-0.5 bg-brand-green text-white font-extrabold text-xs px-2 py-0.5 rounded shadow-soft font-numbers">
                  <span>{product.rating}</span>
                  <Star size={10} className="fill-white text-white" />
                </div>
                <span className="text-xs text-brand-slate font-bold font-numbers">({product.ratingCount.toLocaleString('en-IN')} Customer Reviews)</span>
              </div>
            </div>

            {/* Price Details */}
            <div className="flex items-baseline gap-3 border-b border-brand-border/10 pb-5 leading-none font-numbers">
              <span className={`text-2xl font-black ${isServices ? 'text-white' : 'text-brand-graphite'}`}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-brand-slate line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-black text-brand-orange uppercase tracking-wider">{discount}% off</span>
                </>
              )}
            </div>

            {/* Bank offers */}
            <div className="flex flex-col gap-3">
              <span className={`font-black text-xs uppercase tracking-widest font-heading ${isServices ? 'text-zinc-300' : 'text-brand-graphite'}`}>Available Offers & Discounts</span>
              <div className="flex flex-col gap-2 text-xs text-brand-slate font-semibold">
                <div className="flex gap-2.5 items-start leading-relaxed text-left">
                  <BadgePercent size={15} className="text-brand-green shrink-0 mt-0.5" />
                  <span><strong>Bank Offer:</strong> Get 10% instant discount on Credit Cards, up to ₹1,500.</span>
                </div>
                <div className="flex gap-2.5 items-start leading-relaxed text-left">
                  <BadgePercent size={15} className="text-brand-green shrink-0 mt-0.5" />
                  <span><strong>Bank Offer:</strong> Flat ₹100 instant cashback on Wallet transactions above ₹999.</span>
                </div>
              </div>
            </div>

            {/* Pincode checker (16px curves) */}
            <div className="py-5 border-t border-b border-brand-border/10 flex flex-col gap-3">
              <span className={`font-black text-xs uppercase tracking-widest font-heading ${isServices ? 'text-zinc-300' : 'text-brand-graphite'}`}>Delivery & Slot Estimates</span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2.5 max-w-sm">
                <div className="flex border border-brand-border rounded-input overflow-hidden w-full bg-white shadow-soft">
                  <span className="p-2 text-brand-slate"><MapPin size={15} /></span>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit delivery pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full py-1.5 text-xs font-bold focus:outline-none text-brand-graphite"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-5 bg-brand-blue hover:bg-blue-650 text-white font-extrabold text-xs rounded-button uppercase tracking-wider transition-colors"
                >
                  Check
                </motion.button>
              </form>
              {pincodeCheckResult && (
                <span className={`text-xs font-bold ${pincodeCheckResult.includes('Invalid') ? 'text-brand-red' : 'text-brand-green'}`}>
                  {pincodeCheckResult}
                </span>
              )}
            </div>

            {/* Specs tables (20px curves) */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="flex flex-col gap-3">
                <span className={`font-black text-xs uppercase tracking-widest font-heading ${isServices ? 'text-zinc-300' : 'text-brand-graphite'}`}>Specifications & Features</span>
                <div className="border border-brand-border rounded-card overflow-hidden text-xs shadow-soft">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div key={key} className={`grid grid-cols-3 p-3 text-left ${
                      idx % 2 === 0
                        ? isServices ? 'bg-zinc-900' : 'bg-slate-50/50'
                        : isServices ? 'bg-zinc-800/40' : 'bg-white'
                    } border-b border-brand-border last:border-0`}>
                      <span className="font-extrabold text-brand-slate">{key}</span>
                      <span className={`col-span-2 font-bold ${isServices ? 'text-white' : 'text-brand-graphite'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews list */}
            <div className="flex flex-col gap-3.5">
              <span className={`font-black text-xs uppercase tracking-widest font-heading ${isServices ? 'text-zinc-300' : 'text-brand-graphite'}`}>Ratings & User Reviews</span>
              <div className="flex flex-col gap-3">
                {mockReviews.map((rev, i) => (
                  <div key={i} className={`p-5 border rounded-card text-left shadow-soft ${isServices ? 'bg-[#2C2C2E] border-zinc-800 text-white' : 'bg-white border-brand-border'}`}>
                    <div className="flex justify-between items-center mb-2 leading-none font-heading">
                      <span className="font-extrabold text-xs">{rev.name}</span>
                      <span className="text-[10px] text-brand-slate font-bold font-numbers">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5 text-[#ffe500] mb-2.5">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} size={11} className="fill-brand-orange text-brand-orange" />
                      ))}
                    </div>
                    <p className="text-xs text-brand-slate font-semibold leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Page Layout
  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col bg-[#FAF9F6] min-h-screen text-left pb-28 select-none text-brand-graphite font-sans">
        {/* Navigation header row */}
        <div className={`px-4 py-3.5 sticky top-12 z-30 flex items-center justify-between border-b ${
          isServices ? 'bg-zinc-900 border-zinc-850 text-white' : 'bg-white border-brand-border text-brand-graphite'
        }`}>
          <button onClick={goBack} className="p-1">
            <ArrowLeft size={18} />
          </button>
          <span className="font-extrabold text-xs tracking-wide font-heading uppercase">Product Details</span>
          <div className="flex gap-3">
            <button onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart size={18} className={isWishlisted ? "fill-brand-red text-brand-red" : ""} />
            </button>
            <Share2 size={18} className="text-brand-slate" />
          </div>
        </div>

        {/* Large picture */}
        <div className={`w-full aspect-[4/3] flex items-center justify-center p-6 border-b relative ${
          isServices ? 'bg-[#2C2C2E] border-zinc-800' : 'bg-white border-brand-border'
        }`}>
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain rounded" />
          {product.isAssured && (
            <img
              src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
              alt="Assured"
              className="h-3.5 object-contain absolute bottom-3 left-3"
            />
          )}
        </div>

        {/* Product details */}
        <div className="p-4 flex flex-col gap-4">
          <div>
            <h1 className="text-xs font-bold leading-normal mb-1.5 font-heading text-brand-graphite">{product.title}</h1>
            <div className="flex items-center gap-1.5 leading-none">
              <div className="flex items-center gap-0.5 bg-brand-green text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded font-numbers">
                <span>{product.rating}</span>
                <Star size={7} className="fill-white text-white" />
              </div>
              <span className="text-[10px] text-brand-slate font-bold font-numbers">({product.ratingCount.toLocaleString('en-IN')} Reviews)</span>
            </div>
          </div>

          {/* Pricing detail */}
          <div className="flex items-baseline gap-2 border-b border-brand-border pb-3.5 leading-none font-numbers">
            <span className="text-lg font-black text-brand-graphite">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-[11px] text-brand-slate line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider">{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Delivery checker */}
          <div className="flex flex-col gap-2 py-1">
            <span className="text-[9px] uppercase font-black tracking-widest text-brand-slate font-heading">Pincode Check</span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-xs">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3.5 py-2 border border-brand-border bg-white rounded-input text-xs font-bold focus:outline-none"
              />
              <button type="submit" className="px-4.5 bg-brand-blue text-white rounded-button text-[10px] font-black uppercase tracking-wider">
                Check
              </button>
            </form>
            {pincodeCheckResult && (
              <span className={`text-[10px] font-bold ${pincodeCheckResult.includes('Invalid') ? 'text-brand-red' : 'text-brand-green'}`}>
                {pincodeCheckResult}
              </span>
            )}
          </div>

          {/* Key Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[9px] uppercase font-black tracking-widest text-brand-slate font-heading">Key Specifications</span>
              <div className="border border-brand-border rounded-card overflow-hidden text-[10px] shadow-soft">
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <div key={key} className={`grid grid-cols-3 p-2.5 ${
                    idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                  } border-b border-brand-border last:border-0`}>
                    <span className="font-bold text-brand-slate">{key}</span>
                    <span className="col-span-2 font-bold text-brand-graphite">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Mobile Bottom CTA Buttons (16px button curves) */}
        <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-brand-border grid grid-cols-2 items-center z-45 text-center text-xs font-extrabold select-none shadow-premium">
          <button
            onClick={handleAddToCart}
            className="w-full h-full text-brand-graphite bg-white border-r border-brand-border flex items-center justify-center gap-1.5 uppercase hover:bg-slate-50 transition-colors font-heading"
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full h-full bg-brand-blue text-white flex items-center justify-center gap-1.5 uppercase hover:bg-blue-650 transition-all font-heading"
          >
            <Zap size={15} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};
