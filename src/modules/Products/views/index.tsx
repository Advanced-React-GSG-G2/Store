import { useMemo, useState } from "react";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

import type {
  AvailabilityStatus,
  Product,
  RatingLabel,
} from "../entities/Product";

import { useDeleteProduct } from "../hooks/useDeleteProduct";

import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Star, ShoppingCart, Package } from "lucide-react";

export const Products = () => {

  const [category, setCategory] = useState("all");
  const [availabilityStatus, setAvailabilityStatus] = useState<
    AvailabilityStatus | "all"
  >("all");
  const [ratingLabel, setRatingLabel] = useState<RatingLabel | "all">("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discountedOnly, setDiscountedOnly] = useState(false);

  const filters = useMemo(
    () => ({
      category: category === "all" ? undefined : category,
      availabilityStatus:
        availabilityStatus === "all" ? undefined : availabilityStatus,
      ratingLabel: ratingLabel === "all" ? undefined : ratingLabel,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      discountedOnly,
    }),
    [
      category,
      availabilityStatus,
      ratingLabel,
      minPrice,
      maxPrice,
      discountedOnly,
    ],
  );

  const { products, allProducts, error, isLoading } =
    useGetAllProducts(filters);
  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((product) => product.category)))
      .sort((a, b) => a.localeCompare(b))
      .map((categoryName) => ({
        value: categoryName,
        label: categoryName,
      }));
  }, [allProducts]);

  const { isEmpty ,products } = useGetAllProducts();
  const { deleteProduct, isSuccess } = useDeleteProduct({
    onSuccess: () => {
      console.log("Product deleted successfully");
    },
  });

  if (isSuccess) {
    console.log("Delete operation was successful");
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products available.</p>
      </div>
    );
  }


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

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-3 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our amazing collection
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">
              Category
              <select
                className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">
              Availability
              <select
                className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                value={availabilityStatus}
                onChange={(event) =>
                  setAvailabilityStatus(
                    event.target.value as AvailabilityStatus | "all",
                  )
                }
              >
                <option value="all">All statuses</option>
                <option value="In Stock">In stock</option>
                <option value="Low Stock">Low stock</option>
                <option value="Out of Stock">Out of stock</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">
              Rating
              <select
                className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                value={ratingLabel}
                onChange={(event) =>
                  setRatingLabel(event.target.value as RatingLabel | "all")
                }
              >
                <option value="all">All ratings</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Bad">Bad</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">
              Price range
              <div className="flex items-center gap-2">
                <input
                  className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                />
                <input
                  className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-4 accent-gray-700"
                checked={discountedOnly}
                onChange={(event) => setDiscountedOnly(event.target.checked)}
              />
              Discounted only
            </label>

            <button
              type="button"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
              onClick={() => {
                setCategory("all");
                setAvailabilityStatus("all");
                setRatingLabel("all");
                setMinPrice("");
                setMaxPrice("");
                setDiscountedOnly(false);
              }}
            >
              Reset filters
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="mb-6 text-center text-gray-500">
            Loading products...
          </div>
        )}

        {error && (
          <div className="mb-6 text-center text-red-500">
            Failed to load products. Please try again.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group relative flex flex-col overflow-hidden border-2 border-gray-200 hover:border-gray-400 hover:shadow-2xl transition-all duration-300 bg-white"
            >
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

                <div className="mb-5">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`size-5 ${
                          index < getRatingStars(product.ratingLabel)
                            ? getRatingColor(product.ratingLabel) +
                              " fill-current"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
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
          ))}
        </div>
      </div>
    </div>
  );
};
