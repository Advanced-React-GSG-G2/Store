export type AvailabilityStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type RatingLabel = "Excellent" | "Good" | "Bad";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string; 
  image: string;
  availabilityStatus: AvailabilityStatus;
  ratingLabel: RatingLabel;
};
