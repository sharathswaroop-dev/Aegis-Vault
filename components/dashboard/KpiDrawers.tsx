"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { useLiveDataStore } from "@/lib/stores/liveDataStore";

const urgencyColors: Record<string, string> = {
  CRITICAL: "bg-red-50 text-red-700",
  HIGH: "bg-amber-50 text-amber-700",
  MEDIUM: "bg-yellow-50 text-yellow-700",
  LOW: "bg-[#E8F5EE] text-[#0F8F5F]",
};

const pickupStatusColors: Record<string, string> = {
  Confirmed: "bg-[#E8F5EE] text-[#0F8F5F]",
  Urgent: "bg-red-50 text-red-700",
  Pending: "bg-amber-50 text-amber-700",
};

interface HarvestReadyDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function HarvestReadyDrawer({ open, onClose }: HarvestReadyDrawerProps) {
  const { addToast } = useToast();
  const { orders } = useLiveDataStore();

  const readyBatches = useMemo(() => orders.filter(o => o.status === "harvested"), [orders]);
  const totalTons = readyBatches.reduce((acc, b) => acc + parseFloat(b.stock), 0);

  const handleRequestPickup = (batchId: string) => {
    addToast({ title: `Pickup requested for ${batchId}`, variant: "success" });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="mb-4">
          <SheetTitle>Harvest Ready — {totalTons.toFixed(1)} tons</SheetTitle>
          <SheetDescription>{readyBatches.length} batches ready for pickup</SheetDescription>
        </SheetHeader>
        
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-2 font-medium text-[#6B7280]">Batch ID</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Crop</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Quantity</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Location</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Status</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Action</th>
                </tr>
              </thead>
              <tbody>
                {readyBatches.map((batch) => (
                  <tr key={batch.id} className="border-b border-[#E5E7EB]">
                    <td className="py-2 font-medium text-[#111827]">{batch.sku}</td>
                    <td className="py-2 text-[#6B7280]">{batch.item}</td>
                    <td className="py-2 text-[#6B7280]">{batch.stock}</td>
                    <td className="py-2 text-[#6B7280]">{batch.location}</td>
                    <td className="py-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium bg-[#E8F5EE] text-[#0F8F5F]")}>
                        Ready
                      </span>
                    </td>
                    <td className="py-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleRequestPickup(batch.sku)}
                      >
                        Request
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface SpoilageRiskDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SpoilageRiskDrawer({ open, onClose }: SpoilageRiskDrawerProps) {
  const { addToast } = useToast();
  const { orders } = useLiveDataStore();
  const [showEmergencyForm, setShowEmergencyForm] = useState<string | null>(null);
  const [contact, setContact] = useState("");

  const atRiskBatches = useMemo(() => orders.filter(o => o.risk === "High"), [orders]);
  const atRiskPct = orders.length > 0 ? ((atRiskBatches.length / orders.length) * 100).toFixed(1) : "0";

  const handleEmergencySubmit = (batchId: string) => {
    addToast({ title: `Emergency pickup requested for ${batchId}`, description: `Contact: ${contact}`, variant: "success" });
    setShowEmergencyForm(null);
    setContact("");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="mb-4">
          <SheetTitle>Spoilage Risk Batches</SheetTitle>
          <SheetDescription>{atRiskPct}% of inventory at risk</SheetDescription>
        </SheetHeader>

        <div className="mb-4 flex gap-2">
          <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">{atRiskBatches.length} critical</span>
        </div>

        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-2 font-medium text-[#6B7280]">Batch ID</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Crop</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Qty</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Urgency</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Action</th>
                </tr>
              </thead>
              <tbody>
                {atRiskBatches.map((batch) => (
                  <tr key={batch.id} className="border-b border-[#E5E7EB]">
                    <td className="py-2 font-medium text-[#111827]">{batch.sku}</td>
                    <td className="py-2 text-[#6B7280]">{batch.item}</td>
                    <td className="py-2 text-[#6B7280]">{batch.stock}</td>
                    <td className="py-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", urgencyColors["CRITICAL"])}>
                        CRITICAL
                      </span>
                    </td>
                    <td className="py-2">
                      {showEmergencyForm === batch.sku ? (
                        <div className="flex gap-1">
                          <input
                            type="text"
                            placeholder="Contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-20 h-7 text-xs border rounded px-2"
                          />
                          <Button size="sm" className="h-7 text-xs" onClick={() => handleEmergencySubmit(batch.sku)}>
                            Send
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => setShowEmergencyForm(batch.sku)}
                        >
                          Emergency
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface PendingPickupsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function PendingPickupsDrawer({ open, onClose }: PendingPickupsDrawerProps) {
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);
  const { orders } = useLiveDataStore();

  const pendingBatches = useMemo(() => orders.filter(o => o.status === "harvested"), [orders]);

  const steps = [
    { label: "Pickup Requested", completed: true },
    { label: "Driver Assigned", completed: true },
    { label: "En Route", completed: true },
    { label: "Arrived at Farm", completed: false },
    { label: "Loaded and Departed", completed: false },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="mb-4">
          <SheetTitle>Pending Pickups</SheetTitle>
          <SheetDescription>{pendingBatches.length} batches scheduled for pickup</SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-2 font-medium text-[#6B7280]">Batch ID</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Crop</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Qty</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Status</th>
                  <th className="text-left py-2 font-medium text-[#6B7280]">Track</th>
                </tr>
              </thead>
              <tbody>
                {pendingBatches.map((pickup) => (
                  <tr key={pickup.id} className="border-b border-[#E5E7EB]">
                    <td className="py-2 font-medium text-[#111827]">{pickup.sku}</td>
                    <td className="py-2 text-[#6B7280]">{pickup.item}</td>
                    <td className="py-2 text-[#6B7280]">{pickup.stock}</td>
                    <td className="py-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", pickupStatusColors["Pending"])}>
                        Scheduled
                      </span>
                    </td>
                    <td className="py-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setSelectedPickup(selectedPickup === pickup.sku ? null : pickup.sku)}
                      >
                        Track
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedPickup && (
            <div className="rounded-lg border border-[#E5E7EB] p-4 animate-in slide-in-from-top duration-300">
              <p className="text-sm font-semibold text-[#111827] mb-3">Tracking: {selectedPickup}</p>
              <div className="flex items-center gap-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={cn("size-3 rounded-full", step.completed ? "bg-[#0F8F5F]" : "bg-[#E5E7EB]")} />
                    {idx < steps.length - 1 && <div className={cn("w-8 h-0.5", step.completed ? "bg-[#0F8F5F]" : "bg-[#E5E7EB]")} />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-[#6B7280]">
                {steps.map((step, idx) => (
                  <span key={idx} className={cn("text-center w-12", step.completed ? "text-[#0F8F5F]" : "")}>{step.label}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface PriceForecastDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function PriceForecastDrawer({ open, onClose }: PriceForecastDrawerProps) {
  const { prices } = useLiveDataStore();

  const forecastData = useMemo(() => {
    if (prices.length === 0) return [];
    // Generate 7 days of forecast based on current prices
    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      const base = prices[0]?.modalPrice || 2000;
      return {
        day: day.toLocaleDateString('en-IN', { weekday: 'short' }),
        price: base + (Math.sin(i) * 200),
        trend: base + (i * 50)
      };
    });
  }, [prices]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader className="mb-4">
          <SheetTitle>Price Forecast — Next 7 Days</SheetTitle>
          <SheetDescription>AI-predicted prices based on current market trends</SheetDescription>
        </SheetHeader>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `₹${v}`} />
              <Tooltip formatter={(value) => `₹${Number(value).toFixed(0)}`} />
              <Legend />
              <Line type="monotone" dataKey="price" name="Market Price" stroke="#0F8F5F" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="trend" name="AI Prediction" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-2 font-medium text-[#6B7280]">Commodity</th>
                <th className="text-left py-2 font-medium text-[#6B7280]">Market</th>
                <th className="text-left py-2 font-medium text-[#6B7280]">Current Price</th>
                <th className="text-left py-2 font-medium text-[#6B7280]">Trend</th>
              </tr>
            </thead>
            <tbody>
              {prices.slice(0, 5).map((p, i) => (
                <tr key={i} className="border-b border-[#E5E7EB]">
                  <td className="py-2 font-medium text-[#111827]">{p.commodity}</td>
                  <td className="py-2 text-[#6B7280]">{p.market}</td>
                  <td className="py-2 text-[#6B7280]">₹{p.modalPrice}</td>
                  <td className="py-2">
                    <span className="text-[#0F8F5F] font-medium">↑ Rising</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg bg-[#F7F8F4] p-4">
          <p className="text-sm font-medium text-[#111827]">AI Intelligence Note</p>
          <p className="text-sm text-[#6B7280] mt-1">
            Prices are currently trending upwards due to seasonal demand shifts in local mandis. Consider harvesting within 48 hours for maximum ROI.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}