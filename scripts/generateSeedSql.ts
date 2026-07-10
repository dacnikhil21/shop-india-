import { PRODUCTS } from '../src/data/mockData.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeSqlString(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

function generateSql() {
  console.log(`Generating SQL for ${PRODUCTS.length} products...`);
  
  let sql = '-- Run this in Supabase SQL Editor to seed the products table\n\n';
  
  PRODUCTS.forEach(p => {
    const id = escapeSqlString(p.id);
    const title = escapeSqlString(p.title);
    const description = escapeSqlString(p.description);
    const price = p.price;
    const originalPrice = p.originalPrice || 'NULL';
    const rating = p.rating || 0;
    const ratingCount = p.ratingCount || 0;
    const image = escapeSqlString(p.image);
    const category = escapeSqlString(p.category);
    const brand = escapeSqlString(p.brand);
    const vertical = escapeSqlString(p.vertical);
    const isAssured = p.isAssured ? 'true' : 'false';
    const deliveryTime = escapeSqlString(p.deliveryTime);
    const specs = p.specs ? escapeSqlString(JSON.stringify(p.specs)) : 'NULL';
    
    sql += `INSERT INTO products (id, title, description, price, original_price, rating, rating_count, image, category, brand, vertical, is_assured, delivery_time, specs) VALUES (${id}, ${title}, ${description}, ${price}, ${originalPrice}, ${rating}, ${ratingCount}, ${image}, ${category}, ${brand}, ${vertical}, ${isAssured}, ${deliveryTime}, ${specs}) ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, price=EXCLUDED.price;\n`;
  });

  const outputPath = path.resolve(__dirname, '../supabase/seed.sql');
  fs.writeFileSync(outputPath, sql);
  console.log(`Generated SQL seed file at: ${outputPath}`);
}

generateSql();
