// Category to image mapping for better visual experience
const categoryImageMap = {
  // Electronics & Technology
  smartphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format',
  mobile: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format',
  phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format',
  iphone: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=300&fit=crop&auto=format',
  android: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format',
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format',
  computer: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=400&h=300&fit=crop&auto=format',
  tablet: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&auto=format',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format',
  earphones: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop&auto=format',
  speaker: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop&auto=format',
  camera: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&auto=format',
  watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format',
  smartwatch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format',
  television: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&auto=format',
  tv: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&auto=format',

  // Fashion & Clothing
  clothing: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format',
  shirt: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=300&fit=crop&auto=format',
  tshirt: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&auto=format',
  dress: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop&auto=format',
  jeans: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop&auto=format',
  pants: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop&auto=format',
  jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop&auto=format',
  sweater: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop&auto=format',
  shoes: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&auto=format',
  sneakers: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop&auto=format',
  boots: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=300&fit=crop&auto=format',
  bag: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format',
  handbag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop&auto=format',

  // Beauty & Personal Care
  cosmetics: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format',
  makeup: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&auto=format',
  skincare: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=300&fit=crop&auto=format',
  perfume: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&auto=format',
  fragrance: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop&auto=format',

  // Home & Kitchen
  furniture: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format',
  chair: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop&auto=format',
  table: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop&auto=format',
  sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format',
  bed: 'https://images.unsplash.com/photo-1571508601085-3e8c3a5a7e63?w=400&h=300&fit=crop&auto=format',
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format',
  appliances: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format',

  // Sports & Fitness
  sports: 'https://images.unsplash.com/photo-1571019613914-85b7cb2d3ded?w=400&h=300&fit=crop&auto=format',
  fitness: 'https://images.unsplash.com/photo-1571019613914-85b7cb2d3ded?w=400&h=300&fit=crop&auto=format',
  gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&auto=format',
  yoga: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop&auto=format',
  bicycle: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format',
  bike: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format',

  // Books & Education
  books: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format',
  book: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format',
  education: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format',
  stationery: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format',

  // Food & Beverages
  food: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format',
  snacks: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop&auto=format',
  beverage: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&auto=format',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format',
  tea: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format',

  // Toys & Games
  toys: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop&auto=format',
  games: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&auto=format',
  gaming: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&auto=format',

  // Jewelry & Accessories
  jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&auto=format',
  necklace: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&auto=format',
  ring: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&auto=format',
  bracelet: 'https://images.unsplash.com/photo-1611652022313-8b5094c37e67?w=400&h=300&fit=crop&auto=format',

  // Automotive
  automotive: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop&auto=format',
  car: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop&auto=format',
  motorcycle: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format',

  // Default fallback
  default: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format'
};

// Function to get category image based on category name
export const getCategoryImage = (category, productName = '', brand = '') => {
  if (!category) {
    // If no category, try to infer from product name or brand
    const searchText = `${productName} ${brand}`.toLowerCase();
    
    // Try to match keywords in product name/brand
    for (const [key, imageUrl] of Object.entries(categoryImageMap)) {
      if (searchText.includes(key)) {
        return imageUrl;
      }
    }
    
    return categoryImageMap.default;
  }

  const normalizedCategory = category.toLowerCase().trim();
  
  // Direct match
  if (categoryImageMap[normalizedCategory]) {
    return categoryImageMap[normalizedCategory];
  }

  // Partial match - check if category contains any of our keys
  for (const [key, imageUrl] of Object.entries(categoryImageMap)) {
    if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
      return imageUrl;
    }
  }

  // Return default if no match found
  return categoryImageMap.default;
};

// Function to get brand-specific image if available
export const getBrandImage = (brand, category) => {
  const normalizedBrand = brand?.toLowerCase();
  
  // Brand-specific mappings
  const brandImageMap = {
    apple: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=300&fit=crop&auto=format',
    samsung: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format',
    nike: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format',
    adidas: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&auto=format',
    sony: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format',
    microsoft: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=400&h=300&fit=crop&auto=format',
    google: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format',
  };

  if (normalizedBrand && brandImageMap[normalizedBrand]) {
    return brandImageMap[normalizedBrand];
  }

  // Fall back to category image
  return getCategoryImage(category);
};

export default { getCategoryImage, getBrandImage }; 