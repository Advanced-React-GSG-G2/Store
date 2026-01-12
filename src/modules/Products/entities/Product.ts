export type AvailabilityStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type RatingLabel = "Excellent" | "Good" | "Bad";

export type ProductFilters = {
  category?: string | string[];
  availabilityStatus?: AvailabilityStatus | AvailabilityStatus[];
  ratingLabel?: RatingLabel | RatingLabel[];
  minPrice?: number;
  maxPrice?: number;
  discountedOnly?: boolean;
  minDiscountPercentage?: number;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string; 
  image: string;
  availabilityStatus: AvailabilityStatus;
  ratingLabel: RatingLabel;
  discountPercentage: number;
};
