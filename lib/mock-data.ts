import type {
  AccuracyLogRow,
  AnomalyAlert,
  BatchExpiry,
  ExternalSignal,
  ForecastPoint,
  ForecastTag,
  FoodFlowRole,
  InventoryRow,
  Kpi,
  MarkdownRule,
  RegionalDemandPoint,
  RegionalStateDemand,
  ReorderQueueItem,
  ShelfLifeRule,
  ShipmentRow,
  SupplierRow,
} from "@/lib/types";

export const kpisByRole: Record<FoodFlowRole, Kpi[]> = {
  Admin: [
    { label: "Total Inventory Stored", value: "18.4k tons", change: "+8.2% this month", tone: "good" },
    { label: "Forecast Accuracy", value: "94.8%", change: "+2.4 pts", tone: "good" },
    { label: "Spoilage Risk", value: "6.1%", change: "-1.8 pts", tone: "good" },
    { label: "Active Warehouses", value: "42", change: "5 regions online", tone: "neutral" },
  ],
  Warehouse: [
    { label: "Total Inventory Stored", value: "4.8k tons", change: "+5.1% inbound", tone: "good" },
    { label: "Forecast Accuracy", value: "92.4%", change: "warehouse plan", tone: "good" },
    { label: "Spoilage Risk", value: "7.4%", change: "12 pallets aging", tone: "warn" },
    { label: "Active Warehouses", value: "8", change: "regional hubs", tone: "neutral" },
  ],
  Retailer: [
    { label: "Total Inventory Stored", value: "2.1k tons", change: "store network", tone: "good" },
    { label: "Forecast Accuracy", value: "91.7%", change: "weekend adjusted", tone: "good" },
    { label: "Spoilage Risk", value: "8.2%", change: "produce heavy", tone: "warn" },
    { label: "Active Warehouses", value: "14", change: "serving stores", tone: "neutral" },
  ],
  Distributor: [
    { label: "Total Inventory Stored", value: "6.6k tons", change: "in transit", tone: "good" },
    { label: "Forecast Accuracy", value: "93.2%", change: "+1.9 pts", tone: "good" },
    { label: "Spoilage Risk", value: "8.5%", change: "rain impact", tone: "warn" },
    { label: "Active Warehouses", value: "22", change: "connected hubs", tone: "neutral" },
  ],
  Farmer: [
    { label: "Total Inventory Stored", value: "820 tons", change: "committed supply", tone: "neutral" },
    { label: "Forecast Accuracy", value: "89.5%", change: "+4.1 pts", tone: "good" },
    { label: "Spoilage Risk", value: "5.6%", change: "humidity watch", tone: "warn" },
    { label: "Active Warehouses", value: "6", change: "buyer hubs", tone: "neutral" },
  ],
};

export const demandForecast: ForecastPoint[] = [
  { week: "W1", p10: 650, p50: 700, p90: 742 },
  { week: "W2", p10: 708, p50: 745, p90: 786 },
  { week: "W3", p10: 752, p50: 805, p90: 848 },
  { week: "W4", p10: 814, p50: 862, p90: 918 },
  { week: "W5", p10: 892, p50: 935, p90: 1004 },
  { week: "W6", p10: 936, p50: 985, p90: 1056 },
];

export const regionalDemand: RegionalDemandPoint[] = [
  { region: "Bangalore", vegetables: 82, dairy: 68, grains: 54 },
  { region: "Mumbai", vegetables: 74, dairy: 77, grains: 63 },
  { region: "Delhi", vegetables: 69, dairy: 72, grains: 71 },
  { region: "Hyderabad", vegetables: 76, dairy: 61, grains: 58 },
  { region: "Chennai", vegetables: 64, dairy: 66, grains: 62 },
];

export const inventoryRows: InventoryRow[] = [
  { sku: "TOM-BLR-01", item: "Tomatoes", category: "Vegetables", location: "Bangalore North", stock: "148 tons", age: "2.1 days", risk: "Medium", action: "Discount 10%" },
  { sku: "MIL-MUM-04", item: "Whole Milk", category: "Dairy", location: "Mumbai Cold Hub", stock: "92 kl", age: "1.4 days", risk: "Low", action: "Hold price" },
  { sku: "RIC-DEL-11", item: "Basmati Rice", category: "Grains", location: "Delhi Dry Storage", stock: "510 tons", age: "18 days", risk: "Low", action: "Rebalance" },
  { sku: "MAN-HYD-09", item: "Mangoes", category: "Fruits", location: "Hyderabad East", stock: "76 tons", age: "3.8 days", risk: "High", action: "Priority dispatch" },
  { sku: "PEA-CHN-02", item: "Frozen Peas", category: "Frozen", location: "Chennai Freezer 2", stock: "124 tons", age: "9 days", risk: "Low", action: "Bundle offer" },
  { sku: "JUI-BLR-07", item: "Orange Juice", category: "Beverages", location: "Bangalore South", stock: "61 kl", age: "5 days", risk: "Medium", action: "Store push" },
];

export const categories = ["Vegetables", "Fruits", "Dairy", "Grains", "Frozen", "Beverages", "Packaged Foods"];

export const shelfLifeRules: ShelfLifeRule[] = [
  { category: "Vegetables", maxAgeDays: 6, warningThresholdDays: 3 },
  { category: "Fruits", maxAgeDays: 7, warningThresholdDays: 3 },
  { category: "Dairy", maxAgeDays: 5, warningThresholdDays: 2 },
  { category: "Grains", maxAgeDays: 120, warningThresholdDays: 30 },
  { category: "Frozen", maxAgeDays: 180, warningThresholdDays: 21 },
  { category: "Beverages", maxAgeDays: 45, warningThresholdDays: 10 },
  { category: "Packaged Foods", maxAgeDays: 90, warningThresholdDays: 20 },
];

export const batchExpiries: BatchExpiry[] = [
  { sku: "TOM-BLR-01", batchId: "B-1048", quantity: "24 tons", expiryDate: "2026-05-14", daysRemaining: 2 },
  { sku: "MAN-HYD-09", batchId: "B-2210", quantity: "18 tons", expiryDate: "2026-05-15", daysRemaining: 3 },
  { sku: "MIL-MUM-04", batchId: "B-0874", quantity: "22 kl", expiryDate: "2026-05-17", daysRemaining: 5 },
  { sku: "PEA-CHN-02", batchId: "B-7712", quantity: "40 tons", expiryDate: "2026-05-24", daysRemaining: 12 },
  { sku: "RIC-DEL-11", batchId: "B-3291", quantity: "120 tons", expiryDate: "2026-08-10", daysRemaining: 90 },
];

export const aiInsights = [
  "Tomato demand rising in Bangalore; move 48 tons from Hyderabad within 36 hours.",
  "Apply 10% discount to mango batches aged over 3 days to reduce spoilage.",
  "Weekend demand spike expected for dairy and beverages across Mumbai retailers.",
  "Heavy rainfall may increase soup and packaged grains demand in Delhi NCR.",
  "Cold storage load in Chennai can absorb 12% more frozen inventory this week.",
];

export const pageAiInsights: Record<string, string[]> = {
  dashboard: [aiInsights[0], aiInsights[1]],
  inventory: [aiInsights[1], "SKU-level expiry velocity suggests prioritizing mango and tomato markdowns today."],
  forecasting: [aiInsights[0], aiInsights[3]],
  suppliers: ["Retail fill-rate variance is highest in Mumbai stores; review dairy allocation.", "Green Valley Farms remains the best tomato recovery supplier."],
  distribution: ["Supplier fill-rate variance is now a stronger delivery risk than routing distance.", "Cold-chain shipments should receive priority receiving slots."],
  analytics: ["Waste reduction is tied to earlier discount triggers on fruit batches.", "Event-tagged forecast windows show the strongest dairy variance."],
};

export const warehouseOverview = [
  { name: "Bangalore North", capacity: 86, spoilage: 5.2, orders: 1240 },
  { name: "Mumbai Cold Hub", capacity: 79, spoilage: 3.8, orders: 980 },
  { name: "Delhi Dry Storage", capacity: 72, spoilage: 2.1, orders: 1110 },
  { name: "Hyderabad East", capacity: 91, spoilage: 7.9, orders: 760 },
];

export const notifications = [
  { title: "Spoilage risk increased", body: "Mango lots in Hyderabad crossed the 72-hour freshness threshold.", priority: "High" },
  { title: "Forecast updated", body: "Bangalore tomato demand forecast increased by 14% for the weekend.", priority: "Medium" },
  { title: "Smart pricing alert", body: "Tomato markdown rules can recover margin while clearing aging stock.", priority: "Medium" },
  { title: "Supplier variance detected", body: "Dairy supplier OTIF dropped below 92% over the last 7 days.", priority: "Low" },
];

export const accuracyLogRows: AccuracyLogRow[] = [
  { sku: "TOM-BLR-01", region: "Karnataka", forecast: 700, actual: 682, mape: 2.6, bias: "over", week: "2026-W18", trend: [{ week: "W15", mape: 4.1 }, { week: "W16", mape: 3.3 }, { week: "W17", mape: 2.9 }, { week: "W18", mape: 2.6 }] },
  { sku: "MIL-MUM-04", region: "Maharashtra", forecast: 420, actual: 438, mape: 4.1, bias: "under", week: "2026-W18", trend: [{ week: "W15", mape: 5.2 }, { week: "W16", mape: 4.8 }, { week: "W17", mape: 4.6 }, { week: "W18", mape: 4.1 }] },
  { sku: "MAN-HYD-09", region: "Telangana", forecast: 260, actual: 231, mape: 12.6, bias: "over", week: "2026-W18", trend: [{ week: "W15", mape: 9.2 }, { week: "W16", mape: 10.8 }, { week: "W17", mape: 11.4 }, { week: "W18", mape: 12.6 }] },
  { sku: "RIC-DEL-11", region: "Delhi", forecast: 510, actual: 498, mape: 2.4, bias: "over", week: "2026-W18", trend: [{ week: "W15", mape: 3.1 }, { week: "W16", mape: 2.8 }, { week: "W17", mape: 2.5 }, { week: "W18", mape: 2.4 }] },
];

export const markdownRules: MarkdownRule[] = [
  { id: "rule-red-produce", title: "If spoilage urgency = red AND days remaining < 3, apply discount", urgency: "red", daysRemainingLessThan: 3, discountPercent: 18, enabled: true, lastTriggered: "2026-05-12 09:20" },
  { id: "rule-amber-dairy", title: "If spoilage urgency = amber AND days remaining < 7, apply discount", urgency: "amber", daysRemainingLessThan: 7, discountPercent: 10, enabled: true, lastTriggered: "2026-05-11 18:05" },
  { id: "rule-red-beverage", title: "If spoilage urgency = red AND days remaining < 3, apply store push", urgency: "red", daysRemainingLessThan: 3, discountPercent: 12, enabled: false, lastTriggered: "2026-05-09 14:40" },
];

export const reorderQueue: ReorderQueueItem[] = [
  { sku: "TOM-BLR-01", currentStock: 148, reorderPoint: 180, suggestedQty: 90, supplier: "Green Valley Farms", leadTimeDays: 2 },
  { sku: "MIL-MUM-04", currentStock: 92, reorderPoint: 120, suggestedQty: 60, supplier: "Riverbend Dairy", leadTimeDays: 1 },
  { sku: "MAN-HYD-09", currentStock: 76, reorderPoint: 70, suggestedQty: 30, supplier: "Deccan Orchards", leadTimeDays: 3 },
  { sku: "RIC-DEL-11", currentStock: 510, reorderPoint: 420, suggestedQty: 100, supplier: "Sunfield Grains", leadTimeDays: 6 },
];

export const anomalyAlerts: AnomalyAlert[] = [
  { id: "a1", type: "demand_spike", title: "Demand spike detected", description: "Tomato demand is 14% above forecast in Bangalore.", affected: "TOM-BLR-01 / Bangalore North", timestamp: "12 May 2026, 09:10" },
  { id: "a2", type: "cold_chain_break", title: "Cold chain break", description: "Milk pallet temperature exceeded threshold for 18 minutes.", affected: "MIL-MUM-04 / Mumbai Cold Hub", timestamp: "12 May 2026, 08:35" },
  { id: "a3", type: "supplier_delay", title: "Supplier delay", description: "Riverbend Dairy inbound load is delayed by 5 hours.", affected: "Mumbai Cold Hub", timestamp: "12 May 2026, 07:50" },
  { id: "a4", type: "overstock", title: "Overstock risk", description: "Frozen peas inventory is above forecasted sell-through.", affected: "PEA-CHN-02 / Chennai Freezer 2", timestamp: "11 May 2026, 19:15" },
];

export const externalSignals: ExternalSignal[] = [
  { id: "weather", type: "Weather", description: "Heavy rain forecast - Bangalore, 3 days", impact: "High" },
  { id: "events", type: "Local Events", description: "Diwali in 12 days - Demand spike expected for sweets, dairy", impact: "High" },
  { id: "crop", type: "Crop Report", description: "Tomato supply down 18% - price pressure likely", impact: "Medium" },
];

export const forecastTags: ForecastTag[] = [
  { id: "diwali", label: "Diwali demand window", type: "event", dateRange: "2026-05-24 - 2026-06-02" },
  { id: "rain", label: "Monsoon rain signal", type: "weather", dateRange: "2026-05-13 - 2026-05-16" },
  { id: "summer", label: "Summer beverage lift", type: "seasonal", dateRange: "2026-05-01 - 2026-06-15" },
];

export const supplierRows: SupplierRow[] = [
  { name: "Green Valley Farms", type: "Farm", category: "Vegetables", region: "Karnataka", reliability: 97, onTimeDeliveryRate: 94, fillRate: 96, status: "Preferred" },
  { name: "Riverbend Dairy", type: "Processor", category: "Dairy", region: "Maharashtra", reliability: 93, onTimeDeliveryRate: 82, fillRate: 88, status: "Monitor" },
  { name: "Sunfield Grains", type: "Farm", category: "Grains", region: "Delhi NCR", reliability: 96, onTimeDeliveryRate: 91, fillRate: 93, status: "Preferred" },
  { name: "Urban Fresh Bangalore", type: "Retail", category: "Retail produce", region: "Karnataka", reliability: 92, onTimeDeliveryRate: 89, fillRate: 94, status: "Retail" },
  { name: "DailyMart Mumbai", type: "Retail", category: "Retail dairy", region: "Maharashtra", reliability: 89, onTimeDeliveryRate: 78, fillRate: 84, status: "Retail" },
];

export const shipmentRows: ShipmentRow[] = [
  { shipmentId: "SHP-10042", supplier: "Green Valley Farms", destination: "Bangalore North", sku: "TOM-BLR-01", status: "In transit", fillRate: 96, eta: "Today, 16:30" },
  { shipmentId: "SHP-10043", supplier: "Riverbend Dairy", destination: "Mumbai Cold Hub", sku: "MIL-MUM-04", status: "Delayed", fillRate: 88, eta: "Today, 21:15" },
  { shipmentId: "SHP-10044", supplier: "Sunfield Grains", destination: "Delhi Dry Storage", sku: "RIC-DEL-11", status: "Delivered", fillRate: 93, eta: "Completed" },
  { shipmentId: "SHP-10045", supplier: "Deccan Orchards", destination: "Hyderabad East", sku: "MAN-HYD-09", status: "Loading", fillRate: 81, eta: "Tomorrow, 10:00" },
];

export const regionalStateDemand: RegionalStateDemand[] = [
  { state: "Maharashtra", demandIndex: 88, color: "#0F8F5F" },
  { state: "Karnataka", demandIndex: 82, color: "#24A873" },
  { state: "Tamil Nadu", demandIndex: 68, color: "#68C796" },
  { state: "Delhi", demandIndex: 74, color: "#43B881" },
  { state: "West Bengal", demandIndex: 55, color: "#E8F5EE" },
];
