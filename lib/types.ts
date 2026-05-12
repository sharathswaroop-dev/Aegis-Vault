import type { ReactNode } from "react";

export type FoodFlowRole = "Admin" | "Warehouse" | "Retailer" | "Distributor" | "Farmer";
export type Tone = "good" | "warn" | "neutral";
export type RiskLevel = "Low" | "Medium" | "High";
export type UrgencyColor = "green" | "amber" | "red";
export type BiasDirection = "over" | "under";
export type SignalImpact = "High" | "Medium" | "Low";
export type AnomalyType = "demand_spike" | "cold_chain_break" | "supplier_delay" | "overstock";
export type ForecastTagType = "event" | "weather" | "seasonal";

export interface Kpi {
  label: string;
  value: string;
  change: string;
  tone: Tone;
}

export interface ForecastPoint {
  week: string;
  p10: number;
  p50: number;
  p90: number;
}

export interface RegionalDemandPoint {
  region: string;
  vegetables: number;
  dairy: number;
  grains: number;
}

export type DemandPattern = "stable" | "seasonal" | "intermittent" | "long-tail";
export type ForecastConfidence = "low" | "medium" | "high";

export interface SKUSegment {
  sku: string;
  pattern: DemandPattern;
  model: string;
  confidence: ForecastConfidence;
  historyWeeks: number;
  variability: "low" | "medium" | "high";
}

export interface ForecastOverride {
  sku: string;
  aiForecast: string;
  humanOverride: string;
  changedBy: string;
  reason: string;
  actualOutcome: string;
  accuracy: "AI was closer" | "Human was closer" | "AI accurate";
}

export interface ForecastAnnotation {
  date: string;
  note: string;
}

export interface InventoryRow {
  sku: string;
  item: string;
  category: string;
  location: string;
  stock: string;
  age: string;
  risk: RiskLevel;
  action: string;
  demandPattern: DemandPattern;
}

export interface BatchExpiry {
  sku: string;
  batchId: string;
  quantity: string;
  expiryDate: string;
  daysRemaining: number;
}

export interface ShelfLifeRule {
  category: string;
  maxAgeDays: number;
  warningThresholdDays: number;
}

export interface AccuracyLogRow {
  sku: string;
  region: string;
  forecast: number;
  actual: number;
  mape: number;
  bias: BiasDirection;
  week: string;
  trend: { week: string; mape: number }[];
}

export interface MarkdownRule {
  id: string;
  title: string;
  urgency: UrgencyColor;
  daysRemainingLessThan: number;
  discountPercent: number;
  enabled: boolean;
  lastTriggered: string;
}

export interface ReorderQueueItem {
  sku: string;
  currentStock: number;
  reorderPoint: number;
  suggestedQty: number;
  supplier: string;
  leadTimeDays: number;
}

export interface AnomalyAlert {
  id: string;
  type: AnomalyType;
  title: string;
  description: string;
  affected: string;
  timestamp: string;
}

export interface ExternalSignal {
  id: string;
  type: string;
  description: string;
  impact: SignalImpact;
}

export interface ForecastTag {
  id: string;
  label: string;
  type: ForecastTagType;
  dateRange: string;
}

export interface SupplierRow {
  name: string;
  type: "Farm" | "Processor" | "Distributor" | "Retail";
  category: string;
  region: string;
  reliability: number;
  onTimeDeliveryRate: number;
  fillRate: number;
  status: string;
}

export interface ShipmentRow {
  shipmentId: string;
  supplier: string;
  destination: string;
  sku: string;
  status: string;
  fillRate: number;
  eta: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail: string;
  icon?: ReactNode;
}

export interface RegionalStateDemand {
  state: string;
  demandIndex: number;
  color: string;
}

export interface AnalyticsRecord {
  id: string;
  role: FoodFlowRole;
  period: string;
  wasteRate?: number;
  priceReceived?: number;
  marketPrice?: number;
  earnings?: number;
  harvestPerformance?: number;
  wasteCost?: number;
  inventoryTurnover?: number;
  agingBreakdown?: Record<string, number>;
  spoilageTimeline?: Record<string, number>;
  fillRate?: number;
  deliveryPerformance?: number;
  routeEfficiency?: number;
  supplierReliability?: number;
  salesVelocity?: Record<string, number>;
  markdownImpact?: number;
  demandStockGap?: Record<string, number>;
  customerReturnRate?: number;
  platformWasteCost?: number;
  regionalDemand?: Record<string, number>;
  forecastAccuracy?: number;
}

export interface FarmerBatch {
  batchId: string;
  crop: string;
  quantity: string;
  fieldLocation: string;
  harvestDate: string;
  status: "Ready" | "Overdue pickup" | "Scheduled";
}

export interface SpoilageBatch {
  batchId: string;
  crop: string;
  quantity: string;
  daysUntilExpiry: number;
  urgency: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  recommendedAction: string;
}

export interface PendingPickup {
  batchId: string;
  crop: string;
  quantity: string;
  pickupLocation: string;
  scheduledDate: string;
  warehouse: string;
  status: "Confirmed" | "Urgent" | "Pending";
}

export interface PriceForecastPoint {
  day: number;
  tomato: number;
  mango: number;
  onion: number;
}

export interface PriceForecastTableRow {
  crop: string;
  currentPrice: string;
  forecastPrice: string;
  change: string;
  recommendation: string;
}

export type FilterCategory = 
  | "crop_type" 
  | "urgency" 
  | "date_range"
  | "category"
  | "status"
  | "warehouse_hub"
  | "route"
  | "partner_warehouse"
  | "stock_status"
  | "delivery_status";

export interface FilterOption {
  value: string;
  label: string;
}

export interface SearchResultItem {
  type: "inventory" | "warehouse" | "batch" | "shipment" | "retailer" | "supplier" | "order";
  name: string;
  subtitle: string;
  icon: string;
  href: string;
}

export interface AnomalyAlertDetail {
  fullDescription: string;
  affectedItems: string[];
  recommendedActions: string[];
}

export interface AiStatusInfo {
  status: string;
  model: string;
  lastUpdated: string;
  accuracy: number;
  nextRefresh: string;
}
