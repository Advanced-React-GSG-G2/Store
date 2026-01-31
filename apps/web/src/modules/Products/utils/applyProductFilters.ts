import type { Product, ProductFilters } from "../entities/Product";

const toArray = <T>(value?: T | T[]): T[] | undefined => {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
};

export const applyProductFilters = (
  products: Product[],
  filters?: ProductFilters,
): Product[] => {
  if (!filters) return products;

  const categories = toArray(filters.category)?.map((category) =>
    category.toLowerCase(),
  );
  const availabilityStatuses = toArray(filters.availabilityStatus);
  const ratingLabels = toArray(filters.ratingLabel);
  const minPrice = filters.minPrice;
  const maxPrice = filters.maxPrice;
  const discountedOnly = filters.discountedOnly;
  const minDiscountPercentage = filters.minDiscountPercentage;

  return products.filter((product) => {
    if (
      categories &&
      !categories.includes(product.category.toLowerCase())
    ) {
      return false;
    }

    if (
      availabilityStatuses &&
      !availabilityStatuses.includes(product.availabilityStatus)
    ) {
      return false;
    }

    if (ratingLabels && !ratingLabels.includes(product.ratingLabel)) {
      return false;
    }

    if (minPrice !== undefined && product.price < minPrice) {
      return false;
    }

    if (maxPrice !== undefined && product.price > maxPrice) {
      return false;
    }

    if (discountedOnly && product.discountPercentage <= 0) {
      return false;
    }

    if (
      minDiscountPercentage !== undefined &&
      product.discountPercentage < minDiscountPercentage
    ) {
      return false;
    }

    return true;
  });
};
