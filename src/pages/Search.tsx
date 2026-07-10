import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';
import { Search, Star, Filter, ArrowUpDown, Heart } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { currentVertical, searchQuery, setSearchQuery, navigateTo } = useApp();
  const isMobile = useIsMobile();
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Filters state
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(150000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products by current search query and current vertical
  const searchedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(p => p.vertical === currentVertical);

    // Apply search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Apply filters
    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }
    if (minRating) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }
    filtered = filtered.filter(p => p.price <= maxPrice);

    // Apply Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [currentVertical, searchQuery, selectedBrand, minRating, maxPrice, sortBy]);

  // Extract unique brands for filtering options
  const brands = useMemo(() => {
    const allBrands = PRODUCTS.filter(p => p.vertical === currentVertical).map(p => p.brand);
    return Array.from(new Set(allBrands));
  }, [currentVertical]);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleResetFilters = () => {
    setSelectedBrand(null);
    setMinRating(null);
    setMaxPrice(150000);
    setSortBy('relevance');
  };

  const isServices = currentVertical === 'services';

  // Desktop search page layout
  const renderDesktop = () => {
    return (
      <div className="w-full flex gap-5 py-6 px-12 text-left">
        {/* Left Filter Sidebar */}
        <aside className={`w-[260px] p-5 border rounded shrink-0 h-fit select-none ${
          isServices ? 'bg-services-card border-services-border' : 'bg-white border-fk-border shadow-fk'
        }`}>
          <div className="flex justify-between items-center border-b pb-3.5 mb-4 border-fk-border">
            <span className="font-extrabold text-xs uppercase tracking-wider">Filters</span>
            <button onClick={handleResetFilters} className="text-xs font-bold text-[#2874F0] hover:underline">
              Clear All
            </button>
          </div>

          {/* Sort By Section */}
          <div className="mb-6">
            <span className="font-bold text-[10px] uppercase text-slate-400 tracking-wider block mb-2.5">Sort Results</span>
            <div className="flex flex-col gap-2">
              {[
                { id: 'relevance', name: 'Relevance' },
                { id: 'price-low', name: 'Price: Low to High' },
                { id: 'price-high', name: 'Price: High to Low' },
                { id: 'rating', name: 'Popularity (Rating)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`text-xs text-left font-bold py-1.5 transition-all ${
                    sortBy === opt.id ? 'text-[#2874F0] font-extrabold pl-1.5 border-l-2 border-[#2874F0]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6">
            <span className="font-bold text-[10px] uppercase text-slate-400 tracking-wider block mb-2">Price Limit</span>
            <input
              type="range"
              min={0}
              max={150000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2874F0] mb-2.5"
            />
            <div className="flex justify-between text-[11px] font-bold text-[#64748B]">
              <span>Min: ₹0</span>
              <span>Max: ₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="mb-6">
            <span className="font-bold text-[10px] uppercase text-slate-400 tracking-wider block mb-2.5">Brand</span>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto no-scrollbar">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    className="rounded border-gray-300 text-[#2874F0] focus:ring-[#2874F0]"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Customer Ratings Filter */}
          <div className="mb-2">
            <span className="font-bold text-[10px] uppercase text-slate-400 tracking-wider block mb-2.5">Customer Rating</span>
            <div className="flex flex-col gap-2">
              {[4, 3, 2].map(star => (
                <button
                  key={star}
                  onClick={() => setMinRating(minRating === star ? null : star)}
                  className={`flex items-center gap-1.5 text-xs text-left font-bold py-1 transition-all ${
                    minRating === star ? 'text-[#2874F0] font-extrabold pl-1.5 border-l-2 border-[#2874F0]' : 'text-slate-600'
                  }`}
                >
                  <span>{star}★ & above</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Search Results Display */}
        <main className="flex-1">
          <div className={`p-4 border rounded mb-5 flex justify-between items-center ${
            isServices ? 'bg-services-card border-services-border' : 'bg-white border-fk-border shadow-fk'
          }`}>
            <span className="text-xs font-bold text-[#64748B]">
              Showing <strong className={isServices ? 'text-white' : 'text-[#172337]'}>{searchedProducts.length}</strong> results for "{searchQuery || 'All items'}"
            </span>
          </div>

          {searchedProducts.length === 0 ? (
            <div className="w-full py-16 bg-white border border-fk-border rounded flex flex-col items-center justify-center text-center p-6 shadow-sm">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="text-base font-bold text-gray-900 mb-1">No products found</h3>
              <p className="text-xs text-gray-500 max-w-sm mb-4">Try checking your spelling or use more general terms</p>
              <button
                onClick={() => { setSearchQuery(''); handleResetFilters(); }}
                className="px-4 py-2 bg-[#2874F0] text-white rounded text-xs font-bold shadow-sm"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 select-none">
              {searchedProducts.map(product => {
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                const isWishlisted = wishlist[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => navigateTo('detail', product.id)}
                    className={`border rounded p-4 flex flex-col hover:shadow-fkCardHover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group h-full relative ${
                      isServices ? 'bg-services-card border-services-border' : 'bg-white border-fk-border'
                    }`}
                  >
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-gray-400 hover:text-[#E53935] shadow-xs border border-fk-border transition-colors z-10"
                    >
                      <Heart size={12} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                    </button>

                    {product.isAssured && (
                      <img
                        src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                        alt="Assured"
                        className="h-3.5 object-contain absolute bottom-3.5 left-3.5 z-10"
                      />
                    )}
                    <div className="w-full aspect-square flex items-center justify-center mb-4 bg-slate-50 rounded p-2 overflow-hidden">
                      <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xs font-bold text-[#172337] line-clamp-2 leading-relaxed mb-1.5 min-h-[36px] group-hover:text-[#2874F0] transition-colors dark:group-hover:text-services-gold dark:text-services-text">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2.5 mt-auto leading-none">
                      <div className="flex items-center gap-0.5 bg-[#16A34A] text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                        <span>{product.rating}</span>
                        <Star size={8} className="fill-white text-white" />
                      </div>
                      <span className="text-[10px] text-[#64748B] font-semibold">({product.ratingCount.toLocaleString('en-IN')})</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <span className="text-sm font-extrabold text-[#172337] dark:text-white">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-xs text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] font-bold text-[#FF6B00]">{discount}% Off</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    );
  };

  // Mobile search page layout
  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col gap-2.5 p-3 bg-slate-50 min-h-screen text-left pb-20 select-none">
        {/* Mobile Input Search Bar */}
        <div className="flex gap-2 bg-white p-2.5 rounded-md shadow-sm items-center border border-fk-border">
          <Search size={15} className="text-slate-400 ml-1.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent focus:outline-none text-xs font-semibold text-gray-800"
          />
        </div>

        {/* Sort & Filter controls strip */}
        <div className="grid grid-cols-2 gap-2 mt-1 bg-white p-2 rounded-md shadow-sm border border-fk-border">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center justify-center gap-2 text-xs font-bold text-slate-650 border-r border-gray-100 py-1"
          >
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button
            onClick={() => {
              // Toggle sorting on mobile
              setSortBy(prev => prev === 'price-low' ? 'price-high' : 'price-low');
            }}
            className="flex items-center justify-center gap-2 text-xs font-bold text-slate-650 py-1"
          >
            <ArrowUpDown size={14} />
            <span>Sort Price</span>
          </button>
        </div>

        {searchedProducts.length === 0 ? (
          <div className="w-full py-16 bg-white border border-fk-border rounded-lg flex flex-col items-center justify-center text-center p-6 shadow-sm mt-3">
            <span className="text-3xl mb-4">🔍</span>
            <h3 className="text-sm font-bold text-gray-900 mb-1">No matches found</h3>
            <button
              onClick={() => { setSearchQuery(''); handleResetFilters(); }}
              className="px-4 py-2 bg-[#2874F0] text-white rounded text-[10px] font-bold shadow-sm mt-2"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {searchedProducts.map(product => {
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
                    <Heart size={10} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                  </button>

                  {product.isAssured && (
                    <img
                      src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                      alt="Assured"
                      className="h-2.5 object-contain absolute top-2.5 left-2.5 z-10"
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
                    <span className="text-[8px] text-[#64748B] font-bold">({product.ratingCount.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 leading-none">
                    <span className="text-[11px] font-extrabold text-[#172337]">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-[8px] text-[#64748B] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="text-[8px] font-bold text-[#FF6B00]">{discount}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Filter Drawer Sheet */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
            <div className="absolute inset-0" onClick={() => setMobileFilterOpen(false)} />
            <div className="w-full bg-white rounded-t-xl max-w-md p-5 pb-8 z-50 text-left shadow-lg text-gray-800">
              <div className="flex justify-between items-center border-b border-fk-border pb-3 mb-4">
                <span className="font-extrabold text-sm text-[#172337]">Filter & Sort Option</span>
                <button onClick={() => setMobileFilterOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold p-1">
                  ✕
                </button>
              </div>

              {/* Brands selection */}
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Select Brand</span>
              <div className="flex flex-wrap gap-2 mb-4">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                      selectedBrand === brand
                        ? 'bg-[#2874F0] text-white border-[#2874F0]'
                        : 'bg-slate-50 text-slate-600 border-fk-border'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>

              {/* Ratings selection */}
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Customer Rating</span>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[4, 3, 2].map(star => (
                  <button
                    key={star}
                    onClick={() => setMinRating(minRating === star ? null : star)}
                    className={`py-2 text-center text-[10px] font-bold border rounded transition-all ${
                      minRating === star
                        ? 'border-[#2874F0] bg-blue-50 text-[#2874F0]'
                        : 'border-fk-border bg-slate-50 text-slate-655'
                    }`}
                  >
                    {star}★ & above
                  </button>
                ))}
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#2874F0] hover:bg-[#1557D6] text-white font-extrabold text-xs rounded-lg uppercase tracking-wider shadow"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};
