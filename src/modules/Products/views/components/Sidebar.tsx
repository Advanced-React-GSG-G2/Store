import { Button } from "../../../../components/ui/button";
import type { AvailabilityStatus, RatingLabel } from "../../entities/Product";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  setCategory: (value: string) => void;
  availabilityStatus: AvailabilityStatus | "all";
  setAvailabilityStatus: (value: AvailabilityStatus | "all") => void;
  ratingLabel: RatingLabel | "all";
  setRatingLabel: (value: RatingLabel | "all") => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  discountedOnly: boolean;
  setDiscountedOnly: (value: boolean) => void;
  categories: { value: string; label: string }[];
  onReset: () => void;
};

export const Sidebar = ({
  isOpen,
  onClose,
  category,
  setCategory,
  availabilityStatus,
  setAvailabilityStatus,
  ratingLabel,
  setRatingLabel,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  discountedOnly,
  setDiscountedOnly,
  categories,
  onReset,
}: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-300 pl-5"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-fit w-80 transform lg:sticky lg:top-16 lg:z-0 lg:translate-x-0 lg:h-[calc(100vh-4rem)] shadow-xl lg:shadow-none ${
          isOpen
            ? "translate-x-0 animate-in slide-in-from-left duration-100"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col gap-4 pt-8 p-2 rounded-lg">
          <div className="flex flex-col gap-3 ">
            <div className="space-y-3 ">
              <h2 className="font-bold text-2xl"> Filters</h2>
              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700  transition-colors">
                  Category
                </label>
                <select
                  className="h-10 w-full rounded-lg border-2 border-gray-300  bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-blue-00"
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
              </div>

              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700 transition-colors">
                  Availability
                </label>
                <select
                  className="h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm transition-all focus:ring-"
                  value={availabilityStatus}
                  onChange={(e) =>
                    setAvailabilityStatus(
                      e.target.value as AvailabilityStatus | "all"
                    )
                  }
                >
                  <option value="all">All statuses</option>
                  <option value="In Stock">In stock</option>
                  <option value="Low Stock">Low stock</option>
                  <option value="Out of Stock">Out of stock</option>
                </select>
              </div>

              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700 transition-colors">
                  Rating
                </label>
                <select
                  className="h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm transition-all "
                  value={ratingLabel}
                  onChange={(e) =>
                    setRatingLabel(e.target.value as RatingLabel | "all")
                  }
                >
                  <option value="all">All ratings</option>
                  <option value="Excellent">⭐ Excellent</option>
                  <option value="Good">⭐ Good</option>
                  <option value="Bad">⭐ Bad</option>
                </select>
              </div>

              <div className="group">
                <label className="mb-2 block text-sm font-semibold text-gray-700  transition-colors">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    placeholder="Min"
                    className="h-10 w-full rounded-lg border-2 border-gray-300  bg-white px-3 py-2 text-sm"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="font-bold">→</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="Max"
                    className="h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg border-2  border-gray-300 transition-all">
                <input
                  type="checkbox"
                  id="discounted"
                  className="size-3 rounded cursor-pointer"
                  checked={discountedOnly}
                  onChange={(e) => setDiscountedOnly(e.target.checked)}
                />
                <label
                  htmlFor="discounted"
                  className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center gap-2"
                >
                  Discounted only
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 p-2 from-purple-50 to-pink-50">
            <Button
              variant="outline"
              className="w-full border-2 border-gray-300 cursor-pointer hover:scale-105"
              onClick={onReset}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
