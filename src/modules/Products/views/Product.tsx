import { Star, ShoppingCart, Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { Product as ProductType } from "../entities/Product";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

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
    <Card className="group relative flex flex-col overflow-hidden border-2 border-gray-200 hover:border-gray-400 hover:shadow-2xl transition-all duration-300 bg-white">
      <div className="absolute top-4 right-4 z-10">
        <Badge
          variant={getStockVariant(product.availabilityStatus)}
          className="shadow-md font-medium px-3 py-1"
        >
          <Package className="size-3 mr-1" />
          {product.availabilityStatus}
        </Badge>
      </div>

      <CardHeader className="p-0">
        <div className="relative overflow-hidden from-gray-50 to-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-4">
        <div className="mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        <h3 className="font-bold text-xl line-clamp-2 mb-4 min-h-14 text-gray-900 group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>

        <div className="mb-3">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`size-4 ${
                  index < getRatingStars(product.ratingLabel)
                    ? getRatingColor(product.ratingLabel) + " fill-current"
                    : "text-gray-300"
                } transition-colors`}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          <Button
            className="w-full h-12 text-base font-semibold transition-all duration-300 bg-blue-400"
            disabled={product.availabilityStatus === "Out of Stock"}
            variant={
              product.availabilityStatus === "Out of Stock"
                ? "outline"
                : "default"
            }
          >
            <ShoppingCart className="size-5 mr-2" />
            {product.availabilityStatus === "Out of Stock"
              ? "Out of Stock"
              : "Add to Cart"}
          </Button>
          <Button
            className="w-full h-12 text-base font-semibold transition-all duration-300 bg-red-400 mt-3 text-white"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
