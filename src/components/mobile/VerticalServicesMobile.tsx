import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Star, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VerticalServicesMobile: React.FC = () => {
  const { addToCart, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('v-appliance');
  const [bookingServiceId, setBookingServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const services = PRODUCTS.filter(p => p.vertical === 'services');
  const serviceCategories = CATEGORIES.filter(c => c.vertical === 'services');
  const activeServices = services.filter(p => p.category === selectedCategory);

  const dates = ['Today', 'Tomorrow', 'Saturday', 'Sunday'];
  const times = ['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM', '06:00 PM'];

  const handleBookClick = (serviceId: string) => {
    setBookingServiceId(serviceId);
  };

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const confirmBooking = (service: any) => {
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
    setBookingServiceId(null);
    navigateTo('cart');
  };

  return (
    <div className="w-full flex flex-col gap-3.5 py-3.5 px-3 bg-services-bg text-services-text min-h-screen pb-16 select-none text-left">
      {/* Top Banner Box */}
      <div className="bg-services-card border border-services-border rounded-lg p-4 text-left shadow-sm">
        <span className="text-[8px] bg-services-gold/10 border border-services-gold/20 text-services-gold px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest">
          Safe & Certified
        </span>
        <h2 className="text-sm font-extrabold text-white mt-1.5 leading-snug">Professional Home Services</h2>
        <div className="flex items-center gap-1.5 mt-1.5 text-[9px] text-services-gray font-semibold">
          <ShieldCheck size={12} className="text-services-gold" />
          <span>Equipped with safety & sanitization protocols</span>
        </div>
      </div>

      {/* Horizontal Category Circular Select List */}
      <div className="w-full flex gap-3.5 overflow-x-auto py-2 no-scrollbar">
        {serviceCategories.map(cat => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex flex-col items-center shrink-0 w-16 text-center cursor-pointer transition-all ${
              selectedCategory === cat.id ? 'scale-105 font-bold' : ''
            }`}
          >
            <div className={`w-11 h-11 rounded-full border overflow-hidden mb-1 flex items-center justify-center bg-zinc-900 transition-all shadow-xs ${
              selectedCategory === cat.id ? 'border-services-gold' : 'border-services-border'
            }`}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <span className={`text-[9px] font-bold truncate w-full tracking-wide ${selectedCategory === cat.id ? 'text-services-gold' : 'text-services-gray'}`}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* Services List Feed */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] text-services-gray uppercase font-extrabold tracking-widest mb-0.5">Recommended Packages</span>

        {activeServices.map(service => {
          const discount = Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100);
          const isWishlisted = wishlist[service.id];

          return (
            <div
              key={service.id}
              className="bg-services-card border border-services-border rounded-xl p-4 flex gap-4 cursor-pointer relative"
              onClick={() => navigateTo('detail', service.id)}
            >
              {/* Wishlist Button */}
              <button
                onClick={(e) => toggleWishlist(service.id, e)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-[#E53935] border border-services-border transition-colors z-10"
              >
                <Heart size={11} className={isWishlisted ? "fill-[#E53935] text-[#E53935]" : ""} />
              </button>

              {/* Left Column: Info details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white line-clamp-1 mb-1 pr-6">{service.title}</h3>
                  <div className="flex items-center gap-1.5 mb-2 leading-none">
                    <div className="flex items-center gap-0.5 bg-services-gold text-services-bg font-extrabold text-[8px] px-1.5 py-0.5 rounded">
                      <span>{service.rating}</span>
                      <Star size={7} className="fill-services-bg text-services-bg" />
                    </div>
                    <span className="text-[9px] text-services-gray font-bold">({service.ratingCount.toLocaleString('en-IN')} bookings)</span>
                  </div>
                  <p className="text-[10px] text-services-gray leading-normal line-clamp-2 font-medium">{service.description}</p>
                </div>

                <div className="flex items-baseline gap-1.5 mt-3.5 leading-none">
                  <span className="text-xs font-extrabold text-white">₹{service.price}</span>
                  <span className="text-[9px] text-services-gray line-through">₹{service.originalPrice}</span>
                  <span className="text-[8px] text-services-gold font-bold bg-services-gold/10 px-1 py-0.2 rounded">
                    {discount}% OFF
                  </span>
                </div>
              </div>

              {/* Right Column: Image and Book button */}
              <div className="w-20 flex flex-col items-center justify-between shrink-0" onClick={e => e.stopPropagation()}>
                <div className="w-20 h-20 rounded-md overflow-hidden bg-neutral-900 border border-services-border mb-2.5">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => handleBookClick(service.id)}
                  className="w-full py-1.5 bg-services-gold text-services-bg font-extrabold text-[10px] rounded uppercase tracking-wider shadow-sm transition-colors active:scale-95"
                >
                  Book
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Slot bottom drawer sheet for Mobile Services */}
      <AnimatePresence>
        {bookingServiceId && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center backdrop-blur-xs">
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setBookingServiceId(null)} />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full bg-services-card border-t border-services-border rounded-t-xl max-w-md p-5 pb-8 text-left z-50 shadow-lg text-services-text"
            >
              <div className="flex justify-between items-center border-b border-services-border pb-3 mb-4">
                <span className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <Calendar size={15} className="text-services-gold" />
                  Select Booking Slot
                </span>
                <button onClick={() => setBookingServiceId(null)} className="text-services-gray hover:text-white font-bold p-1">
                  ✕
                </button>
              </div>

              {/* Choose Date */}
              <span className="text-[9px] text-services-gray uppercase font-bold tracking-wider block mb-2">Choose Date</span>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {dates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`py-2 text-center font-bold text-[10px] rounded border transition-all ${
                      selectedDate === date
                        ? 'border-services-gold bg-services-gold/10 text-services-gold shadow-xs'
                        : 'border-services-border bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* Choose Arrival Time */}
              <span className="text-[9px] text-services-gray uppercase font-bold tracking-wider block mb-2">Choose Arrival Time</span>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {times.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 text-center font-bold text-[10px] rounded border transition-all ${
                      selectedTime === time
                        ? 'border-services-gold bg-services-gold/10 text-services-gold shadow-xs'
                        : 'border-services-border bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  const service = services.find(s => s.id === bookingServiceId);
                  if (service) confirmBooking(service);
                }}
                className="w-full py-2.5 bg-services-gold hover:bg-services-gold/90 text-services-bg font-extrabold text-xs rounded-lg uppercase tracking-widest shadow-md transition-colors"
              >
                Confirm Slot Booking
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
