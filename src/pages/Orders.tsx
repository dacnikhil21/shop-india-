import React from 'react';
import { useApp } from '../context/AppContext';
import type { Order } from '../context/AppContext';
import { useIsMobile } from '../hooks/useMediaQuery';
import { Package, CheckCircle2, MapPin, Truck } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, navigateTo, currentVertical } = useApp();
  const isMobile = useIsMobile();

  const isServices = currentVertical === 'services';

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-6 text-center select-none text-[#172337]">
        <div className={`p-10 border rounded-lg flex flex-col items-center justify-center ${
          isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
        }`}>
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-[#2874F0] mb-4">
            <Package size={36} />
          </div>
          <h2 className="text-base font-extrabold text-gray-900 mb-1 dark:text-white">No Orders Placed Yet!</h2>
          <p className="text-xs text-gray-400 max-w-sm mb-6 font-semibold">You haven't placed any orders on ShopIndia. Start exploring products and services.</p>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 bg-[#2874F0] hover:bg-[#1557D6] text-white font-bold text-xs rounded uppercase tracking-wider shadow-sm transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // Helper to determine status progress step
  const getStatusStepIndex = (status: Order['status']) => {
    const steps: Order['status'][] = ['placed', 'confirmed', 'packing', 'shipping', 'delivered'];
    return steps.indexOf(status);
  };

  const steps = [
    { id: 'placed', label: 'Order Placed' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'packing', label: 'Preparing' },
    { id: 'shipping', label: 'Out for Delivery' },
    { id: 'delivered', label: 'Delivered' }
  ];

  // Helper for tracking bar styling
  const getVerticalColorClass = (vertical: Order['vertical']) => {
    if (vertical === 'quick') return 'bg-[#16A34A]';
    if (vertical === 'services') return 'bg-services-gold';
    return 'bg-[#2874F0]';
  };

  const getVerticalTextColorClass = (vertical: Order['vertical']) => {
    if (vertical === 'quick') return 'text-[#16A34A]';
    if (vertical === 'services') return 'text-services-gold';
    return 'text-[#2874F0]';
  };

  const getVerticalBadgeText = (vertical: Order['vertical']) => {
    if (vertical === 'quick') return '10 Min Quick Commerce';
    if (vertical === 'services') return 'Home Services';
    return 'Shop E-Commerce';
  };

  // Live map/route animation widget for 10 Min quick commerce orders
  const renderLiveCourierTracking = (order: Order) => {
    const activeIndex = getStatusStepIndex(order.status);
    const progressPercent = activeIndex * 25; // 0, 25, 50, 75, 100

    return (
      <div className={`mt-5 p-4 rounded-lg border text-left flex flex-col gap-3 relative overflow-hidden ${
        isServices ? 'bg-zinc-950 border-services-border' : 'bg-slate-50 border-fk-border'
      }`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-[#16A34A] animate-bounce" />
            <span className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider">Live Delivery Status</span>
          </div>
          <span className="text-[10px] font-extrabold text-[#16A34A] bg-[#eefcf2] px-2 py-0.5 rounded border border-green-100">
            ETA: {order.deliveryTimeEstimate}
          </span>
        </div>

        {/* Courier Scooter Dotted Line Route Animation */}
        <div className="w-full h-16 bg-white border border-fk-border rounded-md relative flex items-center px-4 overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
          {/* Start Point */}
          <div className="flex flex-col items-center z-10">
            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
            </div>
            <span className="text-[8px] text-[#64748B] font-bold mt-1">Warehouse</span>
          </div>

          {/* Dotted Path Line */}
          <div className="flex-1 h-0.5 border-t border-dashed border-slate-350 mx-2 relative">
            {/* Scooter Icon sliding on path based on progress */}
            <div
              className="absolute -top-3.5 transition-all duration-1000 ease-out"
              style={{ left: `calc(${progressPercent}% - 10px)` }}
            >
              <div className="flex flex-col items-center">
                <span className="text-base select-none">🛵</span>
                <span className="text-[7px] text-[#16A34A] font-extrabold bg-[#eefcf2] px-1.5 py-0.2 rounded border border-green-100 whitespace-nowrap shadow-xs">
                  {order.status === 'delivered' ? 'Arrived' : 'On the Way'}
                </span>
              </div>
            </div>
          </div>

          {/* End Point */}
          <div className="flex flex-col items-center z-10">
            <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            </div>
            <span className="text-[8px] text-[#64748B] font-bold mt-1">Home</span>
          </div>
        </div>

        <div className="flex gap-2 items-center text-[10px] text-gray-500">
          <MapPin size={12} className="text-[#16A34A]" />
          <span>Rider assigned: <strong>Ramesh Kumar</strong> is delivering to: <strong className="text-gray-700 dark:text-white">{order.location}</strong></span>
        </div>
      </div>
    );
  };

  // Desktop Page Layout
  const renderDesktop = () => {
    return (
      <div className="max-w-5xl mx-auto px-12 py-8 text-left select-none text-[#172337]">
        <h1 className={`text-xl font-bold mb-6 ${isServices ? 'text-white' : 'text-[#172337]'}`}>
          Order History & Live Tracking
        </h1>

        <div className="flex flex-col gap-6">
          {orders.map(order => {
            const activeIndex = getStatusStepIndex(order.status);
            const isFinished = order.status === 'delivered';

            return (
              <div
                key={order.id}
                className={`border rounded-md p-5 flex flex-col gap-4 ${
                  isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white border-fk-border shadow-sm'
                }`}
              >
                {/* Order Meta Header */}
                <div className="flex justify-between items-center border-b border-fk-border pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#172337] dark:text-white">Order ID: #{order.id}</span>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${
                      order.vertical === 'quick'
                        ? 'bg-[#eefcf2] text-[#16A34A] border-green-150'
                        : order.vertical === 'services'
                        ? 'bg-services-gold/10 text-services-gold border-services-gold/20'
                        : 'bg-blue-50 text-[#2874F0] border-blue-150'
                    }`}>
                      {getVerticalBadgeText(order.vertical)}
                    </span>
                  </div>
                  <span className="text-xs text-[#64748B] font-semibold">Placed on: {order.date}</span>
                </div>

                {/* Ordered Items row */}
                <div className="flex flex-col gap-3">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded border border-fk-border p-1 flex items-center justify-center shrink-0 bg-white">
                        <img src={item.product.image} alt={item.product.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 leading-normal">
                        <span className="text-xs font-bold text-[#172337] dark:text-white line-clamp-1">{item.product.title}</span>
                        <span className="text-[10px] text-[#64748B] block font-semibold">Qty: {item.quantity} • Paid Price: ₹{item.product.price}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#172337] dark:text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress bar tracking status timeline */}
                <div className="py-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-extrabold text-[#64748B] tracking-wider">
                    <span>Order Tracking Timeline</span>
                    <span className={getVerticalTextColorClass(order.vertical)}>
                      Status: {order.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Horizontal Timeline Steps */}
                  <div className="relative flex justify-between items-center mt-4">
                    {/* Background Progress bar line */}
                    <div className="absolute left-2.5 right-2.5 top-[7px] h-0.5 bg-gray-200 z-0" />
                    <div
                      className={`absolute left-2.5 top-[7px] h-0.5 transition-all duration-500 z-0 ${getVerticalColorClass(order.vertical)}`}
                      style={{ width: `calc(${activeIndex * 25}% - 10px)` }}
                    />

                    {steps.map((step, idx) => {
                      const isActive = idx <= activeIndex;
                      return (
                        <div key={step.id} className="flex flex-col items-center z-10 relative w-20 text-center select-none">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                            isActive
                              ? `${getVerticalColorClass(order.vertical)} border-transparent text-white`
                              : 'bg-white border-gray-300 text-gray-300'
                          }`}>
                            {isActive && <CheckCircle2 size={10} className="stroke-white" />}
                          </div>
                          <span className={`text-[9px] font-bold mt-2 whitespace-nowrap ${
                            isActive ? 'text-gray-900 dark:text-white font-extrabold' : 'text-[#64748B]'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Render live map tracking scooter for Quick commerce groceries */}
                {order.vertical === 'quick' && !isFinished && renderLiveCourierTracking(order)}

                {/* Summary Row */}
                <div className="border-t border-fk-border pt-3.5 flex justify-between items-center mt-2 text-xs font-semibold leading-none">
                  <span className="text-[#64748B]">Scheduled/Delivered location: <strong>{order.location.split(',')[0]}</strong></span>
                  <span className="text-sm font-extrabold text-[#172337] dark:text-white">
                    Grand Total Paid: ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            );
          })}
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
          isServices ? 'bg-zinc-900 border-services-border text-white' : 'bg-white border-fk-border text-[#172337]'
        }`}>
          <span className="font-extrabold text-xs tracking-wide">Orders & Tracking</span>
        </div>

        {/* Orders Feed */}
        <div className="p-2.5 flex flex-col gap-3">
          {orders.map(order => {
            const activeIndex = getStatusStepIndex(order.status);
            const isFinished = order.status === 'delivered';

            return (
              <div
                key={order.id}
                className={`border border-fk-border rounded-lg p-3.5 flex flex-col gap-3.5 ${
                  isServices ? 'bg-services-card border-services-border text-services-text' : 'bg-white shadow-sm'
                }`}
              >
                {/* Meta details */}
                <div className="flex justify-between items-center border-b border-fk-border pb-2">
                  <span className="text-[10px] font-bold text-gray-900 dark:text-white">ID: #{order.id}</span>
                  <span className="text-[9px] text-slate-400 font-bold">{order.date.split(',')[0]}</span>
                </div>

                {/* Ordered Items */}
                <div className="flex flex-col gap-2.5">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex gap-3 items-center">
                      <div className="w-10 h-10 border border-fk-border rounded p-0.5 flex items-center justify-center shrink-0 bg-white">
                        <img src={item.product.image} alt={item.product.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 leading-tight">
                        <span className="text-[10px] font-bold text-gray-800 dark:text-white line-clamp-1">{item.product.title}</span>
                        <span className="text-[8px] text-[#64748B] block font-bold">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile simplified tracking timeline */}
                <div className="flex flex-col gap-1.5 py-1">
                  <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-wide">
                    <span>Order Progress</span>
                    <span className={getVerticalTextColorClass(order.vertical)}>Status: {order.status}</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1 border border-fk-border">
                    <div
                      className={`h-full ${getVerticalColorClass(order.vertical)}`}
                      style={{ width: `${(activeIndex + 1) * 20}%` }}
                    />
                  </div>
                </div>

                {/* Live tracking courier widget for mobile quickcommerce */}
                {order.vertical === 'quick' && !isFinished && renderLiveCourierTracking(order)}

                {/* Total amount paid */}
                <div className="border-t border-fk-border pt-2.5 flex justify-between items-center text-[10px] font-bold">
                  <span className="text-[#64748B]">Total Price Paid</span>
                  <span className="text-xs font-extrabold text-[#172337] dark:text-white">₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return isMobile ? renderMobile() : renderDesktop();
};
