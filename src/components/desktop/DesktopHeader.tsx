import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Search, ShoppingCart, ChevronDown, User, Package, LogOut, Briefcase, MapPin, Sparkles, Zap, ShoppingBag, Mic, Camera, Wrench } from 'lucide-react';
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
  const [logoLoaded, setLogoLoaded] = useState(true);
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

  // Update autocomplete suggestions
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

  // Design System vertical themes mapping (Apple / Linear style)
  const verticalThemes = {
    shop: {
      headerBg: 'bg-white/95 backdrop-blur-md border-b border-brand-border',
      textColor: 'text-brand-graphite',
      subTextColor: 'text-brand-slate',
      inputFocus: 'focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/10',
      buttonBg: 'bg-brand-blue text-white hover:bg-blue-600',
      badgeColor: 'bg-brand-blue/10 text-brand-blue'
    },
    quick: {
      headerBg: 'bg-white/95 backdrop-blur-md border-b border-brand-border',
      textColor: 'text-brand-graphite',
      subTextColor: 'text-brand-slate',
      inputFocus: 'focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/10',
      buttonBg: 'bg-brand-green text-white hover:bg-emerald-650',
      badgeColor: 'bg-brand-green/10 text-brand-green'
    },
    services: {
      headerBg: 'bg-brand-graphite/95 backdrop-blur-md border-b border-zinc-800',
      textColor: 'text-white',
      subTextColor: 'text-zinc-400',
      inputFocus: 'focus-within:border-services-gold focus-within:ring-2 focus-within:ring-services-gold/15',
      buttonBg: 'bg-services-gold text-brand-graphite hover:bg-services-gold/90',
      badgeColor: 'bg-services-gold/15 text-services-gold'
    }
  };

  const theme = verticalThemes[currentVertical];
  const isDark = currentVertical === 'services';

  return (
    <header className={`w-full flex flex-col sticky top-0 z-50 shadow-soft select-none theme-transition transition-all duration-300 ${
      isDark
        ? 'bg-zinc-950 text-white'
        : currentVertical === 'quick'
          ? 'bg-gradient-to-b from-orange-200/70 via-orange-50/20 to-[#FAF9F6] text-brand-graphite border-b border-brand-border/60'
          : 'bg-gradient-to-b from-zinc-300 via-zinc-200/50 to-[#FAF9F6] text-brand-graphite border-b border-brand-border/60'
    }`}>
      {/* Top Vertical Selector Bar (Redesigned with Premium Segmented control matching reference, no status dots) */}
      <div className={`w-full border-b flex justify-between items-center px-12 py-2.5 transition-colors duration-300 select-none ${
        isDark ? 'bg-transparent border-zinc-900/60 text-zinc-400' : 'bg-transparent border-brand-border/20 text-brand-slate'
      }`}>
        <div className={`flex gap-1 items-center p-0.5 rounded-card border relative transition-all ${
          isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white/80 border-brand-border/60 backdrop-blur-md'
        }`}>
          {(['shop', 'quick', 'services'] as const).map(v => {
            const isActive = currentVertical === v;
            const config = {
              shop: { 
                title: 'Shop', 
                subtitle: 'Everything you need', 
                icon: ShoppingBag,
                activeColor: 'text-white',
                inactiveColor: 'text-brand-slate hover:text-brand-graphite',
                iconInactive: 'text-brand-blue bg-blue-50/70'
              },
              quick: { 
                title: '10 Min', 
                subtitle: 'Instant delivery', 
                icon: Zap,
                activeColor: 'text-white',
                inactiveColor: 'text-brand-slate hover:text-brand-graphite',
                iconInactive: 'text-brand-orange bg-orange-50/70'
              },
              services: { 
                title: 'Services', 
                subtitle: 'Home & more', 
                icon: Wrench,
                activeColor: isDark ? 'text-zinc-950 font-black' : 'text-white',
                inactiveColor: 'text-brand-slate hover:text-brand-graphite dark:text-zinc-400',
                iconInactive: 'text-teal-650 bg-teal-50/70 dark:bg-zinc-800 dark:text-teal-400'
              }
            };
            const item = config[v];
            const Icon = item.icon;

            return (
              <button
                key={v}
                onClick={() => setCurrentVertical(v)}
                className={`flex items-center gap-3 px-4 py-1.5 rounded-[12px] relative w-44 h-11 transition-all duration-300 focus:outline-none z-10 ${
                  isActive ? item.activeColor : item.inactiveColor
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDesktopVerticalSegmentPill"
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.22 }}
                    className={`absolute inset-0 rounded-[12px] shadow-soft z-[-1] ${
                      isDark
                        ? 'bg-services-gold'
                        : 'bg-[#1C1C1E]'
                    }`}
                  />
                )}
                
                {/* Visual circle icon badge */}
                <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isActive ? 'bg-white/15 text-white' : item.iconInactive
                }`}>
                  <Icon size={10} strokeWidth={2.5} />
                </div>

                <div className="flex flex-col leading-none text-left">
                  <span className="text-[10px] font-black tracking-wide">
                    {item.title}
                  </span>
                  <span className={`text-[7px] mt-0.5 whitespace-nowrap leading-none ${isActive ? 'opacity-85' : 'opacity-70'}`}>
                    {item.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <MapPin size={13} className={isDark ? 'text-services-gold' : 'text-brand-blue'} />
          <span>Delivering to: <strong className={isDark ? 'text-white' : 'text-brand-graphite'}>{location}</strong></span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className={`w-full flex items-center justify-between px-12 py-3.5 transition-colors duration-300 bg-transparent ${theme.textColor}`}>
        <div className="flex items-center gap-10 w-full max-w-5xl">
          {/* Logo Container */}
          <div onClick={() => navigateTo('home')} className="flex flex-col cursor-pointer shrink-0">
            {logoLoaded ? (
              <img
                src="/logo.png"
                alt="ShopIndia"
                className="h-6 object-contain"
                onError={() => setLogoLoaded(false)}
              />
            ) : (
              <span className={`text-xl font-extrabold tracking-tight italic flex items-center gap-1 ${isDark ? 'text-white' : 'text-brand-graphite'}`}>
                ShopIndia
                {currentVertical === 'quick' && <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green not-italic">10M</span>}
                {currentVertical === 'services' && <span className="text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded bg-services-gold/15 text-services-gold not-italic">PRO</span>}
              </span>
            )}
            {currentVertical === 'shop' && (
              <span className="text-[8px] tracking-wider uppercase font-black text-brand-orange hover:underline flex items-center gap-0.5 leading-none mt-0.5">
                Explore <span className="text-brand-blue">Plus</span>
                <Sparkles size={8} className="fill-brand-blue text-brand-blue animate-pulse" />
              </span>
            )}
          </div>

          {/* Design System Search bar */}
          <div ref={suggestionRef} className="relative w-full max-w-xl">
            <div className={`flex w-full rounded-input overflow-hidden items-center border transition-all duration-300 ${
              isDark ? 'bg-zinc-800 text-white border-transparent' : 'bg-white/80 border-brand-border/40 text-brand-graphite backdrop-blur-md'
            } ${theme.inputFocus}`}>
              <button
                onClick={() => handleSearchSubmit(searchQuery)}
                className="p-3.5 flex items-center justify-center text-brand-slate hover:text-brand-blue transition-colors"
              >
                <Search size={15} strokeWidth={2.5} />
              </button>
              <input
                type="text"
                placeholder={
                  currentVertical === 'quick'
                    ? "Search for milk, bananas, fresh bread, snacks..."
                    : currentVertical === 'services'
                    ? "Search for AC repair, deep cleaning, massage..."
                    : "Search for products, brands and tech catalog..."
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
                className={`w-full py-2.5 text-xs bg-transparent focus:outline-none placeholder-brand-slate font-medium ${
                  isDark ? 'text-white' : 'text-brand-graphite'
                }`}
              />
              <div className="flex items-center gap-3 px-4 border-l border-brand-border/20 text-brand-slate shrink-0">
                <button className="hover:text-brand-blue hover:scale-110 active:scale-95 transition-all p-0.5" title="Voice Search">
                  <Mic size={14} />
                </button>
                <button className="hover:text-brand-blue hover:scale-110 active:scale-95 transition-all p-0.5" title="Search by Image">
                  <Camera size={14} />
                </button>
              </div>
            </div>

            {/* Auto-suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-brand-border rounded-card shadow-elevated overflow-hidden text-brand-graphite z-50">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSearchSubmit(item)}
                    className="flex items-center gap-3.5 px-5 py-3 text-xs hover:bg-slate-50 cursor-pointer font-bold border-b border-brand-border last:border-0 transition-colors"
                  >
                    <Search size={13} className="text-brand-slate" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Menu Controls */}
        <div className="flex items-center gap-8 shrink-0 text-xs font-bold">
          {/* Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <button
              onClick={() => navigateTo('profile')}
              className={`flex items-center gap-2 py-2 px-4 rounded-button transition-all border border-brand-border/10 shadow-soft font-extrabold ${theme.buttonBg}`}
            >
              <User size={15} />
              <span>Sign In</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 top-full pt-2.5 w-60 z-50">
                <div className="bg-white text-brand-graphite border border-brand-border rounded-card shadow-elevated overflow-hidden flex flex-col font-bold text-xs">
                  <div className="p-4 border-b border-brand-border bg-slate-50/50 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-black">U</div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-extrabold text-brand-graphite">User Guest</span>
                      <span className="text-[10px] text-brand-slate font-medium">guest@shopindia.com</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { navigateTo('profile'); setShowProfileDropdown(false); }}
                    className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    <User size={15} className="text-brand-slate" /> My Profile
                  </button>
                  <button
                    onClick={() => { navigateTo('orders'); setShowProfileDropdown(false); }}
                    className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    <Package size={15} className="text-brand-slate" /> Orders & Tracking
                  </button>
                  <button
                    onClick={() => { navigateTo('cart'); setShowProfileDropdown(false); }}
                    className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-slate-50 transition-colors text-left border-b border-brand-border"
                  >
                    <ShoppingCart size={15} className="text-brand-slate" /> Active Cart
                  </button>
                  <button
                    onClick={() => setShowProfileDropdown(false)}
                    className="flex items-center gap-3.5 px-4.5 py-3 hover:bg-red-50 text-brand-red transition-colors text-left font-black"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('orders')}
            className={`transition-colors flex items-center gap-2 hover:text-[#0066FF] ${
              isDark ? 'hover:text-services-gold text-zinc-350' : 'text-brand-slate hover:text-brand-graphite'
            }`}
          >
            <Briefcase size={15} />
            <span>Orders</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => navigateTo('cart')}
            className={`relative flex items-center gap-2 hover:opacity-85 transition-opacity ${
              isDark ? 'text-zinc-350 hover:text-white' : 'text-brand-slate hover:text-brand-graphite'
            }`}
          >
            <div className="relative">
              <ShoppingCart size={16} strokeWidth={2.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[8.5px] font-black text-white">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="text-[11px] font-black text-brand-graphite dark:text-white hidden lg:inline font-numbers">
                (₹{getCartTotal().toLocaleString('en-IN')})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Categories Sub-Header Bar (Only for E-Commerce & Grocery on Home Page) */}
      {currentVertical !== 'services' && (
        <div className="w-full bg-white/85 backdrop-blur-md border-b border-brand-border py-4 shadow-soft flex justify-center items-center gap-12 overflow-x-auto text-brand-graphite scrollbar-none no-scrollbar select-none transition-all">
          {CATEGORIES.filter(cat => cat.vertical === currentVertical).map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setSearchQuery(cat.name);
                navigateTo('search');
              }}
              className="flex flex-col items-center cursor-pointer group text-center shrink-0 px-2 py-1 rounded-card hover:bg-slate-50/40 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2 flex items-center justify-center bg-white border border-brand-border/80 shadow-soft group-hover:scale-[1.04] group-hover:shadow-premium group-hover:border-brand-blue/30 transition-all duration-300">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
              </div>
              <span className="text-[9.5px] font-semibold text-brand-slate group-hover:text-brand-blue transition-colors duration-300 whitespace-nowrap tracking-wide mt-0.5 font-heading">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
