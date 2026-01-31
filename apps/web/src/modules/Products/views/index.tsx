import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import type { AvailabilityStatus, RatingLabel } from "../entities/Product";
import { Button } from "../../../components/ui/button";
import { Product } from "./components/Product";
import { Sidebar } from "./components/Sidebar";

export const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleReset = () => {
    setCategory("all");
    setAvailabilityStatus("all");
    setRatingLabel("all");
    setMinPrice("");
    setMaxPrice("");
    setDiscountedOnly(false);
  };

  if (isEmpty && allProducts.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-lg text-muted-foreground">
            No products available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          category={category}
          setCategory={setCategory}
          availabilityStatus={availabilityStatus}
          setAvailabilityStatus={setAvailabilityStatus}
          ratingLabel={ratingLabel}
          setRatingLabel={setRatingLabel}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          discountedOnly={discountedOnly}
          setDiscountedOnly={setDiscountedOnly}
          categories={categories}
          onReset={handleReset}
        />

        <main className="flex-1 p-4 md:p-8  m-8 rounded-3xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex justify-center items-center w-full ">
              <h1 className="text-3xl font-bold ">Our Products</h1>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
          </div>

          {isLoading && (
            <div className="mb-6 text-center text-muted-foreground">
              Loading products...
            </div>
          )}

          {error && (
            <div className="mb-6 text-center text-destructive">
              Failed to load products. Please try again.
            </div>
          )}

          {isEmpty && !isLoading && (
            <div className="flex min-h-100 items-center justify-center">
              <p className="text-lg text-muted-foreground">
                No products match your filters.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
