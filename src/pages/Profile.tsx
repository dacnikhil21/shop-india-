import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useMediaQuery';
import { User, MapPin, Gift, Save, CheckCircle2, RefreshCw } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { location, setLocation, clearCart, currentVertical } = useApp();
  const isMobile = useIsMobile();

  // Editable Profile state
  const [name, setName] = useState('User Guest');
  const [email, setEmail] = useState('guest@shopindia.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isSaved, setIsSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetApp = () => {
    localStorage.removeItem('shopindia_cart');
    localStorage.removeItem('shopindia_orders');
    clearCart();
    window.location.reload();
  };

  const isServices = currentVertical === 'services';

  // Desktop Page Layout
  const renderDesktop = () => {
    return (
      <div className="max-w-4xl mx-auto px-12 py-8 text-left select-none text-[#172337]">
        <h1 className={`text-xl font-bold mb-6 ${isServices ? 'text-white' : 'text-[#172337]'}`}>
          My Profile & Settings
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column: Account Details Form (Span 2) */}
          <div className="col-span-2 flex flex-col gap-6">
            <form onSubmit={handleProfileSave} className={`border rounded p-5 flex flex-col gap-4 ${
              isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
            }`}>
              <span className="font-extrabold text-sm uppercase tracking-wide border-b border-fk-border pb-2.5 mb-2 flex items-center gap-2">
                <User size={16} className="text-[#2874F0]" />
                <span>Personal Information</span>
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-name" className="text-[10px] font-bold text-[#64748B] uppercase">Full Name</label>
                  <input
                    id="p-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2.5 border border-fk-border rounded text-xs font-semibold focus:outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-phone" className="text-[10px] font-bold text-[#64748B] uppercase">Phone Number</label>
                  <input
                    id="p-phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2.5 border border-fk-border rounded text-xs font-semibold focus:outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="p-email" className="text-[10px] font-bold text-[#64748B] uppercase">Email Address</label>
                <input
                  id="p-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2.5 border border-fk-border rounded text-xs font-semibold focus:outline-none focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0] w-full"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2874F0] hover:bg-[#1557D6] text-white font-bold text-xs rounded uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all transform active:scale-95"
                >
                  <Save size={14} />
                  <span>Save Profile</span>
                </button>

                {isSaved && (
                  <span className="text-xs text-[#16A34A] font-bold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Profile details saved successfully!
                  </span>
                )}
              </div>
            </form>

            {/* Address Management panel */}
            <div className={`border rounded p-5 flex flex-col gap-4 ${
              isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
            }`}>
              <span className="font-extrabold text-sm uppercase tracking-wide border-b border-fk-border pb-2.5 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-[#2874F0]" />
                <span>Delivery Addresses</span>
              </span>

              <div className="flex flex-col gap-3">
                {[
                  { label: 'Home Address', val: 'Home - Flat 302, MG Road, Bengaluru' },
                  { label: 'Office Address', val: 'Office - Tower B, Embassy Tech Park, Bengaluru' }
                ].map(addr => {
                  const isCurrent = location === addr.val;
                  return (
                    <div
                      key={addr.val}
                      onClick={() => setLocation(addr.val)}
                      className={`p-3.5 border rounded-md cursor-pointer transition-all flex justify-between items-center ${
                        isCurrent
                          ? 'border-[#2874F0] bg-blue-50/20'
                          : 'border-fk-border hover:border-gray-400'
                      }`}
                    >
                      <div className="flex flex-col text-left leading-relaxed">
                        <span className="font-bold text-xs text-[#172337] dark:text-white">{addr.label}</span>
                        <span className="text-xs text-[#64748B] font-semibold">{addr.val}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isCurrent ? 'border-[#2874F0] bg-[#2874F0] text-white' : 'border-gray-300'
                      }`}>
                        {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Plus coins & Reset actions (Span 1) */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Coins wallet panel */}
            <div className={`border rounded p-5 flex flex-col gap-3 text-center ${
              isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
            }`}>
              <div className="w-12 h-12 rounded-full bg-yellow-50 text-[#FF6B00] flex items-center justify-center mx-auto mb-1 border border-yellow-100">
                <Gift size={22} className="fill-[#ffe500] text-[#FF6B00]" />
              </div>
              <span className="font-extrabold text-sm text-[#172337] dark:text-white">ShopIndia Plus Rewards</span>
              <div className="flex flex-col gap-1 leading-none mb-2">
                <span className="text-2xl font-black text-[#FF6B00]">250</span>
                <span className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider">Supercoins available</span>
              </div>
              <p className="text-[10px] text-[#64748B] leading-relaxed border-t border-fk-border pt-3 font-medium">
                Use supercoins to claim discount coupons on Shop, 10 Min grocery checkouts, and premium AC servicing.
              </p>
            </div>

            {/* Clear data system manager */}
            <div className={`border rounded p-5 flex flex-col gap-3.5 ${
              isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
            }`}>
              <span className="font-bold text-xs uppercase tracking-wide text-[#64748B] block border-b border-fk-border pb-2.5">
                Developer Settings
              </span>
              <p className="text-[10px] text-[#64748B] leading-relaxed font-medium">
                Wipe all cached carts, addresses, and order tracking lists to test the checkout experience from scratch.
              </p>
              <button
                onClick={handleResetApp}
                className="w-full py-2 bg-[#E53935] hover:bg-red-700 text-white font-bold text-xs rounded uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw size={12} />
                <span>Reset Local State</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Page Layout
  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col bg-slate-50 min-h-screen text-left pb-20 select-none text-[#172337]">
        {/* Header */}
        <div className={`p-4 border-b ${
          isServices ? 'bg-zinc-900 border-services-border text-white' : 'bg-white border-fk-border text-slate-800'
        }`}>
          <span className="font-extrabold text-xs tracking-wide">My Account Settings</span>
        </div>

        {/* Profile Card & form fields */}
        <div className="p-3 flex flex-col gap-3">
          <form onSubmit={handleProfileSave} className={`border border-fk-border rounded-lg p-4 flex flex-col gap-3.5 ${
            isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white shadow-sm'
          }`}>
            <span className="font-extrabold text-xs border-b border-fk-border pb-2 flex items-center gap-2">
              <User size={14} className="text-[#2874F0]" /> Account Details
            </span>

            <div className="flex flex-col gap-1">
              <label htmlFor="pm-name" className="text-[8px] font-bold text-slate-400 uppercase">Your Name</label>
              <input
                id="pm-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-fk-border rounded text-xs font-semibold focus:outline-none focus:border-[#2874F0]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="pm-phone" className="text-[8px] font-bold text-slate-400 uppercase">Phone Number</label>
              <input
                id="pm-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 border border-fk-border rounded text-xs font-semibold focus:outline-none focus:border-[#2874F0]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#2874F0] text-white font-extrabold text-[10px] rounded uppercase tracking-wide mt-1"
            >
              Save Profile Details
            </button>
          </form>

          {/* Saved delivery locations */}
          <div className={`border border-fk-border rounded-lg p-4 flex flex-col gap-3 ${
            isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white shadow-sm'
          }`}>
            <span className="font-extrabold text-xs border-b border-fk-border pb-2 flex items-center gap-2">
              <MapPin size={14} className="text-[#2874F0]" /> Saved Locations
            </span>

            <div className="flex flex-col gap-2">
              {[
                { label: 'Home Address', val: 'Home - Flat 302, MG Road, Bengaluru' },
                { label: 'Office Address', val: 'Office - Tower B, Embassy Tech Park, Bengaluru' }
              ].map(addr => {
                const isCurrent = location === addr.val;
                return (
                  <div
                    key={addr.val}
                    onClick={() => setLocation(addr.val)}
                    className={`p-2.5 border rounded flex justify-between items-center ${
                      isCurrent ? 'border-[#2874F0] bg-blue-50/10' : 'border-fk-border'
                    }`}
                  >
                    <div className="flex flex-col text-left leading-tight">
                      <span className="font-bold text-[10px] text-gray-800 dark:text-white">{addr.label}</span>
                      <span className="text-[9px] text-slate-400 truncate max-w-[200px]">{addr.val}</span>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isCurrent ? 'border-[#2874F0] bg-[#2874F0] text-white' : 'border-gray-300'
                    }`}>
                      {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset App */}
          <div className={`border border-fk-border rounded-lg p-4 flex flex-col gap-2 ${
            isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white shadow-sm'
          }`}>
            <span className="font-extrabold text-xs border-b border-fk-border pb-2 text-[#E53935]">Developer Option</span>
            <button
              onClick={handleResetApp}
              className="w-full py-2 bg-[#E53935] hover:bg-red-700 text-white font-extrabold text-[10px] rounded uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={10} />
              <span>Reset State & Reload</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};
