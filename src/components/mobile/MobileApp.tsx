import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VerticalShopMobile } from './VerticalShopMobile';
import { VerticalQuickCommerceMobile } from './VerticalQuickCommerceMobile';
import { VerticalServicesMobile } from './VerticalServicesMobile';
import { SearchPage } from '../../pages/Search';
import { ProductDetailPage } from '../../pages/ProductDetail';
import { CartPage } from '../../pages/Cart';
import { OrdersPage } from '../../pages/Orders';
import { ProfilePage } from '../../pages/Profile';
import { Home, Grid, ShoppingCart, Package, User, MapPin, Menu, X } from 'lucide-react';
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

  // Determine active bottom navigation item based on current path
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
      isServices ? 'bg-services-bg text-services-text' : 'bg-gray-50 text-gray-800'
    }`}>
      {/* Top Segmented Selector (Shop | 10 Min | Services) */}
      <div className={`w-full py-2 px-4 sticky top-0 z-40 transition-colors duration-300 shadow-sm flex flex-col gap-2 ${
        isServices ? 'bg-zinc-900 border-b border-services-border' : 'bg-fk-blue text-white'
      }`}>
        <div className="flex justify-between items-center">
          {/* Menu Drawer Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1 hover:bg-white/10 rounded transition-colors text-white focus:outline-none"
              aria-label="Open Sidebar Menu"
            >
              <Menu size={20} />
            </button>
            <span className="font-extrabold italic text-base tracking-wide flex items-center gap-1 text-white">
              ShopIndia
              {currentVertical === 'quick' && <span className="text-[8px] uppercase font-bold tracking-wider px-1 py-0.5 rounded bg-white text-quick-green not-italic">10M</span>}
              {currentVertical === 'services' && <span className="text-[8px] uppercase font-bold tracking-wider px-1 py-0.5 rounded bg-services-gold text-services-bg not-italic">Pro</span>}
            </span>
          </div>

          {/* Dynamic Location indicator */}
          <div
            onClick={() => { setInputLocation(location); setShowLocationModal(true); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all shadow-sm ${
              isServices ? 'bg-zinc-800 text-services-gold border border-services-border' : 'bg-white/15 text-white hover:bg-white/20'
            }`}
          >
            <MapPin size={11} className={isServices ? 'text-services-gold' : 'text-fk-yellow'} />
            <span className="max-w-[150px] truncate">{location.split(',')[0]}</span>
            <span>▾</span>
          </div>
        </div>

        {/* Triple Segmented Slider Tabs */}
        <div className={`grid grid-cols-3 p-0.5 rounded-lg text-xs font-bold leading-none relative ${
          isServices ? 'bg-zinc-950 border border-services-border' : 'bg-fk-darkBlue/40'
        }`}>
          {(['shop', 'quick', 'services'] as const).map(v => {
            const isActive = currentVertical === v;
            const config = {
              shop: { text: 'Shop', color: isActive ? 'text-fk-blue font-extrabold' : 'text-white/80' },
              quick: { text: '10 Min', color: isActive ? 'text-quick-green font-extrabold' : 'text-white/80' },
              services: { text: 'Services', color: isActive ? 'text-services-bg font-extrabold animate-pulse' : 'text-white/80' }
            };
            const item = config[v];

            return (
              <button
                key={v}
                onClick={() => setCurrentVertical(v)}
                className={`py-2.5 text-center rounded-md relative transition-colors duration-300 z-10 ${item.color}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobileVerticalPill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className={`absolute inset-0 rounded-md shadow-sm z-[-1] ${
                      isServices ? 'bg-services-gold' : 'bg-white'
                    }`}
                  />
                )}
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Screen Router */}
      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPath}-${currentVertical}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Native-style Mobile Bottom Navigation Tab Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 h-14 border-t z-40 grid grid-cols-5 items-center select-none shadow-md3_3 transition-colors duration-300 ${
        isServices ? 'bg-zinc-900 border-services-border text-services-gray' : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center gap-0.5 h-full ${
            activeTab === 'home'
              ? isServices ? 'text-services-gold' : 'text-fk-blue font-bold'
              : 'hover:text-gray-900'
          }`}
        >
          <Home size={18} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] tracking-wide">Home</span>
        </button>

        <button
          onClick={() => {
            // Focus Search categories as a categories tab action
            setSearchQuery('');
            navigateTo('search');
          }}
          className={`flex flex-col items-center justify-center gap-0.5 h-full ${
            currentPath === 'search' && !searchQuery
              ? isServices ? 'text-services-gold' : 'text-fk-blue font-bold'
              : 'hover:text-gray-900'
          }`}
        >
          <Grid size={18} strokeWidth={currentPath === 'search' && !searchQuery ? 2.5 : 2} />
          <span className="text-[10px] tracking-wide">Categories</span>
        </button>

        <button
          onClick={() => navigateTo('cart')}
          className={`flex flex-col items-center justify-center gap-0.5 h-full relative ${
            activeTab === 'cart'
              ? isServices ? 'text-services-gold' : 'text-fk-blue font-bold'
              : 'hover:text-gray-900'
          }`}
        >
          <div className="relative">
            <ShoppingCart size={18} strokeWidth={activeTab === 'cart' ? 2.5 : 2} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-fk-orange px-1 text-[8px] font-extrabold text-white">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wide">Cart</span>
        </button>

        <button
          onClick={() => navigateTo('orders')}
          className={`flex flex-col items-center justify-center gap-0.5 h-full ${
            activeTab === 'orders'
              ? isServices ? 'text-services-gold' : 'text-fk-blue font-bold'
              : 'hover:text-gray-900'
          }`}
        >
          <Package size={18} strokeWidth={activeTab === 'orders' ? 2.5 : 2} />
          <span className="text-[10px] tracking-wide">Orders</span>
        </button>

        <button
          onClick={() => navigateTo('profile')}
          className={`flex flex-col items-center justify-center gap-0.5 h-full ${
            activeTab === 'profile'
              ? isServices ? 'text-services-gold' : 'text-fk-blue font-bold'
              : 'hover:text-gray-900'
          }`}
        >
          <User size={18} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] tracking-wide">Profile</span>
        </button>
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
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white text-gray-800 shadow-md3_3 z-50 flex flex-col select-none"
            >
              {/* Profile header of drawer */}
              <div className="bg-fk-blue text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-sm border border-white/10">
                    G
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-bold text-sm">Guest Account</span>
                    <span className="text-[10px] text-blue-100">guest@shopindia.com</span>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-white hover:bg-white/10 p-1 rounded-full">
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-4 flex flex-col font-semibold text-sm">
                <span className="px-5 text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Business Verticals</span>
                <button
                  onClick={() => { setCurrentVertical('shop'); setDrawerOpen(false); }}
                  className={`flex items-center gap-3 px-5 py-3 text-left border-l-4 ${currentVertical === 'shop' ? 'border-fk-blue bg-blue-50 text-fk-blue' : 'border-transparent text-gray-700'}`}
                >
                  Shop (E-commerce)
                </button>
                <button
                  onClick={() => { setCurrentVertical('quick'); setDrawerOpen(false); }}
                  className={`flex items-center gap-3 px-5 py-3 text-left border-l-4 ${currentVertical === 'quick' ? 'border-quick-green bg-green-50 text-quick-green' : 'border-transparent text-gray-700'}`}
                >
                  10 Min Delivery (Groceries)
                </button>
                <button
                  onClick={() => { setCurrentVertical('services'); setDrawerOpen(false); }}
                  className={`flex items-center gap-3 px-5 py-3 text-left border-l-4 ${currentVertical === 'services' ? 'border-services-gold bg-amber-50/40 text-services-gold' : 'border-transparent text-gray-700'}`}
                >
                  Home Services
                </button>

                <div className="border-t border-gray-100 my-4" />

                <span className="px-5 text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Quick Links</span>
                <button
                  onClick={() => { navigateTo('orders'); setDrawerOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 text-gray-700"
                >
                  My Orders & Live Tracking
                </button>
                <button
                  onClick={() => { navigateTo('cart'); setDrawerOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 text-gray-700"
                >
                  View Active Cart
                </button>
                <button
                  onClick={() => { navigateTo('profile'); setDrawerOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 text-gray-700"
                >
                  Account Profile
                </button>
              </div>

              {/* Footer info of drawer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 text-[10px] text-gray-400 text-center font-medium">
                ShopIndia Mobile V2.0 • Native Mock UI
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Location Editing Modal Sheet */}
      <AnimatePresence>
        {showLocationModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full bg-white rounded-t-xl max-w-md p-5 pb-8 text-left shadow-lg text-gray-800 z-50"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                <span className="font-extrabold text-sm text-gray-900">Change Delivery Address</span>
                <button onClick={() => setShowLocationModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleLocationSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="address-input" className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Enter Address / Area</label>
                  <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-2.5 items-center gap-2">
                    <MapPin size={16} className="text-fk-blue" />
                    <input
                      id="address-input"
                      type="text"
                      value={inputLocation}
                      onChange={(e) => setInputLocation(e.target.value)}
                      placeholder="e.g. Flat 302, MG Road, Bengaluru"
                      className="w-full bg-transparent focus:outline-none text-xs font-semibold text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center text-[10px] font-bold">
                  <div
                    onClick={() => setInputLocation('Home - Flat 302, MG Road, Bengaluru')}
                    className="border border-gray-200 p-2.5 rounded-lg hover:border-fk-blue cursor-pointer bg-gray-50"
                  >
                    🏠 Home (MG Road)
                  </div>
                  <div
                    onClick={() => setInputLocation('Office - Tower B, Embassy Tech Park, Bengaluru')}
                    className="border border-gray-200 p-2.5 rounded-lg hover:border-fk-blue cursor-pointer bg-gray-50"
                  >
                    🏢 Office (Embassy)
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-fk-blue hover:bg-fk-darkBlue text-white font-bold text-xs rounded-lg uppercase shadow transition-colors mt-2"
                >
                  Update Location
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
