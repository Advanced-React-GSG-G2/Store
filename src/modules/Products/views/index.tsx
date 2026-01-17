import { useMemo, useState } from "react";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import type { AvailabilityStatus, RatingLabel } from "../entities/Product";
import { Product } from "./Product";

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
    ]
  );

  const { filteredProducts, allProducts, error, isLoading, isEmpty } =
    useGetAllProducts(filters);

  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((product) => product.category)))
      .sort((a, b) => a.localeCompare(b))
      .map((categoryName) => ({
        value: categoryName,
        label: categoryName,
      }));
  }, [allProducts]);

  if (isEmpty && allProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products available.</p>
      </div>
    );
  }

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
                    event.target.value as AvailabilityStatus | "all"
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
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
