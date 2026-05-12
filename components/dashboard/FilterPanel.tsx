"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoleStore } from "@/lib/stores/roleStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterState {
  cropType: string;
  urgency: string;
  dateRange: string;
  category: string;
  status: string;
  warehouseHub: string;
  route: string;
  partnerWarehouse: string;
  stockStatus: string;
  deliveryStatus: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  activeFiltersCount: number;
}

const farmerFilters = [
  { key: "cropType", label: "Crop type", options: ["All", "Vegetables", "Fruits", "Grains"] },
  { key: "urgency", label: "Urgency", options: ["All", "Harvest Ready", "Spoilage Risk", "Pending Pickup"] },
  { key: "dateRange", label: "Date range", options: ["All", "Today", "This Week", "This Month"] },
];

const warehouseFilters = [
  { key: "category", label: "Category", options: ["All", "Vegetables", "Fruits", "Dairy", "Grains", "Frozen", "Beverages"] },
  { key: "status", label: "Status", options: ["All", "Healthy", "At Risk", "Critical"] },
  { key: "warehouseHub", label: "Warehouse hub", options: ["All", "Bangalore North", "Mumbai Cold Hub", "Hyderabad East", "Chennai Hub"] },
];

const distributorFilters = [
  { key: "route", label: "Route", options: ["All", "Route 1", "Route 2", "Route 3", "Route 4", "Route 5", "Route 6", "Route 7", "Route 8", "Route 9", "Route 10", "Route 11", "Route 12", "Route 13", "Route 14", "Route 15", "Route 16", "Route 17", "Route 18"] },
  { key: "status", label: "Status", options: ["All", "On Time", "Delayed", "Delivered"] },
  { key: "partnerWarehouse", label: "Partner warehouse", options: ["All", "Bangalore North", "Mumbai Cold Hub", "Chennai Cross Dock", "Delhi Dry Storage"] },
];

const retailerFilters = [
  { key: "stockStatus", label: "Stock status", options: ["All", "In Stock", "Low Stock", "Out of Stock"] },
  { key: "category", label: "Category", options: ["All", "Vegetables", "Fruits", "Dairy", "Grains", "Frozen", "Beverages"] },
  { key: "deliveryStatus", label: "Delivery status", options: ["All", "Arriving Today", "Scheduled", "Overdue"] },
];

const adminFilters = [
  ...farmerFilters,
  ...warehouseFilters,
  ...distributorFilters,
];

export function FilterPanel({ isOpen, onClose, onApply, activeFiltersCount }: FilterPanelProps) {
  const role = useRoleStore((state) => state.currentRole);
  const [filters, setFilters] = useState<FilterState>({
    cropType: "All",
    urgency: "All",
    dateRange: "All",
    category: "All",
    status: "All",
    warehouseHub: "All",
    route: "All",
    partnerWarehouse: "All",
    stockStatus: "All",
    deliveryStatus: "All",
  });

  const getFiltersForRole = () => {
    switch (role) {
      case "farmer": return farmerFilters;
      case "warehouse": return warehouseFilters;
      case "distributor": return distributorFilters;
      case "retailer": return retailerFilters;
      case "admin": return adminFilters;
      default: return farmerFilters;
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    const resetFilters: FilterState = {
      cropType: "All",
      urgency: "All",
      dateRange: "All",
      category: "All",
      status: "All",
      warehouseHub: "All",
      route: "All",
      partnerWarehouse: "All",
      stockStatus: "All",
      deliveryStatus: "All",
    };
    setFilters(resetFilters);
  };

  const currentFilters = getFiltersForRole();
  const hasActiveFilters = Object.values(filters).some((v) => v !== "All");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-xl"
          >
            <div className="flex h-20 items-center justify-between border-b border-[#E5E7EB] px-6">
              <h2 className="text-lg font-semibold text-[#111827]">Filters</h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-[#6B7280] transition hover:bg-[#F7F8F4] hover:text-[#111827]"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto p-6">
              {currentFilters.map((filter) => (
                <div key={filter.key} className="space-y-2">
                  <label className="text-sm font-medium text-[#111827]">{filter.label}</label>
                  <div className="flex flex-wrap gap-2">
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange(filter.key as keyof FilterState, option)}
                        className={cn(
                          "rounded-md px-3 py-1.5 text-sm transition",
                          filters[filter.key as keyof FilterState] === option
                            ? "bg-[#0F8F5F] text-white"
                            : "border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F7F8F4]"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 w-full border-t border-[#E5E7EB] bg-white p-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClearFilters}
                  disabled={!hasActiveFilters}
                >
                  Clear filters
                </Button>
                <Button
                  className="flex-1 bg-[#0F8F5F] hover:bg-[#0C7A51]"
                  onClick={() => {
                    onApply(filters);
                    onClose();
                  }}
                >
                  Apply filters
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}