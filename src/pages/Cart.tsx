import React from 'react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../hooks/useMediaQuery';
import { ShoppingCart, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Home } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, placeOrder, navigateTo, currentVertical } = useApp();
  const isMobile = useIsMobile();

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = getCartTotal();

  // Calculate mock retail/original price total to show dynamic savings
  const originalPriceTotal = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalSavings = originalPriceTotal - cartTotal;

  const isServices = currentVertical === 'services';

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-6 text-center select-none text-[#172337]">
        <div className={`p-10 border rounded-lg flex flex-col items-center justify-center ${
          isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
        }`}>
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-[#2874F0] mb-4">
            <ShoppingCart size={36} />
          </div>
          <h2 className="text-base font-extrabold text-gray-900 mb-1 dark:text-white">Your Cart is Empty!</h2>
          <p className="text-xs text-gray-400 max-w-sm mb-6 font-semibold">Explore our active catalogs and add some premium products or home services.</p>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 bg-[#2874F0] hover:bg-[#1557D6] text-white font-bold text-xs rounded uppercase tracking-wider shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Home size={14} />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    );
  }

  // Desktop Page Layout
  const renderDesktop = () => {
    return (
      <div className="max-w-7xl mx-auto px-12 py-8 grid grid-cols-3 gap-6 text-left select-none text-[#172337]">
        {/* Left Side: Cart Items List (Span 2) */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className={`border rounded-sm overflow-hidden ${
            isServices ? 'bg-services-card border-services-border' : 'bg-white border-fk-border shadow-sm'
          }`}>
            <div className="p-4 border-b border-fk-border flex justify-between items-center bg-slate-50/60 leading-none">
              <span className="font-extrabold text-sm uppercase tracking-wider text-slate-800">
                ShopIndia Cart ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
              </span>
              <span className="text-xs text-[#64748B] font-bold">Deliver to: <strong className="text-[#172337] dark:text-white">Flat 302, Bengaluru</strong></span>
            </div>

            {/* List items */}
            <div className="flex flex-col">
              {cart.map(item => {
                const discount = Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100);
                return (
                  <div
                    key={item.product.id}
                    className="p-5 border-b border-fk-border last:border-0 flex gap-5 hover:bg-slate-50/20 transition-colors duration-200"
                  >
                    {/* Item picture */}
                    <div className="w-[110px] h-[110px] border border-fk-border rounded flex items-center justify-center p-2 shrink-0 bg-white">
                      <img src={item.product.image} alt={item.product.title} className="max-h-full max-w-full object-contain" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between gap-4 items-start leading-none">
                          <h3
                            onClick={() => navigateTo('detail', item.product.id)}
                            className="font-bold text-sm text-[#172337] hover:text-[#2874F0] cursor-pointer line-clamp-1 dark:text-white"
                          >
                            {item.product.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-[#E53935] transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block mt-1.5">
                          {item.product.brand} • {item.product.specs?.['Weight'] || item.product.specs?.['Volume'] || 'Specs'}
                        </span>
                        <span className="text-xs text-[#16A34A] font-bold block mt-2 flex items-center gap-1">
                          🕒 Scheduled: {item.product.deliveryTime}
                        </span>
                      </div>

                      {/* Quantity & price adjustment */}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-fk-border rounded overflow-hidden text-xs font-bold bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-slate-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-3 min-w-[20px] text-center select-none">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-slate-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <div className="flex items-baseline gap-2 leading-none">
                          <span className="text-base font-extrabold text-[#172337] dark:text-white">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <>
                              <span className="text-xs text-[#64748B] line-through">
                                ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-[#FF6B00] font-bold">{discount}% Off</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Bill Summary details (Span 1) */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className={`border rounded-sm p-5 ${
            isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
          }`}>
            <span className="font-extrabold text-xs uppercase tracking-wider text-slate-450 block border-b border-fk-border pb-3 mb-4">
              Price Details
            </span>

            <div className="flex flex-col gap-3.5 text-xs font-semibold text-[#64748B] border-b border-fk-border pb-4 mb-4">
              <div className="flex justify-between">
                <span>Price ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
                <span className="text-[#172337] dark:text-white">₹{originalPriceTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Vertical Discount</span>
                <span className="text-[#16A34A]">-₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#16A34A] flex items-center gap-1">
                  <span className="line-through text-slate-400">₹40</span>
                  <span>FREE</span>
                </span>
              </div>
            </div>

            <div className="flex justify-between text-sm font-extrabold text-[#172337] dark:text-white border-b border-fk-border pb-4 mb-4">
              <span>Total Amount</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            {totalSavings > 0 && (
              <span className="text-xs font-bold text-[#16A34A] block mb-6 bg-green-50 p-2.5 rounded text-center border border-green-100">
                🎉 You will save ₹{totalSavings.toLocaleString('en-IN')} on this order!
              </span>
            )}

            <button
              onClick={placeOrder}
              className="w-full py-3 bg-[#fb641b] hover:bg-orange-700 text-white font-extrabold text-xs rounded uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-all transform active:scale-95"
            >
              <span>Place Order</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex gap-2.5 items-center justify-center text-[10px] text-slate-400 font-semibold">
            <ShieldCheck size={18} className="text-[#16A34A]" />
            <span>Safe and Secure Payments. 100% Authentic products.</span>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Page Layout
  const renderMobile = () => {
    return (
      <div className="w-full flex flex-col bg-slate-50 min-h-screen text-left pb-28 select-none text-[#172337]">
        {/* Header */}
        <div className={`p-4 border-b ${
          isServices ? 'bg-zinc-900 border-services-border text-white' : 'bg-white border-fk-border text-slate-800'
        }`}>
          <span className="font-extrabold text-xs tracking-wide">My Cart ({totalItemsCount})</span>
        </div>

        {/* Cart items list */}
        <div className="flex flex-col gap-2.5 p-2.5">
          <div className={`border border-fk-border rounded-lg overflow-hidden ${
            isServices ? 'bg-services-card border-services-border' : 'bg-white shadow-sm'
          }`}>
            {cart.map(item => {
              const discount = Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100);
              return (
                <div key={item.product.id} className="p-3.5 border-b border-fk-border last:border-0 flex gap-3">
                  {/* Pic */}
                  <div className="w-16 h-16 border border-fk-border rounded flex items-center justify-center p-1 shrink-0 bg-white">
                    <img src={item.product.image} alt={item.product.title} className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Info details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-2 items-start leading-none">
                        <h3 className="font-bold text-[11px] text-gray-800 line-clamp-1">{item.product.title}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <span className="text-[8px] text-[#64748B] font-bold block mt-1">{item.product.brand}</span>
                    </div>

                    <div className="flex justify-between items-center mt-2.5">
                      <div className="flex items-center border border-fk-border rounded overflow-hidden text-[10px] font-bold bg-white">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-slate-50">
                          <Minus size={10} />
                        </button>
                        <span className="px-2 min-w-[15px] text-center select-none">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-slate-50">
                          <Plus size={10} />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1.5 leading-none">
                        <span className="text-[11px] font-extrabold text-[#172337]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                        {item.product.originalPrice > item.product.price && (
                          <>
                            <span className="text-[9px] text-[#64748B] line-through">₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}</span>
                            <span className="text-[8px] text-[#FF6B00] font-bold">{discount}% Off</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing breakdown summary */}
          <div className={`border border-fk-border rounded-lg p-4 ${
            isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white shadow-sm'
          }`}>
            <span className="font-extrabold text-[10px] uppercase tracking-wider text-[#64748B] block mb-2.5 border-b border-fk-border pb-1.5">Price details</span>
            <div className="flex flex-col gap-2.5 text-[10px] font-bold text-[#64748B]">
              <div className="flex justify-between">
                <span>Items total original price</span>
                <span>₹{originalPriceTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Savings discount</span>
                <span className="text-[#16A34A]">-₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-fk-border pt-2.5 text-xs font-extrabold text-[#172337] dark:text-white">
                <span>Total Amount to Pay</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Bottom Billing & Action Bar */}
        <div className="fixed bottom-14 left-0 right-0 h-14 bg-white border-t border-fk-border flex items-center justify-between px-4 z-40 select-none shadow-md3_3">
          <div className="flex flex-col text-left leading-none">
            <span className="text-xs font-extrabold text-[#172337]">₹{cartTotal.toLocaleString('en-IN')}</span>
            <span className="text-[9px] text-[#16A34A] font-bold mt-0.5">Saved ₹{totalSavings.toLocaleString('en-IN')}!</span>
          </div>
          <button
            onClick={placeOrder}
            className="px-6 py-2.5 bg-[#fb641b] text-white font-extrabold text-[10px] rounded uppercase tracking-wider shadow transform active:scale-95"
          >
            Place Order
          </button>
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};
