import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { VerticalShopMobile } from './VerticalShopMobile';
import { VerticalQuickCommerceMobile } from './VerticalQuickCommerceMobile';
import { VerticalServicesMobile } from './VerticalServicesMobile';
import { SearchPage } from '../../pages/Search';
import { ProductDetailPage } from '../../pages/ProductDetail';
import { CartPage } from '../../pages/Cart';
import { OrdersPage } from '../../pages/Orders';
import { ProfilePage } from '../../pages/Profile';
import { Home, Grid, ShoppingCart, Package, User, MapPin, X, Search, ChevronDown, ShoppingBag, Zap, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileApp: React.FC = () => {
  const {
    currentVertical,
    setCurrentVertical,
    currentPath,
    navigateTo,
    location,
    setLocation,
    cart,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [inputLocation, setInputLocation] = useState(location);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentPath !== 'home') {
            setShowHeader(true);
            ticking = false;
            return;
          }
          if (currentScrollY > 80) {
            if (currentScrollY > lastScrollY.current) {
              setShowHeader(false); // Scrolling down, collapse
            } else {
              setShowHeader(true); // Scrolling up, reveal
            }
          } else {
            setShowHeader(true); // Near top, reveal
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputLocation.trim()) {
      setLocation(inputLocation);
      setShowLocationModal(false);
    }
  };

  const renderActiveScreen = () => {
    switch (currentPath) {
      case 'home':
        if (currentVertical === 'quick') return <VerticalQuickCommerceMobile />;
        if (currentVertical === 'services') return <VerticalServicesMobile />;
        return <VerticalShopMobile />;
      case 'search':
        return <SearchPage />;
      case 'detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'orders':
        return <OrdersPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <VerticalShopMobile />;
    }
  };

  const getActiveTab = () => {
    if (currentPath === 'home') return 'home';
    if (currentPath === 'cart') return 'cart';
    if (currentPath === 'orders') return 'orders';
    if (currentPath === 'profile') return 'profile';
    return '';
  };

  const activeTab = getActiveTab();
  const isServices = currentVertical === 'services';

  return (
    <div className={`min-h-screen pb-16 flex flex-col w-full relative transition-colors duration-300 ${
      isServices ? 'bg-brand-graphite text-white font-sans' : 'bg-brand-bg text-brand-graphite font-sans'
    }`}>
      {/* Top Segmented Selector Bar (Dynamic collapsible header matching Flipkart layout with cinematic gradient) */}
      <div className={`w-full px-4 sticky top-0 z-40 transition-all duration-300 flex flex-col ${
        showHeader ? 'py-3.5 gap-2.5 shadow-none' : 'py-2 gap-0 shadow-soft'
      } ${
        isServices
          ? showHeader
            ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent border-b border-transparent'
            : 'bg-zinc-900 border-b border-zinc-800 text-white'
          : currentVertical === 'quick'
            ? showHeader
              ? 'bg-gradient-to-b from-orange-200/70 via-orange-50/20 to-[#FAF9F6] border-b border-transparent text-brand-graphite'
              : 'bg-[#FAF9F6] border-b border-brand-border/60 text-brand-graphite'
            : showHeader
              ? 'bg-gradient-to-b from-zinc-300 via-zinc-200/50 to-[#FAF9F6] border-b border-transparent text-brand-graphite'
              : 'bg-[#FAF9F6] border-b border-brand-border/60 text-brand-graphite'
      }`}>
        
        {/* Row 1: Switcher Cards (Collapsible) */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showHeader ? 'max-h-[78px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="grid grid-cols-3 gap-2.5 w-full select-none">
            {(['shop', 'quick', 'services'] as const).map(v => {
              const isActive = currentVertical === v;
              const config = {
                shop: { 
                  title: 'Shop', 
                  icon: ShoppingBag,
                  activeClass: isServices ? 'bg-[#C5A880] text-zinc-950 border-transparent shadow-elevated' : 'bg-[#1C1C1E] text-white border-transparent shadow-elevated',
                  inactiveClass: isServices ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-brand-border text-brand-graphite',
                  iconActive: 'text-white',
                  iconInactive: 'text-brand-blue'
                },
                quick: { 
                  title: '10 Min', 
                  icon: Zap,
                  activeClass: 'bg-[#FF6600] text-white border-transparent shadow-elevated',
                  inactiveClass: isServices ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-brand-border text-brand-graphite',
                  iconActive: 'text-white',
                  iconInactive: 'text-brand-orange'
                },
                services: { 
                  title: 'Services', 
                  icon: Wrench,
                  activeClass: 'bg-[#C5A880] text-zinc-950 border-transparent shadow-elevated',
                  inactiveClass: isServices ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-brand-border text-brand-graphite',
                  iconActive: 'text-zinc-950',
                  iconInactive: 'text-teal-655'
                }
              };
              const item = config[v];
              const Icon = item.icon;

              return (
                <button
                  key={v}
                  onClick={() => setCurrentVertical(v)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-card border text-center relative h-[62px] transition-all duration-300 active:scale-95 focus:outline-none ${
                    isActive ? item.activeClass : item.inactiveClass
                  }`}
                >
                  <Icon size={14} className={`mb-1 transition-all ${isActive ? item.iconActive : item.iconInactive}`} strokeWidth={2.5} />
                  <span className="text-[10px] font-black tracking-wide leading-none">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Location indicator row (Collapsible capsule) */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showHeader ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div 
            onClick={() => { setInputLocation(location); setShowLocationModal(true); }}
            className="flex justify-between items-center py-1.5 px-3.5 rounded-full text-left bg-slate-100/50 dark:bg-zinc-800/40 select-none cursor-pointer border border-brand-border/40 hover:bg-slate-100 transition-colors"
          >
            <div className="flex gap-2.5 items-center">
              <MapPin size={12} className={isServices ? 'text-services-gold' : 'text-brand-blue'} />
              <span className={`text-[9.5px] font-semibold max-w-[210px] truncate ${isServices ? 'text-white' : 'text-brand-slate'}`}>
                {location}
              </span>
            </div>
            <ChevronDown size={11} className={isServices ? 'text-services-gold' : 'text-brand-slate'} />
          </div>
        </div>

        {/* Row 3: Search Bar Trigger (STICKY below the Switcher Capsule) */}
        <div className="w-full shrink-0 select-none">
          <div
            onClick={() => { setSearchQuery(''); navigateTo('search'); }}
            className="w-full bg-white border border-brand-border rounded-input py-2.5 px-4 flex items-center justify-between shadow-soft text-brand-slate text-xs font-medium cursor-pointer transition-all active:scale-[0.99] hover:border-zinc-300 leading-none shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <Search size={14} className="text-brand-slate" />
              <span className="text-zinc-500 font-sans text-[11px] font-medium truncate max-w-[170px] sm:max-w-xs">
                Search products, brands and catalog...
              </span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 select-none shrink-0">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8" />
              </svg>
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Router */}
      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPath}-${currentVertical}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Native-style Mobile Bottom Navigation Tab Bar (Rounded 24px) */}
      <nav className={`fixed bottom-0 left-0 right-0 h-15 border-t z-45 grid grid-cols-5 items-center select-none shadow-elevated rounded-t-bottom-nav transition-colors duration-300 px-2 ${
        isServices ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-brand-border text-brand-slate'
      }`}>
        {[
          { id: 'home', label: 'Home', icon: Home, action: () => navigateTo('home') },
          { id: 'search', label: 'Search', icon: Grid, action: () => { setSearchQuery(''); navigateTo('search'); } },
          { id: 'cart', label: 'Cart', icon: ShoppingCart, action: () => navigateTo('cart'), badge: true },
          { id: 'orders', label: 'Orders', icon: Package, action: () => navigateTo('orders') },
          { id: 'profile', label: 'Profile', icon: User, action: () => navigateTo('profile') }
        ].map(tab => {
          const isActive = activeTab === tab.id || (tab.id === 'search' && currentPath === 'search' && !searchQuery);
          const Icon = tab.icon;
          const activeColor = isServices ? 'text-services-gold' : 'text-brand-blue';

          return (
            <motion.button
              key={tab.id}
              onClick={tab.action}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center gap-0.5 h-full relative transition-colors py-1 rounded-[12px] ${
                isActive ? `${activeColor} font-semibold` : 'text-brand-slate'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMobileBottomTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className={`absolute inset-0 w-[65px] h-[38px] m-auto z-[-1] rounded-[10px] ${
                    isServices ? 'bg-services-gold/10' : 'bg-brand-blue/5'
                  }`}
                />
              )}
              <div className="relative">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {tab.badge && cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-brand-orange px-1 text-[8px] font-black text-white font-numbers">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] tracking-wide mt-0.5">{tab.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Hamburger Drawer Modal Sidebar */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-brand-graphite/40 z-50 backdrop-blur-xs"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-72 bg-white text-brand-graphite shadow-elevated z-50 flex flex-col select-none border-r border-brand-border"
            >
              {/* Profile header of drawer */}
              <div className="bg-brand-graphite text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-extrabold text-sm border border-white/10">
                    G
                  </div>
                  <div className="flex flex-col leading-tight text-left">
                    <span className="font-extrabold text-sm">Guest Account</span>
                    <span className="text-[10px] text-zinc-400 font-semibold">guest@shopindia.com</span>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-zinc-400 hover:text-white p-1 rounded-full">
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-5 flex flex-col font-bold text-xs">
                <span className="px-5 text-[9px] text-brand-slate uppercase tracking-widest block mb-2">Business Verticals</span>
                <button
                  onClick={() => { setCurrentVertical('shop'); setDrawerOpen(false); }}
                  className={`flex items-center gap-3 px-5 py-3 text-left border-l-4 ${currentVertical === 'shop' ? 'border-brand-blue bg-blue-50/30 text-brand-blue' : 'border-transparent text-brand-graphite'}`}
                >
                  Shop (E-commerce)
                </button>
                <button
                  onClick={() => { setCurrentVertical('quick'); setDrawerOpen(false); }}
                  className={`flex items-center gap-3 px-5 py-3 text-left border-l-4 ${currentVertical === 'quick' ? 'border-brand-green bg-green-50/30 text-brand-green' : 'border-transparent text-brand-graphite'}`}
                >
                  10 Min Delivery (Groceries)
                </button>
                <button
                  onClick={() => { setCurrentVertical('services'); setDrawerOpen(false); }}
                  className={`flex items-center gap-3 px-5 py-3 text-left border-l-4 ${currentVertical === 'services' ? 'border-services-gold bg-amber-50/20 text-services-gold' : 'border-transparent text-brand-graphite'}`}
                >
                  Home Services
                </button>

                <div className="border-t border-brand-border my-4" />

                <span className="px-5 text-[9px] text-brand-slate uppercase tracking-widest block mb-2">Quick Links</span>
                <button
                  onClick={() => { navigateTo('profile'); setDrawerOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left text-brand-graphite"
                >
                  My Profile Settings
                </button>
                <button
                  onClick={() => { navigateTo('orders'); setDrawerOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left text-brand-graphite"
                >
                  Orders History
                </button>
                <button
                  onClick={() => { navigateTo('cart'); setDrawerOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left text-brand-graphite"
                >
                  Active Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Address Picker Bottom Drawer Sheet */}
      <AnimatePresence>
        {showLocationModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center select-none backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => setShowLocationModal(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`w-full rounded-t-bottom-nav p-5 pb-8 text-left z-50 shadow-elevated border-t ${
                isServices ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-brand-border text-brand-graphite'
              }`}
            >
              <div className="flex justify-between items-center border-b border-brand-border pb-3 mb-4 leading-none">
                <span className="font-extrabold text-sm">Select Delivery Location</span>
                <button onClick={() => setShowLocationModal(false)} className="text-brand-slate hover:text-brand-graphite font-bold p-1">
                  ✕
                </button>
              </div>

              <form onSubmit={handleLocationSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="m-address" className="text-[9px] font-black text-brand-slate uppercase tracking-wider">Address details</label>
                  <input
                    id="m-address"
                    type="text"
                    value={inputLocation}
                    onChange={(e) => setInputLocation(e.target.value)}
                    placeholder="Enter house no, street, city..."
                    className={`p-3 rounded-input text-xs font-bold border focus:outline-none focus:border-brand-blue ${
                      isServices ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-brand-border text-brand-graphite'
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-brand-slate uppercase tracking-wider">Quick Addresses</span>
                  {[
                    'Home - Flat 302, MG Road, Bengaluru',
                    'Office - Tower B, Embassy Tech Park, Bengaluru'
                  ].map(addr => (
                    <button
                      key={addr}
                      type="button"
                      onClick={() => setInputLocation(addr)}
                      className={`text-left text-xs font-bold p-3 border rounded-card transition-colors ${
                        inputLocation === addr
                          ? 'border-brand-blue bg-blue-50/20 text-brand-blue'
                          : isServices
                          ? 'border-zinc-800 bg-zinc-900 text-zinc-300'
                          : 'border-brand-border bg-slate-50 text-brand-graphite'
                      }`}
                    >
                      {addr}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0066FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-button uppercase tracking-wider shadow mt-2"
                >
                  Deliver to this address
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
