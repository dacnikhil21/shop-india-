import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Search, ShoppingCart, ChevronDown, User, Package, LogOut, Briefcase, MapPin, Sparkles, Zap, ShoppingBag, Mic, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export const DesktopHeader: React.FC = () => {
  const {
    currentVertical,
    setCurrentVertical,
    cart,
    navigateTo,
    location,
    searchQuery,
    setSearchQuery,
    getCartTotal
  } = useApp();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Handle outside click for search suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update autocomplete suggestions based on search query and current vertical
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = PRODUCTS
      .filter(p => p.vertical === currentVertical &&
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .map(p => p.title)
      .slice(0, 5);

    setSuggestions(filtered);
  }, [searchQuery, currentVertical]);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    navigateTo('search');
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Vertical themes mapping
  const verticalThemes = {
    shop: {
      headerBg: 'bg-fk-blue',
      textColor: 'text-white',
      inputFocus: 'focus-within:border-fk-blue focus-within:ring-fk-blue/20',
      buttonBg: 'bg-white text-fk-blue hover:bg-gray-100',
    },
    quick: {
      headerBg: 'bg-quick-green',
      textColor: 'text-white',
      inputFocus: 'focus-within:border-quick-green focus-within:ring-quick-green/20',
      buttonBg: 'bg-white text-quick-green hover:bg-gray-100',
    },
    services: {
      headerBg: 'bg-services-bg border-b border-services-border',
      textColor: 'text-services-text',
      inputFocus: 'focus-within:border-services-gold focus-within:ring-services-gold/20',
      buttonBg: 'bg-services-gold text-services-bg hover:bg-services-gold/90',
    }
  };

  const theme = verticalThemes[currentVertical];

  return (
    <header className="w-full flex flex-col sticky top-0 z-50 shadow-fk select-none">
      {/* Top Vertical Selector Bar */}
      <div className={`w-full text-xs font-semibold border-b flex justify-between items-center px-12 py-1.5 transition-colors duration-300 ${
        currentVertical === 'services'
          ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
          : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <div className="flex gap-2 items-center bg-gray-100/80 dark:bg-zinc-950 p-0.5 rounded-full relative">
          {(['shop', 'quick', 'services'] as const).map(v => {
            const isActive = currentVertical === v;
            const config = {
              shop: { text: 'Shop E-Commerce', icon: ShoppingBag, color: 'text-fk-blue' },
              quick: { text: '10 Min Delivery', icon: Zap, color: 'text-quick-green' },
              services: { text: 'Home Services', icon: Sparkles, color: 'text-services-gold' }
            };
            const item = config[v];
            const Icon = item.icon;

            return (
              <button
                key={v}
                onClick={() => setCurrentVertical(v)}
                className={`flex items-center gap-1.5 py-1 px-4 rounded-full text-[11px] font-bold relative transition-colors duration-300 z-10 ${
                  isActive ? item.color : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeVerticalPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-full shadow-sm z-[-1]"
                  />
                )}
                <Icon size={12} />
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <MapPin size={12} className={currentVertical === 'services' ? 'text-services-gold' : 'text-fk-blue'} />
          <span>Delivering to: <strong className={currentVertical === 'services' ? 'text-services-text' : 'text-gray-800'}>{location}</strong></span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className={`w-full flex items-center justify-between px-12 py-3.5 transition-colors duration-300 ${theme.headerBg} ${theme.textColor}`}>
        <div className="flex items-center gap-8 w-full max-w-5xl">
          {/* Logo */}
          <div onClick={() => navigateTo('home')} className="flex flex-col cursor-pointer shrink-0">
            <span className="text-xl font-bold tracking-tight italic flex items-center gap-1 text-white">
              ShopIndia
              {currentVertical === 'quick' && <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white text-quick-green not-italic">10 Min</span>}
              {currentVertical === 'services' && <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-services-gold text-services-bg not-italic">Services</span>}
            </span>
            {currentVertical === 'shop' && (
              <span className="text-[9px] italic text-fk-yellow hover:underline flex items-center gap-0.5 leading-none">
                Explore <span className="font-bold text-white">Plus</span>
                <Sparkles size={8} className="fill-fk-yellow text-fk-yellow" />
              </span>
            )}
          </div>

          {/* Redesigned Search bar */}
          <div ref={suggestionRef} className="relative w-full max-w-xl">
            <div className={`flex w-full bg-white rounded-md shadow-sm overflow-hidden text-gray-800 items-center border border-gray-250 transition-all duration-300 focus-within:shadow-md focus-within:ring-2 focus-within:ring-fk-blue/20 ${theme.inputFocus}`}>
              <button
                onClick={() => handleSearchSubmit(searchQuery)}
                className={`p-2.5 flex items-center justify-center text-gray-400 hover:text-fk-blue transition-colors`}
              >
                <Search size={18} strokeWidth={2.5} />
              </button>
              <input
                type="text"
                placeholder={
                  currentVertical === 'quick'
                    ? "Search for milk, bananas, chips, snacks..."
                    : currentVertical === 'services'
                    ? "Search for AC repair, deep cleaning, salon..."
                    : "Search for products, brands and more"
                }
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit(searchQuery);
                }}
                className="w-full py-2.5 text-xs text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-semibold"
              />
              <div className="flex items-center gap-2 px-3 border-l border-gray-200 text-gray-400 shrink-0">
                <button className="hover:text-fk-blue hover:scale-105 transition-all p-1" title="Voice Search">
                  <Mic size={15} />
                </button>
                <button className="hover:text-fk-blue hover:scale-105 transition-all p-1" title="Search by Image">
                  <Camera size={15} />
                </button>
              </div>
            </div>


            {/* Auto-suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg overflow-hidden text-gray-800 z-50">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSearchSubmit(item)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 cursor-pointer font-medium border-b border-gray-100 last:border-0"
                  >
                    <Search size={14} className="text-gray-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Menu Controls */}
        <div className="flex items-center gap-7 shrink-0 text-sm font-semibold">
          {/* Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <button
              onClick={() => navigateTo('profile')}
              className={`flex items-center gap-1.5 py-1 px-4 rounded ${theme.buttonBg} transition-all border border-transparent shadow-sm`}
            >
              <User size={16} />
              <span>Sign In</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 top-full pt-2 w-56 z-50">
                <div className="bg-white text-gray-800 border border-gray-100 rounded shadow-md3_3 overflow-hidden flex flex-col font-medium text-sm">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-fk-blue/10 flex items-center justify-center text-fk-blue font-bold">U</div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold text-gray-900">User Guest</span>
                      <span className="text-[10px] text-gray-500">guest@shopindia.com</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { navigateTo('profile'); setShowProfileDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <User size={16} className="text-gray-500" /> My Profile
                  </button>
                  <button
                    onClick={() => { navigateTo('orders'); setShowProfileDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Package size={16} className="text-gray-500" /> Orders & Tracking
                  </button>
                  <button
                    onClick={() => { navigateTo('cart'); setShowProfileDropdown(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-100"
                  >
                    <ShoppingCart size={16} className="text-gray-500" /> Active Cart
                  </button>
                  <button
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors text-left"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('orders')}
            className={`hover:text-fk-yellow transition-colors flex items-center gap-1.5 ${
              currentVertical === 'services' ? 'hover:text-services-gold text-services-text' : 'text-white'
            }`}
          >
            <Briefcase size={16} />
            <span>Orders</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => navigateTo('cart')}
            className={`relative flex items-center gap-2 hover:opacity-90 transition-opacity ${
              currentVertical === 'services' ? 'text-services-text' : 'text-white'
            }`}
          >
            <div className="relative">
              <ShoppingCart size={18} strokeWidth={2.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-fk-orange px-1 text-[9px] font-extrabold text-white">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="text-[12px] font-semibold opacity-90 hidden lg:inline">
                (₹{getCartTotal().toLocaleString('en-IN')})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories Sub-Header Bar (Only for E-Commerce & Grocery on Home Page) */}
      {currentVertical !== 'services' && (
        <div className="w-full bg-white border-b border-fk-border py-2.5 shadow-sm flex justify-center items-center gap-9 overflow-x-auto text-gray-800 scrollbar-none no-scrollbar">
          {CATEGORIES.filter(cat => cat.vertical === currentVertical).map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSearchQuery(cat.name);
                navigateTo('search');
              }}
              className="flex flex-col items-center cursor-pointer group text-center shrink-0"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mb-1 flex items-center justify-center bg-slate-50 border border-fk-border group-hover:scale-105 group-hover:shadow-md group-hover:border-fk-blue/30 transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[11px] font-bold text-gray-700 group-hover:text-fk-blue transition-colors duration-300 whitespace-nowrap tracking-wide mt-1">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
