"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRoleStore } from "@/lib/stores/roleStore";
import { useToast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

interface NewPlanModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewPlanModal({ open, onClose }: NewPlanModalProps) {
  const role = useRoleStore((state) => state.currentRole);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [planType, setPlanType] = useState(role === "admin" ? "" : `${role}Plan`);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const farmerFields = [
    { key: "cropType", label: "Crop type", type: "select", options: ["Vegetables", "Fruits", "Grains"] },
    { key: "quantity", label: "Expected quantity (tons)", type: "number", placeholder: "e.g. 10" },
    { key: "harvestDate", label: "Target harvest date", type: "date" },
    { key: "warehouse", label: "Linked warehouse", type: "select", options: ["Bangalore North"] },
    { key: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
  ];

  const warehouseFields = [
    { key: "category", label: "Category", type: "select", options: ["Vegetables", "Fruits", "Dairy", "Grains", "Frozen", "Beverages"] },
    { key: "targetStock", label: "Target stock level", type: "number", placeholder: "e.g. 500" },
    { key: "reorderPoint", label: "Reorder point", type: "number", placeholder: "e.g. 100" },
    { key: "supplier", label: "Supplier", type: "select", options: ["Green Valley Farms", "Riverbend Dairy", "Sunfield Grains", "Deccan Orchards"] },
    { key: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
  ];

  const distributorFields = [
    { key: "fromWarehouse", label: "From warehouse", type: "select", options: ["Bangalore North", "Mumbai Cold Hub", "Hyderabad East", "Delhi Dry Storage"] },
    { key: "toRetailer", label: "To retailer", type: "select", options: ["FreshMart Bangalore", "DailyMart Mumbai", "SuperMart Chennai", "FreshMart Delhi"] },
    { key: "sku", label: "SKU", type: "text", placeholder: "e.g. TOM-BLR-01" },
    { key: "quantity", label: "Quantity", type: "text", placeholder: "e.g. 50 tons" },
    { key: "dispatchDate", label: "Dispatch date", type: "date" },
  ];

  const retailerFields = [
    { key: "sku", label: "SKU", type: "select", options: ["Tomatoes", "Onions", "Potatoes", "Milk", "Mangoes"] },
    { key: "quantity", label: "Quantity", type: "text", placeholder: "e.g. 100 units" },
    { key: "deliveryDate", label: "Preferred delivery date", type: "date" },
    { key: "notes", label: "Notes", type: "textarea", placeholder: "Any special instructions..." },
  ];

  const getFields = () => {
    if (role === "admin" && planType === "") return [];
    if (role === "admin") {
      switch (planType) {
        case "harvestPlan": return farmerFields;
        case "inventoryPlan": return warehouseFields;
        case "dispatchPlan": return distributorFields;
        case "orderPlan": return retailerFields;
        default: return [];
      }
    }
    switch (role) {
      case "farmer": return farmerFields;
      case "warehouse": return warehouseFields;
      case "distributor": return distributorFields;
      case "retailer": return retailerFields;
      default: return [];
    }
  };

  const getTitle = () => {
    if (role === "admin") {
      switch (planType) {
        case "harvestPlan": return "New Harvest Plan";
        case "inventoryPlan": return "New Inventory Plan";
        case "dispatchPlan": return "New Dispatch Plan";
        case "orderPlan": return "New Order Plan";
        default: return "Create New Plan";
      }
    }
    switch (role) {
      case "farmer": return "New Harvest Plan";
      case "warehouse": return "New Inventory Plan";
      case "distributor": return "New Dispatch Plan";
      case "retailer": return "New Order Plan";
      default: return "Create New Plan";
    }
  };

  const getSuccessMessage = () => {
    switch (role) {
      case "farmer": return "Harvest plan created";
      case "warehouse": return "Inventory plan saved";
      case "distributor": return "Dispatch plan created";
      case "retailer": return "Order plan submitted";
      default: return "Plan created";
    }
  };

  const fields = getFields();
  const isValid = fields.length > 0 && fields.every(f => formData[f.key] && formData[f.key].trim() !== "");

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    addToast({ title: getSuccessMessage(), variant: "success" });
    setFormData({});
    onClose();
  };

  const handleClose = () => {
    setFormData({});
    if (role === "admin") setPlanType("");
    onClose();
  };

  const getPlanTypeOptions = () => [
    { value: "harvestPlan", label: "Harvest Plan (Farmer)" },
    { value: "inventoryPlan", label: "Inventory Plan (Warehouse)" },
    { value: "dispatchPlan", label: "Dispatch Plan (Distributor)" },
    { value: "orderPlan", label: "Order Plan (Retailer)" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {role === "admin" && !planType ? "Select a plan type to create" : "Fill in the details below"}
          </DialogDescription>
        </DialogHeader>

        {role === "admin" && !planType && (
          <div className="space-y-2">
            {getPlanTypeOptions().map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPlanType(opt.value)}
                className="w-full rounded-lg border border-[#E5E7EB] p-3 text-left transition hover:bg-[#F7F8F4] hover:border-[#0F8F5F]"
              >
                <span className="font-medium text-[#111827]">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {fields.length > 0 && (
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-sm font-medium text-[#111827]">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    value={formData[field.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F8F5F]"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={formData[field.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm outline-none focus:border-[#0F8F5F] resize-none"
                  />
                ) : (
                  <Input
                    type={field.type}
                    value={formData[field.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <Button
              onClick={handleSubmit}
              disabled={!isValid || loading}
              className="w-full bg-[#0F8F5F] hover:bg-[#0C7A51]"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}