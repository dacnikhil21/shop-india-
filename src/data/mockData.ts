export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingCount: number;
  image: string;
  category: string;
  brand: string;
  vertical: 'shop' | 'quick' | 'services';
  specs?: Record<string, string>;
  deliveryTime?: string; // e.g. "Tomorrow, 11 AM" or "10 mins" or "Tomorrow at 4 PM"
  isAssured?: boolean; // ShopIndia Assured badge
  quantity?: number; // for cart
}

export interface Category {
  id: string;
  name: string;
  image: string;
  vertical: 'shop' | 'quick' | 'services';
}

export const CATEGORIES: Category[] = [
  // Shop Categories
  { id: 's-mobiles', name: 'Mobiles & Tablets', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60', vertical: 'shop' },
  { id: 's-electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&auto=format&fit=crop&q=60', vertical: 'shop' },
  { id: 's-fashion', name: 'Fashion & Apparel', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&auto=format&fit=crop&q=60', vertical: 'shop' },
  { id: 's-appliances', name: 'Appliances', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=150&auto=format&fit=crop&q=60', vertical: 'shop' },
  { id: 's-home', name: 'Home & Furniture', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=150&auto=format&fit=crop&q=60', vertical: 'shop' },
  { id: 's-toys', name: 'Toys & Beauty', image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=150&auto=format&fit=crop&q=60', vertical: 'shop' },

  // 10 Min (Quick Commerce) Categories
  { id: 'q-fruits', name: 'Fruits & Veggies', image: 'https://images.unsplash.com/photo-1610832958506-ee5633613df2?w=150&auto=format&fit=crop&q=60', vertical: 'quick' },
  { id: 'q-dairy', name: 'Dairy, Bread & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&auto=format&fit=crop&q=60', vertical: 'quick' },
  { id: 'q-snacks', name: 'Snacks & Munchies', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?w=150&auto=format&fit=crop&q=60', vertical: 'quick' },
  { id: 'q-drinks', name: 'Cold Drinks & Juices', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=60', vertical: 'quick' },
  { id: 'q-instant', name: 'Instant Food', image: 'https://images.unsplash.com/photo-1612966608967-312ba5987236?w=150&auto=format&fit=crop&q=60', vertical: 'quick' },
  { id: 'q-household', name: 'Home & Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60', vertical: 'quick' },

  // Services Categories
  { id: 'v-appliance', name: 'Appliance Repair', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=60', vertical: 'services' },
  { id: 'v-cleaning', name: 'Home Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60', vertical: 'services' },
  { id: 'v-salon', name: 'Salon & Massage', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=60', vertical: 'services' },
  { id: 'v-electrician', name: 'Electricians & Plumbers', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=150&auto=format&fit=crop&q=60', vertical: 'services' },
  { id: 'v-painting', name: 'Painting & Decor', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=60', vertical: 'services' }
];

export const PRODUCTS: Product[] = [
  // --- SHOP VERTICAL PRODUCTS ---
  {
    id: 's1',
    title: 'iPhone 15 Pro (128 GB) - Natural Titanium',
    description: 'iPhone 15 Pro has a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that is tougher than any smartphone glass.',
    price: 127999,
    originalPrice: 134900,
    rating: 4.7,
    ratingCount: 14500,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=60',
    category: 's-mobiles',
    brand: 'Apple',
    vertical: 'shop',
    isAssured: true,
    deliveryTime: 'Delivery by Tomorrow, 10 AM',
    specs: {
      'Display': '6.1-inch Super Retina XDR OLED',
      'Processor': 'A17 Pro Chip with 6-core GPU',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto',
      'Battery': 'Up to 23 hours video playback',
      'Weight': '187g'
    }
  },
  {
    id: 's2',
    title: 'Samsung Galaxy S24 Ultra (256 GB) - Titanium Gray',
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
    price: 129999,
    originalPrice: 139999,
    rating: 4.8,
    ratingCount: 8900,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=60',
    category: 's-mobiles',
    brand: 'Samsung',
    vertical: 'shop',
    isAssured: true,
    deliveryTime: 'Delivery by Saturday, 2 PM',
    specs: {
      'Display': '6.8-inch Dynamic AMOLED 2X, 120Hz',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Camera': '200MP + 50MP + 12MP + 10MP Quad Camera',
      'Battery': '5000 mAh with 45W Fast Charging',
      'S-Pen': 'Included inside body'
    }
  },
  {
    id: 's3',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Sony WH-1000XM5 wireless headphones with Auto Noise Cancelling Optimizer, 30 hours battery life, and crystal clear hands-free calling.',
    price: 29990,
    originalPrice: 34990,
    rating: 4.6,
    ratingCount: 22400,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60',
    category: 's-electronics',
    brand: 'Sony',
    vertical: 'shop',
    isAssured: true,
    deliveryTime: 'Delivery by Tomorrow, 12 PM',
    specs: {
      'Battery Life': 'Up to 30 Hours (ANC On)',
      'Noise Cancelling': 'Industry Leading Auto-ANC',
      'Connectivity': 'Bluetooth 5.2, Multipoint Connection',
      'Microphones': '8 Mics for ultra clear calls'
    }
  },
  {
    id: 's4',
    title: 'MacBook Air M3 (13-inch, 8GB RAM, 256GB SSD)',
    description: 'The MacBook Air with M3 chip is super portable and incredibly fast, so you can breeze through work and play.',
    price: 104900,
    originalPrice: 114900,
    rating: 4.7,
    ratingCount: 3120,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60',
    category: 's-electronics',
    brand: 'Apple',
    vertical: 'shop',
    isAssured: true,
    deliveryTime: 'Delivery in 2 Days',
    specs: {
      'Processor': 'Apple M3 Chip (8-core CPU, 10-core GPU)',
      'Display': '13.6-inch Liquid Retina Display',
      'RAM': '8GB Unified Memory',
      'Storage': '256GB Superfast SSD',
      'Battery': 'Up to 18 hours'
    }
  },
  {
    id: 's5',
    title: 'Nike Air Max Air Jordan 1 Low Sneaker',
    description: 'Inspired by the original AJ1, this low-top edition maintains the iconic look you love, while choice colors and crisp leather give it a distinct identity.',
    price: 8995,
    originalPrice: 9995,
    rating: 4.5,
    ratingCount: 1540,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60',
    category: 's-fashion',
    brand: 'Nike',
    vertical: 'shop',
    isAssured: false,
    deliveryTime: 'Delivery by Monday, 5 PM',
    specs: {
      'Material': 'Genuine and Synthetic Leather Upper',
      'Cushioning': 'Encapsulated Air-Sole unit',
      'Outsole': 'Solid Rubber Outsole',
      'Style': 'Basketball/Lifestyle Sneaker'
    }
  },
  {
    id: 's6',
    title: 'Premium Ergonomic Office Chair with Lumbar Support',
    description: 'Designed for comfort and utility, this chair features high-density mesh backing, customizable armrests, and dynamic tilt control.',
    price: 14999,
    originalPrice: 24999,
    rating: 4.3,
    ratingCount: 4230,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=600&auto=format&fit=crop&q=60',
    category: 's-home',
    brand: 'Green Soul',
    vertical: 'shop',
    isAssured: true,
    deliveryTime: 'Delivery in 4 Days',
    specs: {
      'Backrest': 'Breathable Korean Mesh',
      'Base': 'Heavy-duty Metal Base',
      'Gas Lift': 'Class 4 Pneumatic Lift',
      'Max Weight': '135 kg'
    }
  },

  // --- 10 MIN VERTICAL PRODUCTS ---
  {
    id: 'q1',
    title: 'Fresh Organic Banana (Robusta)',
    description: 'Bananas are rich in potassium, vitamin B6, vitamin C, and dietary fiber, making them an excellent healthy snack.',
    price: 49,
    originalPrice: 65,
    rating: 4.6,
    ratingCount: 450,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=60',
    category: 'q-fruits',
    brand: 'FreshFarm',
    vertical: 'quick',
    deliveryTime: '10 Mins',
    specs: {
      'Weight': '500g (approx 4-5 units)',
      'Storage': 'Store in room temperature',
      'Shelf Life': '2-3 days'
    }
  },
  {
    id: 'q2',
    title: 'Amul Taaza Toned Milk (1L)',
    description: 'Homogenized toned milk, fresh and pure, pasteurized to kill pathogens and packaged in a sterile environment.',
    price: 56,
    originalPrice: 56,
    rating: 4.8,
    ratingCount: 3820,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=60',
    category: 'q-dairy',
    brand: 'Amul',
    vertical: 'quick',
    deliveryTime: '9 Mins',
    specs: {
      'Volume': '1 Liter',
      'Fat Content': '3% Min',
      'Storage': 'Keep refrigerated'
    }
  },
  {
    id: 'q3',
    title: 'Lay\'s India\'s Magic Masala Potato Chips (115g)',
    description: 'Perfectly ridges potato chips infused with spicy, rich, traditional Indian spices and masala flavor.',
    price: 50,
    originalPrice: 50,
    rating: 4.5,
    ratingCount: 12800,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=60',
    category: 'q-snacks',
    brand: 'Lays',
    vertical: 'quick',
    deliveryTime: '8 Mins',
    specs: {
      'Weight': '115g',
      'Dietary': 'Vegetarian',
      'Container': 'Pack'
    }
  },
  {
    id: 'q4',
    title: 'Coca-Cola Soft Drink Can (300ml)',
    description: 'Indulge in the refreshing taste of Coca-Cola, the classic, fizzy soda loved worldwide.',
    price: 40,
    originalPrice: 45,
    rating: 4.7,
    ratingCount: 9400,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=60',
    category: 'q-drinks',
    brand: 'Coca Cola',
    vertical: 'quick',
    deliveryTime: '11 Mins',
    specs: {
      'Volume': '300 ml',
      'Servings': '1 Can',
      'Taste': 'Original Sweet Cola'
    }
  },
  {
    id: 'q5',
    title: 'Maggi 2-Minute Instant Masala Noodles (560g)',
    description: 'Maggi instant noodles are a favorite quick snack, made with choice spices and ready in 2 minutes.',
    price: 104,
    originalPrice: 112,
    rating: 4.7,
    ratingCount: 22400,
    image: 'https://images.unsplash.com/photo-1612966608967-312ba5987236?w=600&auto=format&fit=crop&q=60',
    category: 'q-instant',
    brand: 'Nestle',
    vertical: 'quick',
    deliveryTime: '8 Mins',
    specs: {
      'Weight': '560g (8 Packs)',
      'Flavor': 'Masala',
      'Cooking Time': '2-3 Minutes'
    }
  },
  {
    id: 'q6',
    title: 'Fresh Organic Tomato (Hybrid)',
    description: 'Juicy, red hybrid tomatoes sourced directly from local organic farms. Excellent for curries and salads.',
    price: 39,
    originalPrice: 55,
    rating: 4.4,
    ratingCount: 630,
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop&q=60',
    category: 'q-fruits',
    brand: 'FreshFarm',
    vertical: 'quick',
    deliveryTime: '10 Mins',
    specs: {
      'Weight': '500g',
      'Sourced from': 'Local Farms',
      'Quality': 'Assured Grade A'
    }
  },

  // --- SERVICES VERTICAL PRODUCTS ---
  {
    id: 'v1',
    title: 'AC Service & Repair (Jet Pump Clean)',
    description: 'Deep Jet-Pump cleaning of both indoor and outdoor units, gas pressure check-ups, and a 30-day service warranty.',
    price: 599,
    originalPrice: 899,
    rating: 4.8,
    ratingCount: 42300,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=60',
    category: 'v-appliance',
    brand: 'UrbanCare',
    vertical: 'services',
    deliveryTime: 'Tomorrow at 10 AM',
    specs: {
      'Duration': '45 - 60 Minutes',
      'Warranty': '30 Days Repair Warranty',
      'Coverage': 'Includes indoor filter + outdoor jet clean',
      'Spare Parts': 'Charged extra if replaced'
    }
  },
  {
    id: 'v2',
    title: 'Full Home Deep Cleaning Service',
    description: 'Comprehensive deep cleaning of rooms, kitchen, washrooms, balcony, windows, floor vacuuming and scrubbing.',
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    ratingCount: 15400,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60',
    category: 'v-cleaning',
    brand: 'Elite Cleaners',
    vertical: 'services',
    deliveryTime: 'Saturday at 8 AM',
    specs: {
      'Professionals': '3 - 4 Trained cleaners',
      'Duration': '5 - 6 Hours',
      'Materials': 'Eco-friendly cleaning agents, heavy machinery',
      'Excludes': 'Terrace, paint stain scrape-off'
    }
  },
  {
    id: 'v3',
    title: 'Men\'s Grooming - Salon at Home',
    description: 'Haircut, hair styling, beard grooming, face massage, and head massage. Relax in the comfort of your own living room.',
    price: 799,
    originalPrice: 1200,
    rating: 4.9,
    ratingCount: 34500,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=60',
    category: 'v-salon',
    brand: 'GroomPro',
    vertical: 'services',
    deliveryTime: 'Today at 6 PM',
    specs: {
      'Includes': 'Haircut + Beard trim + Head massage',
      'Duration': '45 Mins',
      'Hygiene': '100% disposable tools and kit sheets used'
    }
  },
  {
    id: 'v4',
    title: 'Expert Home Electrical Check-up & Repairs',
    description: 'Book a certified electrician for fixing switchboards, hanging lights, geyser repair, fuse installations, or general rewiring.',
    price: 199,
    originalPrice: 299,
    rating: 4.6,
    ratingCount: 18900,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=60',
    category: 'v-electrician',
    brand: 'UrbanCare',
    vertical: 'services',
    deliveryTime: 'Today, within 2 Hours',
    specs: {
      'Base Inspection': '₹199 (Adjusted in final repairs)',
      'Electrician': 'Government Certified Partner',
      'Safety': 'Equipped with insulation mats & testing tools'
    }
  }
];

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  vertical: 'shop' | 'quick' | 'services';
  bgColor?: string;
}

export const BANNERS: Banner[] = [
  // Shop Banners
  {
    id: 'b-s1',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80',
    title: 'Big Saving Days Are Live!',
    subtitle: 'Up to 80% off on Mobiles & Laptops. Shop Now!',
    vertical: 'shop',
    bgColor: 'bg-indigo-600'
  },
  {
    id: 'b-s2',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80',
    title: 'Redefine Your Style',
    subtitle: 'Brand new Winter collection at lowest prices ever.',
    vertical: 'shop',
    bgColor: 'bg-yellow-500'
  },

  // 10 Min Banners
  {
    id: 'b-q1',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80',
    title: 'Freshness in 10 Minutes!',
    subtitle: 'From local farms to your kitchen counter. Get ₹100 flat cashback.',
    vertical: 'quick',
    bgColor: 'bg-green-700'
  },
  {
    id: 'b-q2',
    image: 'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=1600&auto=format&fit=crop&q=80',
    title: 'Munchies & Soda Rush',
    subtitle: 'Snacks, candies and beverages delivered ice-cold.',
    vertical: 'quick',
    bgColor: 'bg-emerald-600'
  },

  // Services Banners
  {
    id: 'b-v1',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&auto=format&fit=crop&q=80',
    title: 'AC Jet Cleaning @ ₹599',
    subtitle: 'Stay cool this summer. 4.8★ rated technicians.',
    vertical: 'services',
    bgColor: 'bg-neutral-900'
  },
  {
    id: 'b-v2',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1600&auto=format&fit=crop&q=80',
    title: 'Home Makeover: Professional Painting',
    subtitle: 'Consultation & color checkups free of cost. Book now.',
    vertical: 'services',
    bgColor: 'bg-zinc-800'
  }
];
