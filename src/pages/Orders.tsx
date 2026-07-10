import React from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';
import { Package, Truck, CheckCircle2, ShieldCheck, MapPin, Calendar } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const isMobile = useIsMobile();

  // Mock Active tracking order details (Stripe/Linear style timelines)
  const activeOrder = {
    id: 'OD-9928374921-SI',
    date: 'July 10, 2026',
    status: 'In Transit',
    estimatedDelivery: 'Tomorrow, by 11:00 AM',
    items: [
      { name: 'iPhone 15 Pro Max (256 GB, Titanium Gray)', price: 139900, qty: 1, img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&auto=format' },
      { name: 'AirPods Pro (2nd Generation, MagSafe Case)', price: 24900, qty: 1, img: 'https://images.unsplash.com/photo-1588449668338-d13417f16c4e?w=100&auto=format' }
    ],
    address: 'Guest Flat 302, MG Road, Bengaluru, 560001',
    steps: [
      { label: 'Order Confirmed', desc: 'July 10, 11:32 AM', status: 'done' },
      { label: 'Shipped from Hub', desc: 'July 10, 04:15 PM', status: 'done' },
      { label: 'In Transit', desc: 'Near Bengaluru Sorting Facility', status: 'active' },
      { label: 'Out for Delivery', desc: 'Pending courier dispatch', status: 'pending' }
    ]
  };


  const renderDesktop = () => {
    return (
      <div className="max-w-7xl mx-auto py-8 px-12 text-left select-none text-brand-graphite font-sans">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2.5 font-heading uppercase tracking-wider">
          <Package size={20} className="text-brand-blue" />
          <span>My Orders & Tracking Status</span>
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column: Order details & Timeline (Span 2) */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Tracking Status Card */}
            <div className="bg-white border border-brand-border rounded-card p-6 shadow-premium">
              <div className="flex justify-between items-center border-b border-brand-border/10 pb-4 mb-5 leading-none">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[9px] uppercase font-black tracking-widest text-brand-slate">Order Reference</span>
                  <span className="text-xs font-black font-numbers text-brand-graphite">{activeOrder.id}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-green bg-[#ECFDF5] border border-brand-green/10 px-4 py-1.5 rounded-full font-black">
                  <Truck size={13} />
                  <span>{activeOrder.status}</span>
                </div>
              </div>

              {/* Steps timeline layout (Linear style) */}
              <div className="flex flex-col gap-5 relative pl-6 select-none">
                {/* Timeline vertical bar */}
                <div className="absolute left-[9px] top-1 bottom-1 w-[1.5px] bg-slate-100 dark:bg-zinc-800 z-0"></div>

                {activeOrder.steps.map((step, idx) => {
                  const isDone = step.status === 'done';
                  const isActive = step.status === 'active';
                  return (
                    <div key={idx} className="flex gap-4 relative z-10 select-none">
                      {/* Node Indicator circle */}
                      <span className={`absolute left-[-23px] w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-brand-green border-brand-green text-white shadow-soft'
                          : isActive
                          ? 'bg-white border-brand-blue text-brand-blue shadow-premium scale-110'
                          : 'bg-white border-slate-200 text-slate-200'
                      }`}>
                        {isDone && <CheckCircle2 size={11} className="stroke-[3]" />}
                        {isActive && <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>}
                      </span>

                      <div className="flex flex-col leading-tight text-left">
                        <span className={`text-xs font-extrabold ${isActive ? 'text-brand-blue' : isDone ? 'text-brand-graphite' : 'text-brand-slate'}`}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-brand-slate font-semibold mt-0.5">{step.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items list */}
            <div className="bg-white border border-brand-border rounded-card p-6 shadow-premium">
              <span className="text-brand-graphite font-black text-xs uppercase tracking-wider font-heading border-b border-brand-border/10 pb-3.5 block mb-5 text-left">
                Items Package Summary
              </span>
              <div className="flex flex-col gap-4">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center border-b border-brand-border/10 pb-4 last:border-0 last:pb-0">
                    <div className="w-14 h-14 bg-brand-elevated border border-brand-border/40 rounded-card p-1.5 flex items-center justify-center shrink-0 shadow-soft">
                      <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain rounded" />
                    </div>
                    <div className="flex-1 flex flex-col text-left">
                      <span className="font-extrabold text-xs text-brand-graphite line-clamp-1 font-heading">{item.name}</span>
                      <span className="text-[10px] text-brand-slate font-bold mt-1 font-numbers">Quantity: {item.qty}</span>
                    </div>
                    <span className="text-xs font-black text-brand-graphite font-numbers shrink-0">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Estimated Delivery & Address Box (Span 1) */}
          <div className="col-span-1 flex flex-col gap-5">
            <div className="bg-white border border-brand-border rounded-card p-6 shadow-premium text-left">
              <span className="text-brand-graphite font-black text-xs uppercase tracking-wider font-heading border-b border-brand-border/10 pb-3 block mb-4.5">
                Delivery Schedule
              </span>
              <div className="flex gap-3 text-xs font-semibold text-brand-slate mb-4 items-start">
                <Calendar size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-brand-graphite mb-0.5">Estimated Arrival</span>
                  <span className="text-[10px] text-brand-green font-black">{activeOrder.estimatedDelivery}</span>
                </div>
              </div>
              <div className="flex gap-3 text-xs font-semibold text-brand-slate items-start border-t border-brand-border/10 pt-4">
                <MapPin size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-brand-graphite mb-0.5">Shipping Address</span>
                  <span className="text-[10.5px] leading-relaxed font-bold">{activeOrder.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-card p-6 shadow-premium text-left flex flex-col gap-3">
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue">
                  <ShieldCheck size={16} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-xs text-brand-graphite font-heading">Secure Shipment</span>
                  <span className="text-[9.5px] text-brand-slate font-bold">Guaranteed by ShopIndia</span>
                </div>
              </div>
              <p className="text-[10.5px] text-brand-slate leading-relaxed border-t border-brand-border pt-3 font-semibold">
                Your package is handled by pre-vetted shipping logistics. For returns, request support within 7 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col bg-[#FAF9F6] min-h-screen text-left pb-20 select-none text-brand-graphite font-sans">
        <div className="px-4 py-3.5 sticky top-12 z-30 bg-white border-b border-brand-border flex items-center justify-between">
          <span className="font-extrabold text-xs uppercase tracking-wider font-heading">Track Package</span>
        </div>

        <div className="p-3 flex flex-col gap-3">
          {/* Tracking reference */}
          <div className="bg-white border border-brand-border rounded-[20px] p-4.5 shadow-soft">
            <span className="text-[8px] uppercase font-black tracking-widest text-brand-slate font-heading">ID: {activeOrder.id}</span>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[11px] font-black text-brand-graphite">Arrival: <strong className="text-brand-green font-black">{activeOrder.estimatedDelivery}</strong></span>
              <span className="text-[9px] bg-[#ECFDF5] text-brand-green border border-brand-green/10 px-2 py-0.5 rounded-full font-black uppercase">
                {activeOrder.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-4 relative pl-5.5 mt-5">
              <div className="absolute left-[7px] top-1.5 bottom-1.5 w-[1.5px] bg-slate-100 z-0"></div>

              {activeOrder.steps.map((step, idx) => {
                const isDone = step.status === 'done';
                const isActive = step.status === 'active';
                return (
                  <div key={idx} className="flex gap-3 relative z-10">
                    <span className={`absolute left-[-20px] w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isDone ? 'bg-brand-green border-brand-green text-white shadow-soft' : isActive ? 'bg-white border-brand-blue text-brand-blue scale-105' : 'bg-white border-slate-200'
                    }`}>
                      {isDone && <CheckCircle2 size={9} className="stroke-[3]" />}
                      {isActive && <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>}
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className={`text-[10.5px] font-extrabold ${isActive ? 'text-brand-blue' : isDone ? 'text-brand-graphite' : 'text-brand-slate'}`}>{step.label}</span>
                      <span className="text-[9px] text-brand-slate font-semibold mt-0.5">{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items package list */}
          <div className="bg-white border border-brand-border rounded-[20px] p-4 shadow-soft">
            <span className="text-brand-graphite font-black text-[9px] uppercase tracking-widest font-heading border-b border-brand-border/10 pb-2 block mb-3.5">
              Package Contents
            </span>
            <div className="flex flex-col gap-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center border-b border-brand-border/10 pb-3 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-brand-elevated border border-brand-border/40 rounded-[20px] p-1 flex items-center justify-center shrink-0 shadow-soft">
                    <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col text-left">
                    <span className="font-bold text-[10px] text-brand-graphite line-clamp-1 font-heading">{item.name}</span>
                    <span className="text-[8.5px] text-brand-slate font-bold mt-0.5 font-numbers">Qty: {item.qty}</span>
                  </div>
                  <span className="text-[10px] font-black text-brand-graphite font-numbers shrink-0">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};
