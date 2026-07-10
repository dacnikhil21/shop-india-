import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { PRODUCTS } from '../src/data/mockData.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load .env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedProducts() {
  console.log(`Starting to seed ${PRODUCTS.length} products...`);
  
  // Transform PRODUCTS to match Supabase schema
  const formattedProducts = PRODUCTS.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    original_price: p.originalPrice,
    rating: p.rating,
    rating_count: p.ratingCount,
    image: p.image,
    category: p.category,
    brand: p.brand || null,
    vertical: p.vertical,
    is_assured: p.isAssured || false,
    delivery_time: p.deliveryTime || null,
    specs: p.specs || null
  }));

  // Upsert products to avoid duplicates if run multiple times
  const { data, error } = await supabase
    .from('products')
    .upsert(formattedProducts, { onConflict: 'id' });

  if (error) {
    console.error("Error seeding products:", error.message);
  } else {
    console.log("Successfully seeded products!");
  }
}

seedProducts();
