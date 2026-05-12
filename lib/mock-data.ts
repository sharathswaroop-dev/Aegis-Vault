import type {
  AccuracyLogRow,
  AnomalyAlert,
  AnomalyAlertDetail,
  BatchExpiry,
  ExternalSignal,
  FarmerBatch,
  ForecastPoint,
  ForecastTag,
  InventoryRow,
  MarkdownRule,
  PendingPickup,
  PriceForecastPoint,
  PriceForecastTableRow,
  RegionalDemandPoint,
  RegionalStateDemand,
  ReorderQueueItem,
  SearchResultItem,
  ShelfLifeRule,
  ShipmentRow,
  SpoilageBatch,
  SupplierRow,
} from "@/lib/types";

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
  { sku: "TOM-BLR-01", item: "Tomatoes", category: "Vegetables", location: "Bangalore North", stock: "148 tons", age: "2.1 days", risk: "Medium", action: "Discount 10%", demandPattern: "stable" },
  { sku: "MIL-MUM-04", item: "Whole Milk", category: "Dairy", location: "Mumbai Cold Hub", stock: "92 kl", age: "1.4 days", risk: "Low", action: "Hold price", demandPattern: "stable" },
  { sku: "RIC-DEL-11", item: "Basmati Rice", category: "Grains", location: "Delhi Dry Storage", stock: "510 tons", age: "18 days", risk: "Low", action: "Rebalance", demandPattern: "intermittent" },
  { sku: "MAN-HYD-09", item: "Mangoes", category: "Fruits", location: "Hyderabad East", stock: "76 tons", age: "3.8 days", risk: "High", action: "Priority dispatch", demandPattern: "seasonal" },
  { sku: "PEA-CHN-02", item: "Frozen Peas", category: "Frozen", location: "Chennai Freezer 2", stock: "124 tons", age: "9 days", risk: "Low", action: "Bundle offer", demandPattern: "stable" },
  { sku: "JUI-BLR-07", item: "Orange Juice", category: "Beverages", location: "Bangalore South", stock: "61 kl", age: "5 days", risk: "Medium", action: "Store push", demandPattern: "seasonal" },
];

export const SKU_SEGMENTS: SKUSegment[] = [
  { sku: 'Tomato', pattern: 'stable', model: 'Moving Average', confidence: 'high', historyWeeks: 52, variability: 'low' },
  { sku: 'Mango', pattern: 'seasonal', model: 'Prophet', confidence: 'high', historyWeeks: 36, variability: 'medium' },
  { sku: 'Specialty Cheese', pattern: 'intermittent', model: 'ARIMA', confidence: 'medium', historyWeeks: 18, variability: 'high' },
  { sku: 'Exotic Fruits', pattern: 'long-tail', model: 'Heuristic Avg', confidence: 'low', historyWeeks: 8, variability: 'high' },
  { sku: 'Potato', pattern: 'stable', model: 'Moving Average', confidence: 'high', historyWeeks: 48, variability: 'low' },
  { sku: 'Sweets/Mithai', pattern: 'seasonal', model: 'Prophet', confidence: 'high', historyWeeks: 30, variability: 'medium' },
  { sku: 'Imported Spices', pattern: 'intermittent', model: 'ARIMA', confidence: 'medium', historyWeeks: 14, variability: 'high' },
];

export const FORECAST_OVERRIDES: ForecastOverride[] = [
  { sku: "Tomato", aiForecast: "480 tons", humanOverride: "620 tons", changedBy: "Warehouse Manager", reason: "Festival week", actualOutcome: "590 tons", accuracy: "AI was closer" },
  { sku: "Mango", aiForecast: "200 tons", humanOverride: "150 tons", changedBy: "Retailer", reason: "Overstock last month", actualOutcome: "170 tons", accuracy: "Human was closer" },
  { sku: "Onion", aiForecast: "310 tons", humanOverride: "310 tons", changedBy: "—", reason: "No override", actualOutcome: "298 tons", accuracy: "AI accurate" },
  { sku: "Potato", aiForecast: "540 tons", humanOverride: "700 tons", changedBy: "Distributor", reason: "New retail partner added", actualOutcome: "680 tons", accuracy: "Human was closer" },
  { sku: "Dairy", aiForecast: "190 tons", humanOverride: "160 tons", changedBy: "Warehouse Manager", reason: "Supplier delay expected", actualOutcome: "155 tons", accuracy: "Human was closer" },
];

export const FORECAST_ANNOTATIONS: ForecastAnnotation[] = [
  { date: "May 14", note: "Diwali prep begins — expect 2x demand on sweets, dairy" },
  { date: "May 20", note: "Monsoon arrival forecast — soup/warm food demand rises" },
  { date: "May 25", note: "Competitor store closed nearby — capture additional retail demand" },
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

export const farmerBatches: FarmerBatch[] = [
  { batchId: "TOM-BLR-01", crop: "Tomato", quantity: "3.2 tons", fieldLocation: "Field A, Bangalore", harvestDate: "12 May 2026", status: "Ready" },
  { batchId: "MNG-HSR-02", crop: "Mango", quantity: "2.8 tons", fieldLocation: "Orchard B, Hassan", harvestDate: "11 May 2026", status: "Overdue pickup" },
  { batchId: "ONI-MYS-03", crop: "Onion", quantity: "1.9 tons", fieldLocation: "Field C, Mysore", harvestDate: "13 May 2026", status: "Ready" },
  { batchId: "POT-TUM-04", crop: "Potato", quantity: "2.1 tons", fieldLocation: "Field D, Tumkur", harvestDate: "14 May 2026", status: "Scheduled" },
  { batchId: "GRN-BLR-05", crop: "Greens", quantity: "2.0 tons", fieldLocation: "Field E, Bangalore", harvestDate: "12 May 2026", status: "Ready" },
];

export const spoilageBatches: SpoilageBatch[] = [
  { batchId: "MNG-HSR-02", crop: "Mango", quantity: "2.8 tons", daysUntilExpiry: 2, urgency: "CRITICAL", recommendedAction: "Request emergency pickup" },
  { batchId: "TOM-BLR-01", crop: "Tomato", quantity: "3.2 tons", daysUntilExpiry: 4, urgency: "HIGH", recommendedAction: "Schedule priority pickup" },
  { batchId: "GRN-BLR-05", crop: "Greens", quantity: "2.0 tons", daysUntilExpiry: 5, urgency: "MEDIUM", recommendedAction: "Standard pickup this week" },
  { batchId: "ONI-MYS-03", crop: "Onion", quantity: "1.9 tons", daysUntilExpiry: 7, urgency: "LOW", recommendedAction: "No action needed yet" },
];

export const pendingPickups: PendingPickup[] = [
  { batchId: "TOM-BLR-01", crop: "Tomato", quantity: "3.2 tons", pickupLocation: "Field A, Bangalore", scheduledDate: "13 May 2026", warehouse: "Bangalore North", status: "Confirmed" },
  { batchId: "MNG-HSR-02", crop: "Mango", quantity: "2.8 tons", pickupLocation: "Orchard B, Hassan", scheduledDate: "12 May 2026", warehouse: "Bangalore North", status: "Urgent" },
  { batchId: "GRN-BLR-05", crop: "Greens", quantity: "2.0 tons", pickupLocation: "Field E, Bangalore", scheduledDate: "14 May 2026", warehouse: "Mumbai Cold Hub", status: "Pending" },
];

export const priceForecastData: PriceForecastPoint[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const tomatoBase = 2400;
  const tomato = Math.round(tomatoBase + (day * 14));
  const mangoBase = 3100;
  const mango = Math.round(mangoBase - (day * 2.5));
  const onionBase = 1200;
  const onion = Math.round(onionBase + (day * 1));
  return { day, tomato, mango, onion };
});

export const priceForecastTable: PriceForecastTableRow[] = [
  { crop: "Tomato", currentPrice: "₹2,400", forecastPrice: "₹2,820", change: "↑14%", recommendation: "Harvest now and prioritize dispatch" },
  { crop: "Mango", currentPrice: "₹3,100", forecastPrice: "₹2,850", change: "↓8%", recommendation: "Sell existing stock within 5 days" },
  { crop: "Onion", currentPrice: "₹1,200", forecastPrice: "₹1,230", change: "↑2%", recommendation: "No urgency, standard schedule" },
];

export const aiInsight: string = "Tomato prices are rising due to festival demand in Bangalore. Best window to sell: next 8–12 days.";

export const anomalyAlertDetails: Record<string, AnomalyAlertDetail> = {
  demand_spike: {
    fullDescription: "Tomato demand in Bangalore has exceeded our AI forecast by 14%. This surge is driven by upcoming festival season and reduced supply from neighboring regions. Historical patterns suggest this demand spike will continue for the next 8-12 days.",
    affectedItems: ["TOM-BLR-01 (3.2 tons)", "TOM-HYD-03 (2.5 tons)", "TOM-MYS-02 (1.8 tons)", "Bangalore North Warehouse"],
    recommendedActions: [
      "Increase harvest allocation to Bangalore North",
      "Notify distributors of priority dispatch",
      "Consider pre-negotiating better rates for volume",
      "Monitor inventory levels every 6 hours",
    ],
  },
  cold_chain_break: {
    fullDescription: "Temperature excursion detected in Cold Storage Unit 2 at Mumbai Cold Hub. Temperature exceeded 8°C threshold for 18 minutes before restoration. Product quality may be impacted for temperature-sensitive items.",
    affectedItems: ["MIL-MUM-04 (Whole Milk)", "CHE-MUM-02 (Cheese)", "BUT-MUM-01 (Butter)", "Cold Storage Unit 2"],
    recommendedActions: [
      "Quarantine affected batches for quality inspection",
      "Check temperature logger data for duration of breach",
      "Notify quality assurance team immediately",
      "Document incident for compliance reporting",
    ],
  },
  supplier_delay: {
    fullDescription: "Riverbend Dairy has notified a 5-hour delay for inbound shipment due to traffic congestion on Mumbai-Pune highway. The delay will impact cold chain schedule and may affect next-day delivery commitments to retailers.",
    affectedItems: ["Mumbai Cold Hub", "Route 7 Distribution", "3 Retailer orders"],
    recommendedActions: [
      "Reroute via alternative highway (adds 20km but bypasses congestion)",
      "Notify affected retailers of revised ETA",
      "Adjust cold storage intake schedule",
      "Consider emergency supplier backup for next shipment",
    ],
  },
};

export const searchInventory: SearchResultItem[] = [
  { type: "inventory", name: "Tomatoes", subtitle: "TOM-BLR-01 — 148 tons", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Whole Milk", subtitle: "MIL-MUM-04 — 92 kl", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Basmati Rice", subtitle: "RIC-DEL-11 — 510 tons", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Mangoes", subtitle: "MAN-HYD-09 — 76 tons", icon: "box", href: "/inventory" },
  { type: "warehouse", name: "Bangalore North", subtitle: "86% capacity, 1240 orders", icon: "warehouse", href: "/warehouses" },
  { type: "warehouse", name: "Mumbai Cold Hub", subtitle: "79% capacity, 980 orders", icon: "warehouse", href: "/warehouses" },
  { type: "warehouse", name: "Delhi Dry Storage", subtitle: "72% capacity, 1110 orders", icon: "warehouse", href: "/warehouses" },
  { type: "warehouse", name: "Hyderabad East", subtitle: "91% capacity, 760 orders", icon: "warehouse", href: "/warehouses" },
  { type: "batch", name: "TOM-BLR-01", subtitle: "Tomato — 3.2 tons — Ready", icon: "package", href: "/inventory" },
  { type: "batch", name: "MNG-HSR-02", subtitle: "Mango — 2.8 tons — Overdue", icon: "package", href: "/inventory" },
  { type: "batch", name: "ONI-MYS-03", subtitle: "Onion — 1.9 tons — Ready", icon: "package", href: "/inventory" },
  { type: "shipment", name: "SHP-10042", subtitle: "Green Valley → Bangalore North", icon: "truck", href: "/distribution" },
  { type: "shipment", name: "SHP-10043", subtitle: "Riverbend Dairy → Mumbai (Delayed)", icon: "truck", href: "/distribution" },
  { type: "supplier", name: "Green Valley Farms", subtitle: "Vegetables, Karnataka", icon: "factory", href: "/suppliers" },
  { type: "supplier", name: "Riverbend Dairy", subtitle: "Dairy, Maharashtra", icon: "factory", href: "/suppliers" },
  { type: "retailer", name: "FreshMart Bangalore", subtitle: "Store #BLR-01", icon: "store", href: "/distribution" },
  { type: "retailer", name: "DailyMart Mumbai", subtitle: "Store #MUM-03", icon: "store", href: "/distribution" },
];

export const farmerSearchData: SearchResultItem[] = [
  { type: "inventory", name: "Tomatoes", subtitle: "TOM-BLR-01 — 3.2 tons", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Mangoes", subtitle: "MNG-HSR-02 — 2.8 tons", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Onions", subtitle: "ONI-MYS-03 — 1.9 tons", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Potatoes", subtitle: "POT-TUM-04 — 2.1 tons", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Greens", subtitle: "GRN-BLR-05 — 2.0 tons", icon: "box", href: "/inventory" },
  { type: "warehouse", name: "Bangalore North", subtitle: "My linked warehouse", icon: "warehouse", href: "/warehouses" },
  { type: "batch", name: "TOM-BLR-01", subtitle: "Tomato — 3.2 tons — Ready", icon: "package", href: "/inventory" },
  { type: "batch", name: "MNG-HSR-02", subtitle: "Mango — 2.8 tons — Overdue", icon: "package", href: "/inventory" },
];

export const warehouseSearchData: SearchResultItem[] = searchInventory;

export const distributorSearchData: SearchResultItem[] = [
  { type: "shipment", name: "SHP-10042", subtitle: "Green Valley → Bangalore North", icon: "truck", href: "/distribution" },
  { type: "shipment", name: "SHP-10043", subtitle: "Riverbend Dairy → Mumbai (Delayed)", icon: "truck", href: "/distribution" },
  { type: "shipment", name: "SHP-10044", subtitle: "Sunfield Grains → Delhi (Delivered)", icon: "truck", href: "/distribution" },
  { type: "shipment", name: "SHP-10045", subtitle: "Deccan Orchards → Hyderabad (Loading)", icon: "truck", href: "/distribution" },
  { type: "warehouse", name: "Bangalore North", subtitle: "Route 1, Route 5", icon: "warehouse", href: "/warehouses" },
  { type: "warehouse", name: "Mumbai Cold Hub", subtitle: "Route 2, Route 7", icon: "warehouse", href: "/warehouses" },
  { type: "retailer", name: "FreshMart Bangalore", subtitle: "Store #BLR-01, 42 orders", icon: "store", href: "/distribution" },
  { type: "retailer", name: "DailyMart Mumbai", subtitle: "Store #MUM-03, 38 orders", icon: "store", href: "/distribution" },
  { type: "retailer", name: "SuperMart Chennai", subtitle: "Store #CHN-02, 28 orders", icon: "store", href: "/distribution" },
];

export const retailerSearchData: SearchResultItem[] = [
  { type: "inventory", name: "Tomatoes", subtitle: "42 units in stock", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Onions", subtitle: "18 units (Low Stock)", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Potatoes", subtitle: "65 units in stock", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Milk", subtitle: "28 units in stock", icon: "box", href: "/inventory" },
  { type: "inventory", name: "Mangoes", subtitle: "Out of Stock", icon: "box", href: "/inventory" },
  { type: "order", name: "Order #ORD-001", subtitle: "Expected Tomorrow 9am", icon: "shopping-cart", href: "/distribution" },
  { type: "order", name: "Order #ORD-002", subtitle: "Scheduled for 15 May", icon: "shopping-cart", href: "/distribution" },
];

export const adminSearchData: SearchResultItem[] = searchInventory;

export const roleAccuracy: Record<string, number> = {
  farmer: 89.2,
  warehouse: 92.5,
  distributor: 88.7,
  retailer: 91.0,
  admin: 91.4,
};
