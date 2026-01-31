import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { useParams, Link } from "@tanstack/react-router";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { useGetProductById } from "../../hooks/useGetProductById";

const getRatingCount = (label: string) => {
  if (label === "Excellent") return 5;
  if (label === "Good") return 3;
  return 1;
};

export const ProductDetails = () => {
  const { productId } = useParams({ from: "/products/$productId" });
  const { data: product, isLoading, error } = useGetProductById(productId);

  if (isLoading) {
    return (
      <div className="max-w-260 mx-auto mt-16 px-6 animate-pulse">
        <div className="h-150 bg-gray-200 rounded-[2.5rem]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-lg">
        Failed to load product. Please try again.
      </div>
    );
  }

  if (!product) return null;

  const ratingCount = getRatingCount(product.ratingLabel);

  return (
    <div className="max-w-260 mx-auto mt-16 px-6">
      <Card className="rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_25px_60px_rgba(144,141,141,0.18)]">
        <CardHeader className="p-8 md:p-10 border-b border-gray-200 space-y-4">
          <CardTitle className="text-4xl font-semibold text-[#527fbe]">
            {product.name}
          </CardTitle>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`size-5 transition-colors ${
                  i < ratingCount
                    ? "text-amber-400 fill-current drop-shadow-[0_1px_0_#fbbf24]"
                    : "text-[#657894]"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-[#2e4b83]">
              {product.ratingLabel}
            </span>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-14 p-8 md:p-10">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(124,183,222,0.35)] transition-shadow duration-500 hover:shadow-[0_40px_100px_rgba(102,127,225,0.45)] group">
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              className="w-full h-105 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            <Badge
              className="absolute top-4 left-4 px-4 py-1 text-sm bg-white text-[#2e3783] shadow-[0_2px_8px_rgba(28,35,160,0.12)] rounded-full"
              variant={
                product.availabilityStatus === "In Stock"
                  ? "default"
                  : product.availabilityStatus === "Low Stock"
                  ? "secondary"
                  : "destructive"
              }
            >
              {product.availabilityStatus}
            </Badge>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-5xl font-extrabold bg-linear-to-r from-[#d78598] to-[#5384e6] bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>

            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {product.discountPercentage}% OFF
                </Badge>
              </div>
            )}

            <p className="text-gray-600 leading-relaxed text-lg">
              Discover this amazing {product.category} product. With a{" "}
              {product.ratingLabel.toLowerCase()} rating and currently{" "}
              {product.availabilityStatus.toLowerCase()}, this is a great
              addition to your collection.
            </p>

            <Button
              size="lg"
              disabled={product.availabilityStatus === "Out of Stock"}
              className="w-full text-lg font-semibold bg-linear-to-r from-[#d78598] to-[#5384e6] shadow-[0_10px_20px_rgba(148,184,251,0.4)] rounded-2xl transition-all duration-300 hover:from-[#8bd2f0] hover:to-[#f1cbdc] hover:shadow-[0_12px_25px_rgba(245,188,210,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="size-5 mr-2" />
              {product.availabilityStatus === "Out of Stock"
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>

            <Link to="/">
              <Button
                variant="ghost"
                className="w-full text-lg text-gray-600 bg-transparent rounded-lg transition-colors hover:bg-red-50"
              >
                <ArrowLeft className="size-5 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
