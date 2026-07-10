import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Star, Clock, CheckCircle2, Calendar, ShieldCheck, MapPin, Heart } from 'lucide-react';

export const VerticalServices: React.FC = () => {
  const { addToCart, navigateTo, location } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('v-appliance');
  const [selectedServiceIdForBooking, setSelectedServiceIdForBooking] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Filter professional service vertical items
  const services = PRODUCTS.filter(p => p.vertical === 'services');
  const serviceCategories = CATEGORIES.filter(c => c.vertical === 'services');
  const activeServices = services.filter(p => p.category === selectedCategory);

  const dates = ['Today', 'Tomorrow', 'Saturday', 'Sunday'];
  const times = ['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM', '06:00 PM'];

  const handleBookNow = (service: any) => {
    setSelectedServiceIdForBooking(service.id);
  };

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const confirmBooking = (service: any) => {
    // Add slot booking details in specs
    const bookingDetails = {
      ...service,
      deliveryTime: `${selectedDate} at ${selectedTime}`,
      specs: {
        ...service.specs,
        'Scheduled Slot': `${selectedDate}, ${selectedTime}`,
        'Technician': 'Certified Professional Assigned'
      }
    };
    addToCart(bookingDetails);
    setSelectedServiceIdForBooking(null);
    navigateTo('cart');
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-services-bg text-services-text py-8 px-12 select-none">
      {/* Search Header Banner */}
      <div className="w-full py-10 flex flex-col items-center justify-center text-center select-none max-w-4xl mx-auto">
        <span className="text-[10px] font-extrabold tracking-widest text-services-gold uppercase bg-services-gold/10 px-3.5 py-1.5 rounded-full mb-3.5 border border-services-gold/20">
          PRO PROFESSIONAL HOME SERVICES
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          Professional Services at Your Doorstep
        </h1>
        <p className="text-sm text-services-gray max-w-xl mb-8 leading-relaxed font-semibold">
          Certified partners, sanitization protocols, and crystal clear upfront pricing.
        </p>

        {/* Location & Trust Bar */}
        <div className="flex gap-8 items-center border border-services-border rounded-lg bg-services-card p-4.5 w-full shadow-lg">
          <div className="flex items-center gap-3 border-r border-services-border pr-8 shrink-0">
            <MapPin size={18} className="text-services-gold" />
            <div className="text-left leading-tight">
              <span className="text-[10px] text-services-gray block font-bold uppercase tracking-wider">Service Location</span>
              <span className="text-xs font-bold text-white max-w-[180px] truncate block">{location}</span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4 text-left pl-4 font-bold text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <ShieldCheck size={16} className="text-services-gold" />
              <span>Verified Experts Only</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Clock size={16} className="text-services-gold" />
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 size={16} className="text-services-gold" />
              <span>Service Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Category Select Cards */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-5 gap-4 mb-10 mt-2">
        {serviceCategories.map(cat => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`border rounded-xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-355 ${
              selectedCategory === cat.id
                ? 'border-services-gold bg-services-gold/5 shadow-md3_1 scale-[1.03] ring-1 ring-services-gold/20'
                : 'border-services-border bg-services-card hover:border-services-gray hover:scale-[1.01]'
            }`}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden mb-2.5 flex items-center justify-center bg-zinc-900 border border-services-border">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wide">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Services Feed (Left) & Guarantee Box (Right) */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-3 gap-8 text-left">
        {/* Left Side: Services List Feed */}
        <div className="col-span-2 flex flex-col gap-5">
          <h2 className="text-base font-extrabold text-white border-b border-services-border pb-3.5 flex items-center gap-2.5 uppercase tracking-wide">
            <span>Available Packages</span>
            <span className="text-xs text-services-gray font-semibold">({activeServices.length} items)</span>
          </h2>

          <div className="flex flex-col gap-4">
            {activeServices.map(service => {
              const discount = Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100);
              const isWishlisted = wishlist[service.id];

              return (
                <div
                  key={service.id}
                  className="bg-services-card border border-services-border rounded-xl p-5 flex gap-5 hover:border-services-gold/45 hover:shadow-lg transition-all duration-300 relative group"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(service.id, e)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-[#E53935] border border-services-border transition-colors z-10"
                  >
                    <Heart size={13} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
                  </button>

                  {/* Service Image */}
                  <div className="w-[140px] h-[140px] rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-services-border flex items-center justify-center overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  {/* Content details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-white mb-1.5 line-clamp-1 group-hover:text-services-gold transition-colors duration-300">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-2.5 mb-2.5 leading-none">
                        <div className="flex items-center gap-0.5 bg-services-gold text-services-bg font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                          <span>{service.rating}</span>
                          <Star size={8} className="fill-services-bg text-services-bg" />
                        </div>
                        <span className="text-[10px] text-services-gray font-bold">
                          ({service.ratingCount.toLocaleString('en-IN')} bookings)
                        </span>
                      </div>
                      <p className="text-xs text-services-gray leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-baseline gap-2 leading-none">
                        <span className="text-base font-extrabold text-white">₹{service.price}</span>
                        <span className="text-xs text-services-gray line-through">₹{service.originalPrice}</span>
                        <span className="text-[10px] text-services-gold font-bold bg-services-gold/10 px-1.5 py-0.5 rounded border border-services-gold/10">
                          {discount}% OFF
                        </span>
                      </div>

                      <button
                        onClick={() => handleBookNow(service)}
                        className="px-5 py-2.5 bg-services-gold hover:bg-services-gold/90 text-services-bg font-extrabold text-xs tracking-wider rounded transition-colors uppercase"
                      >
                        Book Service
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Trust & Verification Guarantee Widget */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-services-card border border-services-border rounded-xl p-5 flex flex-col gap-4 shadow-md">
            <span className="text-white font-extrabold text-xs uppercase tracking-wider border-b border-services-border pb-2.5">
              ShopIndia Promise
            </span>
            <div className="flex flex-col gap-4.5 text-xs font-semibold text-gray-300">
              <div className="flex gap-3">
                <CheckCircle2 size={16} className="text-services-gold shrink-0 mt-0.5" />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-white mb-0.5">Insurance Cover</span>
                  <span className="text-[10px] text-services-gray">Up to ₹10,000 protection against accidental damages.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={16} className="text-services-gold shrink-0 mt-0.5" />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-white mb-0.5">Verified Partners Only</span>
                  <span className="text-[10px] text-services-gray">Thorough background check and training audits.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={16} className="text-services-gold shrink-0 mt-0.5" />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-white mb-0.5">No-Questions Re-servicing</span>
                  <span className="text-[10px] text-services-gray">If not satisfied, free re-service done in 4 days.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Slot Selection Modal Overlay (Frosted glass overlay) */}
      {selectedServiceIdForBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-services-card border border-services-border rounded-xl max-w-md w-full p-6 text-left shadow-fkCardHover">
            <h3 className="text-base font-extrabold text-white mb-4.5 flex items-center gap-2">
              <Calendar size={18} className="text-services-gold" />
              <span>Select Service Booking Slot</span>
            </h3>

            {/* Date selection */}
            <span className="text-[10px] text-services-gray uppercase font-bold tracking-wider block mb-2">Select Date</span>
            <div className="grid grid-cols-4 gap-2 mb-4.5">
              {dates.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`py-2 px-1 text-center font-bold text-xs rounded border transition-all ${
                    selectedDate === date
                      ? 'border-services-gold bg-services-gold/10 text-services-gold shadow-xs'
                      : 'border-services-border bg-zinc-900 text-gray-400 hover:text-white'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            {/* Time selection */}
            <span className="text-[10px] text-services-gray uppercase font-bold tracking-wider block mb-2">Select Time</span>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {times.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-1 text-center font-bold text-xs rounded border transition-all ${
                    selectedTime === time
                      ? 'border-services-gold bg-services-gold/10 text-services-gold shadow-xs'
                      : 'border-services-border bg-zinc-900 text-gray-400 hover:text-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-3 border-t border-services-border">
              <button
                onClick={() => setSelectedServiceIdForBooking(null)}
                className="px-4 py-2 border border-services-border text-gray-400 hover:text-white hover:border-services-gray rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const service = services.find(s => s.id === selectedServiceIdForBooking);
                  if (service) confirmBooking(service);
                }}
                className="px-5 py-2 bg-services-gold text-services-bg hover:bg-services-gold/90 rounded text-xs font-bold uppercase tracking-wider"
              >
                Confirm Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
