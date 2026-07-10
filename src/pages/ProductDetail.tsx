import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';
import { Star, ShoppingCart, Zap, ArrowLeft, Heart, Share2, MapPin, BadgePercent, ChevronRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-12 py-8 text-left select-none text-[#172337]">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-bold mb-6">
          <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigateTo('search')} className="hover:underline capitalize">{product.vertical} Vertical</button>
          <ChevronRight size={12} />
          <span className="text-[#172337] font-extrabold truncate max-w-sm dark:text-white">{product.title}</span>
        </div>

        <div className="grid grid-cols-5 gap-8">
          {/* Left Column: Image & Checkout Buttons (Span 2) */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className={`border rounded-lg p-8 aspect-square flex items-center justify-center relative ${
              isServices ? 'bg-services-card border-services-border' : 'bg-white border-fk-border shadow-sm'
            }`}>
              {/* Floating Wishlist Heart */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white text-gray-400 hover:text-[#E53935] shadow-sm border border-fk-border transition-colors z-10"
              >
                <Heart size={16} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
              </button>

              <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain rounded" />
              {product.isAssured && (
                <img
                  src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                  alt="Assured"
                  className="h-4.5 object-contain absolute bottom-4 left-4"
                />
              )}
            </div>

            {/* CTA action buttons */}
            <div className="grid grid-cols-2 gap-3 text-sm font-extrabold select-none">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded bg-[#FF6B00] hover:bg-orange-600 text-white flex items-center justify-center gap-2 shadow-sm transition-all uppercase tracking-wide transform active:scale-95"
              >
                <ShoppingCart size={17} />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded bg-[#fb641b] hover:bg-orange-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all uppercase tracking-wide transform active:scale-95"
              >
                <Zap size={17} />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Info details (Span 3) */}
          <div className="col-span-3 flex flex-col gap-5 text-[#172337]">
            <div>
              <h1 className={`text-lg font-bold leading-relaxed mb-2 ${isServices ? 'text-white' : 'text-[#172337]'}`}>
                {product.title}
              </h1>
              <div className="flex items-center gap-2.5 mb-3 leading-none">
                <div className="flex items-center gap-0.5 bg-[#16A34A] text-white font-extrabold text-xs px-2 py-0.5 rounded shadow-xs">
                  <span>{product.rating}</span>
                  <Star size={10} className="fill-white text-white" />
                </div>
                <span className="text-xs text-[#64748B] font-bold">({product.ratingCount.toLocaleString('en-IN')} Reviews)</span>
              </div>
            </div>

            {/* Price Details */}
            <div className="flex items-baseline gap-3 border-b border-fk-border pb-4 leading-none">
              <span className={`text-2xl font-extrabold ${isServices ? 'text-white' : 'text-[#172337]'}`}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-extrabold text-[#FF6B00]">{discount}% off</span>
                </>
              )}
            </div>

            {/* Flipkart-style Bank offers */}
            <div className="flex flex-col gap-2">
              <span className={`font-extrabold text-xs ${isServices ? 'text-gray-300' : 'text-[#172337]'}`}>Available Offers & Discounts</span>
              <div className="flex flex-col gap-1.5 text-xs text-slate-650 dark:text-services-gray">
                <div className="flex gap-2 items-start leading-normal">
                  <BadgePercent size={14} className="text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Bank Offer:</strong> Get 10% instant discount on SBI Bank Credit Cards, up to ₹1,500.</span>
                </div>
                <div className="flex gap-2 items-start leading-normal">
                  <BadgePercent size={14} className="text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Bank Offer:</strong> Flat ₹100 instant cashback on Paytm Wallet transactions above ₹999.</span>
                </div>
                <div className="flex gap-2 items-start leading-normal">
                  <BadgePercent size={14} className="text-[#16A34A] shrink-0 mt-0.5" />
                  <span><strong>Partner Offer:</strong> Sign up for ShopIndia Plus and get ₹500 discount coins instantly.</span>
                </div>
              </div>
            </div>

            {/* Pincode check delivery estimates */}
            <div className="py-4 border-t border-b border-fk-border flex flex-col gap-2">
              <span className={`font-extrabold text-xs ${isServices ? 'text-gray-300' : 'text-[#172337]'}`}>Delivery & Installation Estimates</span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                <div className="flex border border-[#E5E7EB] rounded overflow-hidden w-full bg-white">
                  <span className="p-2 text-gray-400"><MapPin size={15} /></span>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter delivery pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full py-1.5 text-xs font-semibold focus:outline-none text-gray-800"
                  />
                </div>
                <button type="submit" className="px-5 bg-[#2874F0] hover:bg-[#1557D6] text-white font-bold text-xs rounded uppercase tracking-wider transition-colors">
                  Check
                </button>
              </form>
              {pincodeCheckResult && (
                <span className={`text-xs font-bold ${pincodeCheckResult.includes('Invalid') ? 'text-[#E53935]' : 'text-[#16A34A]'}`}>
                  {pincodeCheckResult}
                </span>
              )}
            </div>

            {/* Specs tables */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="flex flex-col gap-2">
                <span className={`font-extrabold text-xs ${isServices ? 'text-gray-300' : 'text-[#172337]'}`}>Specifications & Features</span>
                <div className="border border-fk-border rounded overflow-hidden text-xs">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div key={key} className={`grid grid-cols-3 p-2.5 ${
                      idx % 2 === 0
                        ? isServices ? 'bg-zinc-900' : 'bg-slate-50'
                        : isServices ? 'bg-services-card' : 'bg-white'
                    } border-b border-fk-border last:border-0`}>
                      <span className="font-bold text-[#64748B]">{key}</span>
                      <span className={`col-span-2 font-bold ${isServices ? 'text-white' : 'text-[#172337]'}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews list */}
            <div className="flex flex-col gap-3">
              <span className={`font-extrabold text-xs ${isServices ? 'text-gray-300' : 'text-[#172337]'}`}>Ratings & User Reviews</span>
              <div className="flex flex-col gap-2.5">
                {mockReviews.map((rev, i) => (
                  <div key={i} className={`p-4 border rounded ${isServices ? 'bg-services-card border-services-border' : 'bg-white border-fk-border'}`}>
                    <div className="flex items-center justify-between mb-1.5 leading-none">
                      <span className={`font-bold text-xs ${isServices ? 'text-white' : 'text-[#172337]'}`}>{rev.name}</span>
                      <span className="text-[10px] text-[#64748B] font-bold">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5 text-fk-yellow mb-2">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} size={10} className="fill-[#FF6B00] text-[#FF6B00]" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{rev.comment}</p>
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
      <div className="w-full flex flex-col bg-slate-50 min-h-screen text-left pb-28 select-none text-[#172337]">
        {/* Navigation header row */}
        <div className={`px-4 py-3.5 sticky top-12 z-30 flex items-center justify-between border-b ${
          isServices ? 'bg-zinc-900 border-services-border text-white' : 'bg-white border-fk-border text-[#172337]'
        }`}>
          <button onClick={goBack} className="p-1">
            <ArrowLeft size={18} />
          </button>
          <span className="font-extrabold text-xs tracking-wide">Product Details</span>
          <div className="flex gap-3">
            <button onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart size={18} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
            </button>
            <Share2 size={18} />
          </div>
        </div>

        {/* Large picture */}
        <div className={`w-full aspect-[4/3] flex items-center justify-center p-6 border-b relative ${
          isServices ? 'bg-services-card border-services-border' : 'bg-white border-fk-border'
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
            <h1 className={`text-xs font-bold leading-normal mb-1.5 ${isServices ? 'text-white' : 'text-[#172337]'}`}>{product.title}</h1>
            <div className="flex items-center gap-1.5 leading-none">
              <div className="flex items-center gap-0.5 bg-[#16A34A] text-white font-extrabold text-[9px] px-1 py-0.2 rounded">
                <span>{product.rating}</span>
                <Star size={7} className="fill-white text-white" />
              </div>
              <span className="text-[10px] text-[#64748B] font-bold">({product.ratingCount.toLocaleString('en-IN')} Reviews)</span>
            </div>
          </div>

          {/* Pricing detail */}
          <div className="flex items-baseline gap-2 border-b border-fk-border pb-3 leading-none">
            <span className={`text-lg font-extrabold ${isServices ? 'text-white' : 'text-[#172337]'}`}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-[11px] text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] font-bold text-[#FF6B00]">{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Delivery checker */}
          <div className="flex flex-col gap-2 py-1">
            <span className={`text-[10px] uppercase font-bold tracking-wider ${isServices ? 'text-gray-300' : 'text-[#64748B]'}`}>Pincode Delivery checker</span>
            <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-xs">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-3 py-1.5 border border-fk-border bg-white rounded text-xs font-bold focus:outline-none"
              />
              <button type="submit" className="px-4 bg-[#2874F0] text-white rounded text-[10px] font-bold uppercase transition-colors">
                Check
              </button>
            </form>
            {pincodeCheckResult && (
              <span className={`text-[10px] font-bold ${pincodeCheckResult.includes('Invalid') ? 'text-[#E53935]' : 'text-[#16A34A]'}`}>
                {pincodeCheckResult}
              </span>
            )}
          </div>

          {/* Key Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="flex flex-col gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isServices ? 'text-gray-300' : 'text-[#64748B]'}`}>Product Specs</span>
              <div className="border border-fk-border rounded overflow-hidden text-[10px]">
                {Object.entries(product.specs).map(([key, val], idx) => (
                  <div key={key} className={`grid grid-cols-3 p-2.5 ${
                    idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                  } border-b border-fk-border last:border-0`}>
                    <span className="font-bold text-[#64748B]">{key}</span>
                    <span className="col-span-2 font-bold text-[#172337]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Mobile Bottom CTA Buttons */}
        <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-fk-border grid grid-cols-2 items-center z-45 text-center text-xs font-extrabold select-none shadow-md3_3">
          <button
            onClick={handleAddToCart}
            className="w-full h-full text-gray-700 bg-white border-r border-fk-border flex items-center justify-center gap-1.5 uppercase hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full h-full bg-[#ff9f00] text-white flex items-center justify-center gap-1.5 uppercase hover:bg-orange-600 transition-all transform active:scale-95"
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
