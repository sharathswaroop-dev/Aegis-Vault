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

export interface InventoryRow {
  sku: string;
  item: string;
  category: string;
  location: string;
  stock: string;
  age: string;
  risk: RiskLevel;
  action: string;
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
