"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useDrillDownStore } from "@/lib/stores/drillDownStore";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Package, Truck, MapPin, Clock, AlertTriangle, 
  CheckCircle2, Thermometer, Users, Settings, History 
} from "lucide-react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

export function DrillDownSheet() {
  const { isOpen, type, data, close } = useDrillDownStore();

  if (!type) return null;

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 border-l border-[#E5E7EB]">
        <div className="flex flex-col h-full bg-[#F7F8F4]">
          <SheetHeader className="p-6 bg-white border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#E8F5EE] text-[#0F8F5F]">
                {type === "deliveries" && <Truck className="size-5" />}
                {type === "otif" && <CheckCircle2 className="size-5" />}
                {type === "eta" && <Clock className="size-5" />}
                {type === "returns" && <History className="size-5" />}
                {type === "shipment" && <Package className="size-5" />}
                {type === "hub" && <MapPin className="size-5" />}
                {type === "metric" && <AlertTriangle className="size-5" />}
              </div>
              <div>
                <SheetTitle className="text-xl font-bold text-[#111827]">
                  {data?.title || type.toUpperCase()} Detail
                </SheetTitle>
                <SheetDescription className="text-[#6B7280]">
                  Deep-dive analysis and real-time status
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Render different views based on type */}
            {type === "shipment" && <ShipmentDetail data={data} />}
            {type === "hub" && <HubDetail data={data} />}
            {type === "deliveries" && <DeliveriesList data={data} />}
            {type === "otif" && <OtifDetail data={data} />}
            {type === "eta" && <EtaDetail data={data} />}
            {type === "returns" && <ReturnsDetail data={data} />}
            {type === "metric" && <MetricDetail data={data} />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Sub-components for each view ─────────────────────────────────────

function ShipmentDetail({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="surface-card p-4 rounded-lg">
          <p className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">Shipment ID</p>
          <p className="text-lg font-bold text-[#111827]">{data?.shipmentId || "SHP-7721"}</p>
        </div>
        <div className="surface-card p-4 rounded-lg">
          <p className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">Status</p>
          <Badge className="mt-1 bg-[#E8F5EE] text-[#0F8F5F] border-[#0F8F5F]/20">
            {data?.status || "IN-TRANSIT"}
          </Badge>
        </div>
      </div>

      <div className="surface-card p-5 rounded-lg space-y-4">
        <h4 className="font-bold text-[#111827] flex items-center gap-2">
          <Truck className="size-4 text-[#0F8F5F]" /> Logistics info
        </h4>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div>
            <p className="text-[#6B7280]">Carrier</p>
            <p className="font-semibold">{data?.carrier || "Swift Logistics"}</p>
          </div>
          <div>
            <p className="text-[#6B7280]">Vehicle ID</p>
            <p className="font-semibold">{data?.vehicleId || "KA-01-HH-4421"}</p>
          </div>
          <div>
            <p className="text-[#6B7280]">Driver</p>
            <p className="font-semibold">{data?.driver || "Suresh Raina"}</p>
          </div>
          <div>
            <p className="text-[#6B7280]">Speed</p>
            <p className="font-semibold">{data?.speed || 45} km/h</p>
          </div>
        </div>
      </div>

      <div className="h-[250px] rounded-lg overflow-hidden border border-[#E5E7EB]">
        <LeafletMap 
          center={[data?.gps?.lat || 12.9716, data?.gps?.lng || 77.5946]} 
          zoom={14}
          markers={[{ position: [data?.gps?.lat || 12.9716, data?.gps?.lng || 77.5946], label: "Current Location" }]}
        />
      </div>

      <div className="surface-card p-5 rounded-lg space-y-4">
        <h4 className="font-bold text-[#111827] flex items-center gap-2">
          <Thermometer className="size-4 text-[#0F8F5F]" /> Cold Chain Log
        </h4>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-[#E5E7EB] last:border-0">
              <span className="text-[#6B7280]">{new Date(Date.now() - i * 3600000).toLocaleTimeString()}</span>
              <span className={cn("font-bold", i === 1 ? "text-[#0F8F5F]" : "text-[#111827]")}>
                {4.2 + (i * 0.1)}°C
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HubDetail({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="surface-card p-5 rounded-lg bg-[#2E5E4E] text-white">
        <h4 className="text-sm font-medium text-white/70 uppercase">Total Capacity</h4>
        <p className="text-3xl font-bold mt-1">{data?.capacity || 5000} Tons</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Utilization</span>
            <span>{data?.utilizationPct?.toFixed(1) || 72.4}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${data?.utilizationPct || 72.4}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="surface-card p-4 rounded-lg">
          <p className="text-xs text-[#6B7280]">Staff</p>
          <p className="text-lg font-bold">{data?.staff || 42}</p>
        </div>
        <div className="surface-card p-4 rounded-lg">
          <p className="text-xs text-[#6B7280]">Dock Doors</p>
          <p className="text-lg font-bold">12</p>
        </div>
        <div className="surface-card p-4 rounded-lg">
          <p className="text-xs text-[#6B7280]">Forklifts</p>
          <p className="text-lg font-bold">8</p>
        </div>
      </div>

      <div className="surface-card p-5 rounded-lg space-y-4">
        <h4 className="font-bold text-[#111827]">Stored Products</h4>
        <div className="space-y-3">
          {["Tomatoes", "Onions", "Potato"].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 bg-[#F7F8F4] rounded-md">
              <div>
                <p className="font-bold text-sm">{item}</p>
                <p className="text-xs text-[#6B7280]">Batch: FF-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">{(Math.random() * 100).toFixed(1)} Tons</p>
                <p className="text-[10px] text-red-500 font-medium">Expiring in 3d</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeliveriesList({ data }: { data: any }) {
  return (
    <div className="space-y-4">
      <div className="surface-card p-5 rounded-lg">
        <h4 className="font-bold mb-4 flex items-center gap-2"><Truck className="size-4" /> Active Deliveries</h4>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border border-[#E5E7EB] rounded-lg hover:border-[#0F8F5F]/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-[#111827]">VEH-{2000 + i}</p>
                  <p className="text-xs text-[#6B7280]">Driver: Ashok Kumar</p>
                </div>
                <Badge className="bg-amber-50 text-amber-700 border-amber-200">IN-TRANSIT</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-3 pt-3 border-t border-[#F3F4F6]">
                <div>
                  <p className="text-[10px] uppercase text-[#9CA3AF]">Payload</p>
                  <p className="font-semibold">12.5 Tons</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-[#9CA3AF]">ETA</p>
                  <p className="font-semibold">14:30 Today</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OtifDetail({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="surface-card p-5 rounded-lg border-l-4 border-[#0F8F5F]">
        <h4 className="text-sm font-medium text-[#6B7280]">Overall OTIF Performance</h4>
        <p className="text-3xl font-bold text-[#111827]">94.2%</p>
        <p className="text-xs text-[#0F8F5F] font-medium mt-1">↑ 2.1% from last month</p>
      </div>

      <div className="surface-card p-5 rounded-lg">
        <h4 className="font-bold text-[#111827] mb-4">Supplier Breakdown</h4>
        <div className="space-y-4">
          {[
            { name: "Green Harvest Farms", otif: 98.2, trend: "up" },
            { name: "Sunrise Organic", otif: 91.5, trend: "down" },
            { name: "Valley Fresh Co.", otif: 88.4, trend: "down" }
          ].map((s) => (
            <div key={s.name} className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{s.name}</span>
                <span className={s.otif > 90 ? "text-[#0F8F5F]" : "text-amber-600"}>{s.otif}%</span>
              </div>
              <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div 
                  className={cn("h-full", s.otif > 90 ? "bg-[#0F8F5F]" : "bg-amber-500")} 
                  style={{ width: `${s.otif}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card p-0 rounded-lg overflow-hidden border border-[#E5E7EB]">
        <div className="bg-[#F7F8F4] p-4 border-b border-[#E5E7EB]">
          <h4 className="font-bold text-sm">Recent Order Variances</h4>
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 text-sm">
              <div className="flex justify-between mb-1">
                <span className="font-bold">Batch: FF-{1000 + i}</span>
                <span className="text-red-600 font-bold">-0.4 Tons</span>
              </div>
              <p className="text-[#6B7280] text-xs">Ordered: 10.0T | Received: 9.6T</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EtaDetail({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="surface-card p-5 rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6B7280]">Next Arrival In</p>
          <p className="text-4xl font-black text-[#111827]">42 <span className="text-lg font-bold">MIN</span></p>
        </div>
        <div className="size-16 rounded-full border-4 border-[#0F8F5F] border-t-transparent animate-spin-slow flex items-center justify-center">
          <Truck className="size-6 text-[#0F8F5F]" />
        </div>
      </div>

      <div className="surface-card p-5 rounded-lg space-y-4">
        <h4 className="font-bold">Journey Progress</h4>
        <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
          <div className="relative before:absolute before:left-[-19px] before:top-1.5 before:size-4 before:rounded-full before:bg-[#0F8F5F] before:border-2 before:border-white">
            <p className="text-sm font-bold text-[#111827]">Hub Bangalore North</p>
            <p className="text-xs text-[#6B7280]">Departed 08:30 AM</p>
          </div>
          <div className="relative before:absolute before:left-[-19px] before:top-1.5 before:size-4 before:rounded-full before:bg-amber-500 before:border-2 before:border-white">
            <p className="text-sm font-bold text-[#111827]">In Transit - NH44</p>
            <p className="text-xs text-[#6B7280]">Current Speed: 52 km/h</p>
          </div>
          <div className="relative before:absolute before:left-[-19px] before:top-1.5 before:size-4 before:rounded-full before:bg-[#E5E7EB] before:border-2 before:border-white">
            <p className="text-sm font-bold text-[#6B7280]">Warehouse Hassan</p>
            <p className="text-xs text-[#9CA3AF]">Estimated 11:45 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReturnsDetail({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="surface-card p-5 rounded-lg">
        <h4 className="text-sm font-medium text-[#6B7280]">Monthly Return Cost Impact</h4>
        <p className="text-3xl font-bold text-red-600">₹4.2L</p>
        <p className="text-xs text-red-500 font-medium mt-1">↑ 12% increase this week</p>
      </div>

      <div className="space-y-3">
        {[
          { item: "Tomatoes", qty: "1.2T", reason: "Quality/Softness", supplier: "Supplier A" },
          { item: "Onions", qty: "0.8T", reason: "Damage/Transit", supplier: "Supplier B" },
          { item: "Capsicum", qty: "0.4T", reason: "Wrong Variant", supplier: "Supplier A" }
        ].map((r, i) => (
          <div key={i} className="surface-card p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold">{r.item} <span className="text-[#6B7280] font-normal text-xs">• {r.qty}</span></p>
              <p className="text-xs text-red-600 font-medium">{r.reason}</p>
            </div>
            <p className="text-xs font-semibold text-[#111827]">{r.supplier}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricDetail({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="surface-card p-8 rounded-xl text-center bg-white shadow-sm border border-[#E5E7EB]">
        <p className="text-sm font-medium text-[#6B7280] uppercase tracking-widest">{data?.label || "Metric"}</p>
        <p className="text-6xl font-black text-[#111827] mt-2">{data?.value || "0.0"}</p>
        <p className="text-[#6B7280] mt-2 font-medium">{data?.subtitle || "No additional data"}</p>
      </div>

      <div className="surface-card p-6 rounded-lg bg-[#2E5E4E] text-white">
        <h4 className="font-bold mb-4">Historical Trend (30D)</h4>
        <div className="h-[150px] flex items-end gap-1 px-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-white/20 hover:bg-white/50 transition-colors rounded-t-[1px]" 
              style={{ height: `${20 + Math.random() * 80}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-white/50 uppercase tracking-tighter">
          <span>30 Days ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

