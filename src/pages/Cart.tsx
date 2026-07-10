import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useMediaQuery';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart, navigateTo } = useApp();
  const isMobile = useIsMobile();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  const cartTotal = getCartTotal();
  const discountVal = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const deliveryCharges = cartTotal > 500 || cartTotal === 0 ? 0 : 49;
  const finalTotal = cartTotal - discountVal + deliveryCharges;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      setCouponMsg('Promo code "WELCOME10" applied! 10% instant checkout discount.');
    } else {
      setCouponMsg('Invalid coupon code. Try entering WELCOME10.');
    }
  };

  const handleCheckout = () => {
    // Proceed to checkout
    clearCart();
    navigateTo('orders');
  };

  const renderDesktop = () => {
    return (
      <div className="max-w-7xl mx-auto py-8 px-12 text-left select-none text-brand-graphite font-sans">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2.5 font-heading uppercase tracking-wider">
          <ShoppingCart size={20} className="text-brand-blue" />
          <span>Shopping Cart ({cart.length} items)</span>
        </h1>

        {cart.length === 0 ? (
          <div className="w-full py-20 bg-white border border-brand-border rounded-card flex flex-col items-center justify-center text-center p-6 shadow-premium">
            <span className="text-4xl mb-4">🛒</span>
            <h3 className="text-sm font-extrabold text-brand-graphite mb-1.5 font-heading">Your cart is empty</h3>
            <p className="text-xs text-brand-slate max-w-sm mb-6 font-semibold">Explore our fresh catalog categories and fill up your box!</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('home')}
              className="px-5 py-2.5 bg-brand-blue text-white rounded-button text-xs font-extrabold shadow-premium hover:bg-blue-650 transition-colors uppercase tracking-wider"
            >
              Start Shopping
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {/* Left: Cart Items List (Span 2) */}
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {cart.map(item => {
                  const itemDiscount = Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100);
                  return (
                    <div
                      key={`${item.product.id}-${item.product.deliveryTime || ''}`}
                      className="bg-white border border-brand-border rounded-card p-5 flex gap-4.5 shadow-premium hover:border-brand-border/80 transition-all relative"
                    >
                      <div className="w-24 h-24 rounded-card overflow-hidden shrink-0 bg-brand-elevated border border-brand-border/40 p-2 flex items-center justify-center shadow-soft">
                        <img src={item.product.image} alt={item.product.title} className="max-h-full max-w-full object-contain" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start leading-none pr-8">
                            <h3 className="font-extrabold text-xs text-brand-graphite line-clamp-1 hover:text-brand-blue cursor-pointer font-heading">
                              {item.product.title}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-brand-slate hover:text-brand-red p-1 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          {item.product.specs?.['Weight'] && (
                            <span className="text-[10px] text-brand-slate font-extrabold block mt-1">Pack Size: {item.product.specs['Weight']}</span>
                          )}
                          {item.product.deliveryTime && (
                            <span className="text-[9.5px] font-extrabold text-brand-green bg-green-50 px-2 py-0.5 rounded w-max mt-2 block shadow-soft border border-brand-green/10 leading-none">
                              Scheduled: {item.product.deliveryTime}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3 font-numbers">
                          <div className="flex items-baseline gap-1.5 leading-none">
                            <span className="text-sm font-extrabold text-brand-graphite">₹{item.product.price}</span>
                            {item.product.originalPrice > item.product.price && (
                              <>
                                <span className="text-[10px] text-brand-slate line-through">₹{item.product.originalPrice}</span>
                                <span className="text-[9.5px] font-black text-brand-orange uppercase tracking-wider">{itemDiscount}% off</span>
                              </>
                            )}
                          </div>

                          {/* Plus Minus count */}
                          <div className="flex items-center border border-brand-blue bg-brand-blue text-white rounded-button overflow-hidden text-xs font-bold shadow-soft">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1.5 hover:bg-blue-600 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} strokeWidth={3} />
                            </button>
                            <span className="px-2.5 min-w-[20px] text-center select-none">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1.5 hover:bg-blue-600 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Pricing Receipt column (Span 1) */}
            <div className="col-span-1 flex flex-col gap-5">
              {/* Coupon card */}
              <div className="bg-white border border-brand-border rounded-card p-5 shadow-premium">
                <span className="text-brand-graphite font-black text-xs uppercase tracking-wider flex items-center gap-2 mb-3.5 font-heading border-b pb-2">
                  <Ticket size={15} className="text-brand-orange" />
                  Apply Coupon Code
                </span>
                <form onSubmit={handleApplyCoupon} className="flex gap-2 leading-none">
                  <input
                    type="text"
                    placeholder="Enter code e.g. WELCOME10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full px-3.5 py-2 border border-brand-border bg-slate-50 rounded-input text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4.5 bg-brand-blue text-white rounded-button text-[10px] font-black uppercase tracking-wider"
                  >
                    Apply
                  </motion.button>
                </form>
                {couponMsg && (
                  <span className={`text-[10px] font-bold block mt-2.5 leading-normal ${couponApplied ? 'text-brand-green' : 'text-brand-red'}`}>
                    {couponMsg}
                  </span>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-white border border-brand-border rounded-card p-5 shadow-premium flex flex-col gap-4 font-numbers select-none">
                <span className="text-brand-graphite font-black text-xs uppercase tracking-wider font-heading border-b border-brand-border/10 pb-2 text-left">
                  Bill & Pricing Receipt
                </span>
                <div className="flex flex-col gap-2.5 text-xs text-brand-slate font-bold">
                  <div className="flex justify-between items-center">
                    <span>Items Subtotal</span>
                    <span className="text-brand-graphite">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between items-center text-brand-green">
                      <span>Promo (WELCOME10 - 10%)</span>
                      <span>- ₹{discountVal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-brand-border pb-3.5">
                    <span>Delivery Charges</span>
                    <span className={deliveryCharges === 0 ? 'text-brand-green' : 'text-brand-graphite'}>
                      {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-black text-brand-graphite pt-1 leading-none">
                    <span>Total Amount to Pay</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="border-t border-brand-border pt-4 flex flex-col gap-3">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-brand-green hover:bg-emerald-650 text-white rounded-button text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-premium"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </motion.button>
                  <div className="flex gap-2.5 items-center justify-center text-[10px] text-brand-slate font-extrabold select-none">
                    <ShieldCheck size={14} className="text-brand-green" />
                    <span>Safe payments & 100% genuine products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col bg-[#FAF9F6] min-h-screen text-left pb-28 select-none text-brand-graphite font-sans">
        <div className="px-4 py-3.5 sticky top-12 z-30 bg-white border-b border-brand-border flex items-center justify-between">
          <span className="font-extrabold text-xs uppercase tracking-wider font-heading">Shopping Cart ({cart.length})</span>
        </div>

        {cart.length === 0 ? (
          <div className="m-4 py-20 bg-white border border-brand-border rounded-[20px] flex flex-col items-center justify-center text-center p-6 shadow-soft select-none">
            <span className="text-3xl mb-4">🛒</span>
            <h3 className="text-xs font-extrabold text-brand-graphite mb-1 font-heading">Your cart is empty</h3>
            <p className="text-[10px] text-brand-slate max-w-xs mb-5 font-semibold">Fill your cart with fresh selections!</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-brand-blue text-white rounded-button text-[9.5px] font-black shadow uppercase tracking-wider"
            >
              Shop Now
            </motion.button>
          </div>
        ) : (
          <div className="p-3 flex flex-col gap-3">
            {/* List */}
            <div className="flex flex-col gap-2.5">
              {cart.map(item => {
                return (
                  <div
                    key={`${item.product.id}-${item.product.deliveryTime || ''}`}
                    className="bg-white border border-brand-border rounded-[20px] p-3 flex gap-3 shadow-soft relative"
                  >
                    <div className="w-20 h-20 bg-brand-elevated border border-brand-border/40 rounded-[20px] p-1.5 flex items-center justify-center shrink-0 shadow-soft">
                      <img src={item.product.image} alt={item.product.title} className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start leading-none pr-6">
                          <h3 className="font-bold text-[10.5px] text-brand-graphite line-clamp-1 font-heading">{item.product.title}</h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-brand-slate p-0.5"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                        {item.product.deliveryTime && (
                            <span className="text-[8px] font-black text-brand-green bg-green-50 px-1.5 py-0.2 rounded w-max mt-1.5 block shadow-soft">
                              Slot: {item.product.deliveryTime}
                            </span>
                          )}
                      </div>

                      <div className="flex items-center justify-between font-numbers mt-2.5">
                        <div className="flex items-baseline gap-1 mt-1 leading-none">
                          <span className="text-xs font-extrabold text-brand-graphite">₹{item.product.price}</span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-[9px] text-brand-slate line-through">₹{item.product.originalPrice}</span>
                          )}
                        </div>

                        {/* Qty action */}
                        <div className="flex items-center border border-brand-blue bg-brand-blue text-white rounded-button overflow-hidden text-[10px] font-extrabold shadow-soft">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-1.5 py-1 hover:bg-blue-600 transition-colors"
                          >
                            <Minus size={9} strokeWidth={3} />
                          </button>
                          <span className="px-1.5 min-w-[15px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-1.5 py-1 hover:bg-blue-600 transition-colors"
                          >
                            <Plus size={9} strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-brand-border rounded-[20px] p-4.5 shadow-soft flex flex-col gap-3 font-numbers mt-1 select-none">
              <span className="text-brand-graphite font-black text-[10px] tracking-wider uppercase font-heading border-b border-brand-border/10 pb-2 text-left">
                Payment Details
              </span>
              <div className="flex flex-col gap-2 text-[10.5px] text-brand-slate font-bold">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-brand-graphite font-extrabold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-border pb-2">
                  <span>Delivery fee</span>
                  <span className={deliveryCharges === 0 ? 'text-brand-green font-extrabold' : 'text-brand-graphite'}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-black text-brand-graphite pt-1 leading-none">
                  <span>Pay Amount</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile checkout floating bar (16px buttons) */}
        {cart.length > 0 && (
          <div className="fixed bottom-14 left-0 right-0 h-14 bg-white border-t border-brand-border px-4 flex items-center justify-between z-40 select-none shadow-premium">
            <div className="flex flex-col leading-none font-numbers">
              <span className="text-xs font-extrabold text-brand-graphite">₹{finalTotal.toLocaleString('en-IN')}</span>
              <span className="text-[8px] text-brand-slate font-extrabold uppercase mt-0.5">Total Payable</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="px-6 py-2.5 bg-brand-green hover:bg-emerald-650 text-white rounded-button text-[10.5px] font-black uppercase tracking-wider shadow flex items-center gap-1 font-heading"
            >
              <span>Place Order</span>
              <ArrowRight size={12} />
            </motion.button>
          </div>
        )}
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};
