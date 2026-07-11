import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../data/mockData';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Supabase query to get all active products
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Map DB snake_case fields to camelCase Product interface expected by UI
          const formattedProducts: Product[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            originalPrice: item.original_price || item.price,
            rating: item.rating || 4.5,
            ratingCount: item.rating_count || Math.floor(Math.random() * 1000),
            image: item.image,
            category: item.category,
            brand: item.brand,
            vertical: item.vertical,
            specs: item.specs,
            deliveryTime: item.delivery_time,
            isAssured: item.is_assured
          }));
          setProducts(formattedProducts);
        }
      } catch (err: any) {
        console.error('Error fetching products:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
