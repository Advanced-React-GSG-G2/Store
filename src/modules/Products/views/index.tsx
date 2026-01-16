import { useMemo, useState } from "react";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

import { Card, CardHeader, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Star, ShoppingCart, Package } from "lucide-react";

import type { AvailabilityStatus, RatingLabel } from "../entities/Product";

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

  const categories = useMemo(
    () =>
      Array.from(new Set(allProducts.map((p) => p.category)))
        .sort((a, b) => a.localeCompare(b))
        .map((value) => ({ value, label: value })),
    [allProducts],
  );

  const { deleteProduct } = useDeleteProduct({
    onSuccess: () => console.log("Product deleted successfully"),
  });

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
          <h1 className="text-5xl font-bold mb-3 text-gray-900">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our amazing collection
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 h-screen sticky top-0 rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm overflow-y-auto flex-shrink-0">
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600 mb-4">
              Category
              <select
                className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All categories</option>
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600 mb-4">
              Availability
              <select
                className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                value={availabilityStatus}
                onChange={(e) =>
                  setAvailabilityStatus(
                    e.target.value as AvailabilityStatus | "all",
                  )
                }
              >
                <option value="all">All statuses</option>
                <option value="In Stock">In stock</option>
                <option value="Low Stock">Low stock</option>
                <option value="Out of Stock">Out of stock</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600 mb-4">
              Rating
              <select
                className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                value={ratingLabel}
                onChange={(e) =>
                  setRatingLabel(e.target.value as RatingLabel | "all")
                }
              >
                <option value="all">All ratings</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Bad">Bad</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-gray-600 mb-4">
              Price range
              <div className="flex items-center gap-2">
                <input
                  className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base text-gray-800 shadow-sm focus:border-gray-400 focus:outline-none"
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <input
                type="checkbox"
                className="size-4 accent-gray-700"
                checked={discountedOnly}
                onChange={(e) => setDiscountedOnly(e.target.checked)}
              />
              Discounted only
            </label>

            <button
              type="button"
              className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
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
          </aside>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && <p className="text-gray-500">Loading products...</p>}
            {error && <p className="text-red-500">Failed to load products</p>}

            {products.map((product) => (
              <Card
                key={product.id}
                className="group relative flex flex-col border border-gray-200 hover:shadow-2xl transition-all bg-white"
              >
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant={getStockVariant(product.availabilityStatus)}>
                    <Package className="size-3 mr-1" />
                    {product.availabilityStatus}
                  </Badge>
                </div>

                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </CardHeader>

                <CardContent className="flex flex-col flex-1 p-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-xl mb-4">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-5 ${
                          i < getRatingStars(product.ratingLabel)
                            ? getRatingColor(product.ratingLabel) +
                              " fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-3xl font-bold text-gray-900 mb-3">
                      ${product.price.toFixed(2)}
                    </p>

                    <Button
                      className="w-full h-12 mb-3"
                      disabled={product.availabilityStatus === "Out of Stock"}
                    >
                      <ShoppingCart className="size-5 mr-2" />
                      {product.availabilityStatus === "Out of Stock"
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </Button>

                    <Button
                      className="w-full h-12 bg-red-400 text-white"
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
    </div>
  );
};
