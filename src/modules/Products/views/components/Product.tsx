

import { Star, ShoppingCart, Package } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import type { Product as ProductType } from "../../entities/Product";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { Link } from "react-router-dom";

type ProductProps = {
  product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
  const getStockVariant = (status: string) => {
    if (status === "In Stock") return "default";
    if (status === "Low Stock") return "secondary";
    return "destructive";
  };

  const getRatingStars = (label: string) => {
    if (label === "Excellent") return 5;
    if (label === "Good") return 3;
    return 1;
  };

  const getRatingColor = (label: string) => {
    if (label === "Excellent") return "text-amber-400";
    if (label === "Good") return "text-amber-300";
    return "text-gray-400";
  };

  const { deleteProduct, isSuccess } = useDeleteProduct({
    onSuccess: () => {
      console.log("Product deleted successfully");
    },
  });

  if (isSuccess) {
    return null;
  }

  return (
    <div className="group relative flex flex-col border-2 border-gray-200 rounded p-4 bg-white hover:border-gray-400 hover:shadow-lg transition-all duration-300">
      <div className="absolute top-4 right-4 z-10">
        <Badge variant={getStockVariant(product.availabilityStatus)}>
          <Package className="size-3 mr-1" />
          {product.availabilityStatus}
        </Badge>
      </div>

      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <h3 className="mt-4 mb-2 font-bold text-lg">
        <Link to={`/products/${product.id}`} className="text-blue-600 hover:text-blue-800 underline">
          {product.name}
        </Link>
      </h3>

      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`size-4 ${
              index < getRatingStars(product.ratingLabel)
                ? getRatingColor(product.ratingLabel) + " fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>

      <Button
        className="w-full mb-2"
        disabled={product.availabilityStatus === "Out of Stock"}
        variant={product.availabilityStatus === "Out of Stock" ? "outline" : "default"}
      >
        <ShoppingCart className="size-5 mr-2" />
        {product.availabilityStatus === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
      </Button>

      <Button
        className="w-full bg-red-500 text-white"
        onClick={() => deleteProduct(product.id)}
      >
        Delete
      </Button>
    </div>
  );
};
