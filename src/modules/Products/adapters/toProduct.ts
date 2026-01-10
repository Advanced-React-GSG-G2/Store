// adapters/toProduct.ts

import type { ProductDto } from "../dto/Product";
import type { Product } from "../entities/Product";

export const toProduct = (dto: ProductDto): Product => ({
  id: dto.id,
  name: dto.title,
  price: dto.price,
  image: dto.thumbnail,
  category: dto.category,
  availabilityStatus:
    dto.stock === 0
      ? "Out of Stock"
      : dto.stock < 10
      ? "Low Stock"
      : "In Stock",
  ratingLabel:
    dto.rating >= 4.5 ? "Excellent" : dto.rating >= 3 ? "Good" : "Bad",
});
