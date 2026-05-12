"use client";

import {
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  CloudSun,
  Gauge,
  Handshake,
  LayoutDashboard,
  LineChart,
  Map,
  PackageCheck,
  Percent,
  Route,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Store,
  Thermometer,
  Timer,
  Tractor,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { useRoleStore, type Role } from "@/lib/stores/roleStore";

export interface RoleKpi {
  label: string;
  value: string;
  subtitle: string;
  icon: typeof LayoutDashboard;
}

export interface RoleNavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

export interface RoleNavSection {
  section: string;
  items: RoleNavItem[];
}

export interface RoleInsight {
  message: string;
}

export interface AnomalyAlert {
  id: string;
  type: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
}

export interface AIRec {
  id: string;
  title: string;
  description: string;
  action: string;
}

export interface ChartPoint {
  day: string;
  value: number;
}

export interface RoleNotification {
  type: string;
  title: string;
  description: string;
  time: string;
}

export interface RoleConfig {
  companyName: string;
  userInitials: string;
  kpis: RoleKpi[];
  inventoryKpis: RoleKpi[];
  forecastingKpis: RoleKpi[];
  distributionKpis: RoleKpi[];
  suppliersKpis: RoleKpi[];
  navItems: RoleNavSection[];
  aiInsights: RoleInsight[];
  notifications: RoleNotification[];
  anomalyAlerts: AnomalyAlert[];
  aiRecommendations: AIRec[];
  forecastChartData: ChartPoint[];
  forecastChartTitle: string;
  forecastChartSubtitle: string;
  supplyChainLabel: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  inventoryTitle: string;
  inventorySubtitle: string;
  forecastingTitle: string;
  forecastingSubtitle: string;
  distributionTitle: string;
  distributionSubtitle: string;
  suppliersTitle: string;
  suppliersSubtitle: string;
  forecastingFocus: string;
  analyticsItems: string[];
}

export const ROLE_SELECT_OPTIONS: { label: string; value: Role }[] = [
  { label: "Farmer", value: "farmer" },
  { label: "Warehouse", value: "warehouse" },
  { label: "Distributor", value: "distributor" },
  { label: "Retailer", value: "retailer" },
  { label: "Admin", value: "admin" },
];

export const ROLE_CONFIG: Record<Role, RoleConfig> = {
  farmer: {
    companyName: "Green Valley Farms",
    userInitials: "FA",
    kpis: [
      { label: "Harvest Ready", value: "12 tons", subtitle: "Ready for pickup", icon: Tractor },
      { label: "Spoilage Risk", value: "8.4%", subtitle: "Perishable batches", icon: Percent },
      { label: "Pending Pickups", value: "3 batches", subtitle: "Warehouse scheduled", icon: PackageCheck },
      { label: "Price Forecast", value: "↑ 14%", subtitle: "Bangalore tomato demand", icon: LineChart },
    ],
    inventoryKpis: [
      { label: "My Batches", value: "8", subtitle: "Total registered", icon: Boxes },
      { label: "In Field", value: "4 tons", subtitle: "Near harvest", icon: Tractor },
      { label: "Stored", value: "6 tons", subtitle: "At warehouse", icon: Warehouse },
      { label: "High Risk", value: "1", subtitle: "Needs movement", icon: Percent },
    ],
    forecastingKpis: [
      { label: "Yield Accuracy", value: "92%", subtitle: "Model vs harvest", icon: LineChart },
      { label: "Market Trend", value: "Bullish", subtitle: "Next 14 days", icon: TrendingUp },
      { label: "Pickup ETA", value: "2.4h", subtitle: "Avg response", icon: Truck },
      { label: "Forecast Conf", value: "High", subtitle: "95% confidence", icon: Gauge },
    ],
    distributionKpis: [
      { label: "In Transit", value: "0", subtitle: "Farmer dispatch", icon: Truck },
      { label: "Pickup Today", value: "1", subtitle: "Bangalore North", icon: PackageCheck },
      { label: "Route Status", value: "Clear", subtitle: "To Hub", icon: Route },
      { label: "Fill Rate", value: "100%", subtitle: "Batch accuracy", icon: Percent },
    ],
    suppliersKpis: [
      { label: "Linked Hubs", value: "1", subtitle: "Primary outlet", icon: Warehouse },
      { label: "Trust Score", value: "98/100", subtitle: "Reliability", icon: ShieldCheck },
      { label: "Payment ETA", value: "2 days", subtitle: "Post pickup", icon: CircleDollarSign },
      { label: "Support", value: "Online", subtitle: "Field agent", icon: Users },
    ],
    navItems: [
      {
        section: "MAIN",
        items: [
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { label: "My Produce", href: "/inventory", icon: Boxes },
          { label: "Forecasting", href: "/forecasting", icon: LineChart },
          { label: "My Warehouse", href: "/warehouses", icon: Warehouse },
          { label: "Notifications", href: "/notifications", icon: Bell },
        ],
      },
    ],
    aiInsights: [
      { message: "Tomato demand rising in Bangalore — harvest now for best price" },
      { message: "Your mango batch #F-44 expires in 4 days — request urgent pickup" },
    ],
    notifications: [
      { type: "pickup", title: "Warehouse pickup confirmed", description: "Bangalore North pickup slot confirmed for tomorrow morning.", time: "10 min ago" },
      { type: "price", title: "Price drop alert on onions", description: "Onion bid prices fell 6% in your target market.", time: "42 min ago" },
    ],
    anomalyAlerts: [
      { id: "f-a1", type: "high", title: "Demand spike detected", description: "Tomato demand in Bangalore up 42% over 48h.", timestamp: "Just now" },
      { id: "f-a2", type: "medium", title: "Cold chain break", description: "Temp fluctuation detected in MIL-MUM-04.", timestamp: "12 min ago" },
      { id: "f-a3", type: "low", title: "Supplier delay", description: "Riverbend Dairy notified 5h delay in transit.", timestamp: "1h ago" },
    ],
    aiRecommendations: [
      { id: "f-r1", title: "Harvest Now", description: "Tomato demand rising — optimal price window next 24h.", action: "Execute" },
      { id: "f-r2", title: "Urgent Pickup", description: "Mango batch #F-44 expires in 4 days.", action: "Request" },
    ],
    forecastChartData: [
      { day: "Mon", value: 12 }, { day: "Tue", value: 15 }, { day: "Wed", value: 14 }, 
      { day: "Thu", value: 18 }, { day: "Fri", value: 22 }, { day: "Sat", value: 20 }, { day: "Sun", value: 24 }
    ],
    forecastChartTitle: "AI Demand Forecast",
    forecastChartSubtitle: "Crop price trend for Tomato, Mango, and Onion (Next 7 days)",
    supplyChainLabel: "My Warehouse",
    dashboardTitle: "Farm Operations",
    dashboardSubtitle: "Track harvest readiness, warehouse pickups, spoilage risk, and price forecasts.",
    inventoryTitle: "My Produce Stock",
    inventorySubtitle: "Monitor harvest batches, storage health at hubs, and perishability risk.",
    forecastingTitle: "Yield & Price Forecast",
    forecastingSubtitle: "Predict harvest yield, market demand spikes, and optimal pricing windows.",
    distributionTitle: "Pickups & Transit",
    distributionSubtitle: "Track scheduled warehouse pickups and transit status of your dispatched batches.",
    suppliersTitle: "Warehouse Partners",
    suppliersSubtitle: "Manage relationships with cold storage hubs and regional distribution centers.",
    forecastingFocus: "Forecasting shows harvest timing, market prices, and pickup demand for your produce.",
    analyticsItems: [],
  },
  warehouse: {
    companyName: "Northstar Foods",
    userInitials: "WH",
    kpis: [
      { label: "Active Hubs", value: "42", subtitle: "Across 5 regions", icon: Warehouse },
      { label: "Utilization", value: "81%", subtitle: "Healthy capacity", icon: Gauge },
      { label: "Cold Compliance", value: "98.2%", subtitle: "Temperature stable", icon: Thermometer },
      { label: "Pallet Turns", value: "5.8x", subtitle: "Weekly velocity", icon: Boxes },
    ],
    inventoryKpis: [
      { label: "Total Stock", value: "4.2k tons", subtitle: "Across hubs", icon: Boxes },
      { label: "Inbound Flow", value: "850 tons", subtitle: "Next 24h", icon: Truck },
      { label: "Capacity Used", value: "81%", subtitle: "Overall", icon: Gauge },
      { label: "Cold Alerts", value: "2", subtitle: "Requires check", icon: Thermometer },
    ],
    forecastingKpis: [
      { label: "Inbound Acc", value: "91%", subtitle: "Schedule accuracy", icon: LineChart },
      { label: "Outbound Pres", value: "High", subtitle: "Next 48h", icon: TrendingUp },
      { label: "Storage Life", value: "4.8 days", subtitle: "Avg remaining", icon: Clock },
      { label: "Space Util", value: "92%", subtitle: "Optimized", icon: Percent },
    ],
    distributionKpis: [
      { label: "Hub Dispatch", value: "42", subtitle: "Active today", icon: Truck },
      { label: "In Transit", value: "112 tons", subtitle: "To retailers", icon: PackageCheck },
      { label: "Loading Time", value: "45 min", subtitle: "Avg per truck", icon: Clock },
      { label: "Fleet Health", value: "Good", subtitle: "Cold vehicles", icon: ShieldCheck },
    ],
    suppliersKpis: [
      { label: "Farmers", value: "124", subtitle: "Linked suppliers", icon: Users },
      { label: "OTIF Rate", value: "94.8%", subtitle: "Inbound", icon: ShieldCheck },
      { label: "Lead Time", value: "2.4 days", subtitle: "Farm to Hub", icon: Clock },
      { label: "Rejection", value: "1.2%", subtitle: "Quality variance", icon: Percent },
    ],
    navItems: [
      {
        section: "MAIN",
        items: [
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { label: "Inventory", href: "/inventory", icon: Boxes },
          { label: "Forecasting", href: "/forecasting", icon: LineChart },
          { label: "Warehouses", href: "/warehouses", icon: Warehouse },
        ],
      },
    ],
    aiInsights: [
      { message: "Tomato demand rising in Bangalore — harvest now for best price" },
      { message: "Apply 10% discount to mango batches aged over 3 days to reduce spoilage" },
    ],
    notifications: [
      { type: "forecast", title: "Demand shift detected", description: "Tomato demand increased in Bangalore for the next 36 hours.", time: "12 min ago" },
      { type: "spoilage", title: "Mango aging threshold crossed", description: "Hyderabad mango batches need markdown or dispatch.", time: "31 min ago" },
    ],
    anomalyAlerts: [
      { id: "w-a1", type: "high", title: "Low stock warning", description: "Onion stock in Bangalore below safety threshold.", timestamp: "5 min ago" },
      { id: "w-a2", type: "medium", title: "Expiry alert", description: "Mango batch #M-99 reaching 3-day aging limit.", timestamp: "22 min ago" },
      { id: "w-a3", type: "low", title: "Inbound delay", description: "Hyderabad route delayed by 3 hours.", timestamp: "2h ago" },
    ],
    aiRecommendations: [
      { id: "w-r1", title: "Move Inventory", description: "Move 48 tons tomato from Hyderabad to Bangalore Hub.", action: "Approve" },
      { id: "w-r2", title: "Apply Discount", description: "Apply 10% discount on aged mango batches.", action: "Apply" },
    ],
    forecastChartData: [
      { day: "Mon", value: 850 }, { day: "Tue", value: 820 }, { day: "Wed", value: 880 }, 
      { day: "Thu", value: 910 }, { day: "Fri", value: 940 }, { day: "Sat", value: 980 }, { day: "Sun", value: 1050 }
    ],
    forecastChartTitle: "Inventory Movement Forecast",
    forecastChartSubtitle: "Stock in vs stock out volume trends (Next 30 days)",
    supplyChainLabel: "Farmers & Distributors",
    dashboardTitle: "Warehouse Operations",
    dashboardSubtitle: "Monitor storage health, hub utilization, cold compliance, and inventory movement.",
    inventoryTitle: "Hub Inventory Control",
    inventorySubtitle: "Manage multi-region storage, cold chain stability, and inbound/outbound flow.",
    forecastingTitle: "Replenishment Forecast",
    forecastingSubtitle: "Predict storage demand, space utilization, and replenishment requirements.",
    distributionTitle: "Outbound Logistics",
    distributionSubtitle: "Track fleet dispatch, delivery timelines, and retailer fulfillment status.",
    suppliersTitle: "Supplier Management",
    suppliersSubtitle: "Monitor farmer reliability, inbound quality, and procurement lead times.",
    forecastingFocus: "Forecasting shows demand pull, replenishment timing, and spoilage-sensitive stock movement.",
    analyticsItems: ["Regional Demand", "Waste Analytics", "Pricing Intelligence"],
  },
  distributor: {
    companyName: "FastMove Logistics",
    userInitials: "DI",
    kpis: [
      { label: "Stock In Transit", value: "234 tons", subtitle: "Active lanes", icon: Truck },
      { label: "Active Routes", value: "18", subtitle: "SLA monitored", icon: Route },
      { label: "Retailer Fill Rate", value: "94.1%", subtitle: "Current month", icon: Store },
      { label: "Dispatch Backlog", value: "7 orders", subtitle: "Needs scheduling", icon: PackageCheck },
    ],
    inventoryKpis: [
      { label: "In Transit", value: "234 tons", subtitle: "On road", icon: Truck },
      { label: "Dispatched", value: "112 tons", subtitle: "Today", icon: PackageCheck },
      { label: "Lane Stress", value: "Medium", subtitle: "Mysore route", icon: Gauge },
      { label: "Fill Rate", value: "94.1%", subtitle: "Monthly", icon: Percent },
    ],
    forecastingKpis: [
      { label: "Arrival Acc", value: "95%", subtitle: "ETA vs actual", icon: Clock },
      { label: "Route Pressure", value: "High", subtitle: "Chennai lane", icon: TrendingUp },
      { label: "Fuel Predict", value: "Stable", subtitle: "Next week", icon: LineChart },
      { label: "SLA Risk", value: "Low", subtitle: "Managed", icon: ShieldCheck },
    ],
    distributionKpis: [
      { label: "Shipments", value: "184", subtitle: "Active now", icon: Truck },
      { label: "On-Time", value: "94.6%", subtitle: "Delivery SLA", icon: Timer },
      { label: "Fill Rate", value: "89.5%", subtitle: "Load efficiency", icon: PackageCheck },
      { label: "Hubs", value: "42", subtitle: "Active today", icon: Warehouse },
    ],
    suppliersKpis: [
      { label: "Hub Partners", value: "12", subtitle: "Primary sources", icon: Warehouse },
      { label: "Pickup SLA", value: "96.2%", subtitle: "Compliance", icon: ShieldCheck },
      { label: "Wait Time", value: "18 min", subtitle: "Avg at Hub", icon: Clock },
      { label: "Incidents", value: "0", subtitle: "Last 24h", icon: Bell },
    ],
    navItems: [
      {
        section: "MAIN",
        items: [
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { label: "Shipments", href: "/distribution", icon: Truck },
          { label: "Forecasting", href: "/forecasting", icon: LineChart },
        ],
      },
    ],
    aiInsights: [
      { message: "Retailer in Mysore has critically low onion stock — dispatch batch #D-91 today" },
      { message: "Route to Chennai delayed 6 hours — reroute via Vellore to meet SLA" },
    ],
    notifications: [
      { type: "warehouse", title: "Warehouse stock ready", description: "Bangalore North has 42 tons ready for dispatch.", time: "8 min ago" },
      { type: "retailer", title: "Reorder request received", description: "FreshMart Mysore requested onion replenishment.", time: "28 min ago" },
    ],
    anomalyAlerts: [
      { id: "d-a1", type: "high", title: "Retailer low stock", description: "Onion stock at Mysore FreshMart critically low.", timestamp: "8 min ago" },
      { id: "d-a2", type: "medium", title: "Route delay", description: "Chennai Route 7 blocked by traffic accident.", timestamp: "35 min ago" },
      { id: "d-a3", type: "low", title: "Warehouse pickup ready", description: "Bangalore Hub ready for dispatch #D-42.", timestamp: "3h ago" },
    ],
    aiRecommendations: [
      { id: "d-r1", title: "Dispatch Batch", description: "Dispatch batch #D-91 to Mysore today.", action: "Dispatch" },
      { id: "d-r2", title: "Reroute Delivery", description: "Reroute Chennai delivery via Vellore bypass.", action: "Reroute" },
    ],
    forecastChartData: [
      { day: "Wk 1", value: 2100 }, { day: "Wk 2", value: 2350 }, { day: "Wk 3", value: 2200 }, 
      { day: "Wk 4", value: 2500 }, { day: "Wk 5", value: 2700 }, { day: "Wk 6", value: 2600 }
    ],
    forecastChartTitle: "Dispatch Volume Forecast",
    forecastChartSubtitle: "Shipment volume projections across all active lanes (Next 30 days)",
    supplyChainLabel: "Warehouse Partners",
    dashboardTitle: "Distribution Hub",
    dashboardSubtitle: "Track in-transit stock, route execution, retailer fill rates, and dispatch backlog.",
    inventoryTitle: "Transit Inventory",
    inventorySubtitle: "Manage stock currently moving between warehouses and retail nodes.",
    forecastingTitle: "Logistics Demand",
    forecastingSubtitle: "Predict lane pressure, route bottlenecks, and estimated arrival times.",
    distributionTitle: "Shipment Control",
    distributionSubtitle: "Live tracking, route optimization, and delivery execution management.",
    suppliersTitle: "Storage Partners",
    suppliersSubtitle: "Monitor warehouse pickup performance and inventory availability at hubs.",
    forecastingFocus: "Forecasting shows retailer demand, shipment pressure, and destination stock risk.",
    analyticsItems: ["Regional Demand"],
  },
  retailer: {
    companyName: "FreshMart Retail",
    userInitials: "RE",
    kpis: [
      { label: "Stock on Shelf", value: "1,840 units", subtitle: "Store inventory", icon: Store },
      { label: "Low Stock Alerts", value: "6 SKUs", subtitle: "Reorder suggested", icon: Bell },
      { label: "Next Delivery ETA", value: "Tomorrow 9am", subtitle: "Scheduled", icon: Truck },
      { label: "Sales Velocity", value: "↑ 22%", subtitle: "Weekend demand", icon: LineChart },
    ],
    inventoryKpis: [
      { label: "Shelf Stock", value: "1.8k units", subtitle: "Active SKUs", icon: Boxes },
      { label: "Low Stock", value: "6", subtitle: "Needs reorder", icon: Bell },
      { label: "Markdown Items", value: "12", subtitle: "Dynamic price", icon: Percent },
      { label: "Incoming", value: "400 units", subtitle: "Tomorrow", icon: Truck },
    ],
    forecastingKpis: [
      { label: "Sales Acc", value: "96%", subtitle: "SKU level", icon: LineChart },
      { label: "Demand Lift", value: "22%", subtitle: "Weekend forecast", icon: TrendingUp },
      { label: "Order Timing", value: "Optimal", subtitle: "Next 24h", icon: Clock },
      { label: "Stock Out Prob", value: "8%", subtitle: "Managed", icon: Gauge },
    ],
    distributionKpis: [
      { label: "Deliveries", value: "3", subtitle: "Scheduled today", icon: Truck },
      { label: "OTIF", value: "98.2%", subtitle: "Distributor rate", icon: ShieldCheck },
      { label: "Next ETA", value: "4.2h", subtitle: "Vehicle #TR-88", icon: Clock },
      { label: "Return Rate", value: "0.4%", subtitle: "Quality issues", icon: Percent },
    ],
    suppliersKpis: [
      { label: "Distributors", value: "1", subtitle: "FastMove Logist.", icon: Truck },
      { label: "Fill Rate", value: "94.1%", subtitle: "Current month", icon: PackageCheck },
      { label: "Last Order", value: "Yesterday", subtitle: "Confirmed", icon: CheckCircle2 },
      { label: "Contact", value: "Online", subtitle: "Rep assigned", icon: Users },
    ],
    navItems: [
      {
        section: "MAIN",
        items: [
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { label: "My Inventory", href: "/inventory", icon: Boxes },
          { label: "Orders", href: "/distribution", icon: ShoppingCart },
          { label: "Forecasting", href: "/forecasting", icon: LineChart },
        ],
      },
    ],
    aiInsights: [
      { message: "Weekend demand spike expected — increase potato order by 20%" },
      { message: "Competitor markdown detected nearby — apply 8% discount on mangoes" },
    ],
    notifications: [
      { type: "delivery", title: "Delivery arriving today", description: "Distributor delivery is expected by 4pm.", time: "15 min ago" },
      { type: "reorder", title: "Low stock reorder", description: "Onion shelf stock is below reorder point.", time: "36 min ago" },
    ],
    anomalyAlerts: [
      { id: "r-a1", type: "high", title: "Low stock alert", description: "Onions and Potatoes will stock out in 24h.", timestamp: "2 min ago" },
      { id: "r-a2", type: "medium", title: "Delivery arriving", description: "Distributor vehicle #TR-88 is 4km away.", timestamp: "18 min ago" },
      { id: "r-a3", type: "low", title: "Market markdown", description: "Competitor nearby reduced mango prices.", timestamp: "2h ago" },
    ],
    aiRecommendations: [
      { id: "r-r1", title: "Weekend Prep", description: "Increase potato order by 20% for weekend.", action: "Update" },
      { id: "r-r2", title: "Price Match", description: "Apply 8% markdown on mangoes.", action: "Apply" },
    ],
    forecastChartData: [
      { day: "Mon", value: 450 }, { day: "Tue", value: 480 }, { day: "Wed", value: 520 }, 
      { day: "Thu", value: 610 }, { day: "Fri", value: 740 }, { day: "Sat", value: 890 }, { day: "Sun", value: 820 }
    ],
    forecastChartTitle: "Sales Demand Forecast",
    forecastChartSubtitle: "Projected sales vs current shelf stock for top 5 SKUs",
    supplyChainLabel: "My Distributor",
    dashboardTitle: "Retail Operations",
    dashboardSubtitle: "Track shelf stock, low-stock alerts, incoming deliveries, and sales velocity.",
    inventoryTitle: "Shelf Inventory",
    inventorySubtitle: "Monitor store stock levels, expiry alerts, and reorder status.",
    forecastingTitle: "Sales Forecast",
    forecastingSubtitle: "Predict customer demand, seasonal spikes, and optimal markdown timing.",
    distributionTitle: "Store Deliveries",
    distributionSubtitle: "Track incoming shipments, estimated arrival times, and distributor performance.",
    suppliersTitle: "Distribution Partners",
    suppliersSubtitle: "Manage logistics provider relationships and fulfillment reliability.",
    forecastingFocus: "Forecasting shows store demand, reorder timing, and price-sensitive sales velocity.",
    analyticsItems: ["Pricing Intelligence"],
  },
  admin: {
    companyName: "Northstar Foods",
    userInitials: "NF",
    kpis: [
      { label: "Total Inventory", value: "48,200 tons", subtitle: "Across network", icon: Boxes },
      { label: "Forecast Accuracy", value: "91.4%", subtitle: "MAPE index", icon: LineChart },
      { label: "Spoilage Cost", value: "₹2,34,500/mo", subtitle: "Monthly run-rate", icon: Percent },
      { label: "Active Warehouses", value: "42", subtitle: "Enterprise network", icon: Warehouse },
    ],
    inventoryKpis: [
      { label: "Network Stock", value: "48.2k tons", subtitle: "All regions", icon: Boxes },
      { label: "Global Waste", value: "4.2%", subtitle: "Target 3%", icon: Percent },
      { label: "Active Nodes", value: "184", subtitle: "Hubs & partners", icon: Warehouse },
      { label: "Asset Util", value: "86%", subtitle: "Platform wide", icon: Gauge },
    ],
    forecastingKpis: [
      { label: "Model MAPE", value: "8.6%", subtitle: "Enterprise", icon: LineChart },
      { label: "Anomaly Rate", value: "2.4%", subtitle: "Flagged lots", icon: AlertTriangle },
      { label: "External Imp", value: "High", subtitle: "Weather active", icon: CloudSun },
      { label: "Trust Score", value: "94/100", subtitle: "System health", icon: ShieldCheck },
    ],
    distributionKpis: [
      { label: "Shipments", value: "184", subtitle: "Active", icon: Truck },
      { label: "OTIF", value: "94.6%", subtitle: "Platform SLA", icon: ShieldCheck },
      { label: "Lead Time", value: "2.8 days", subtitle: "Network avg", icon: Clock },
      { label: "Hub Utilization", value: "86%", subtitle: "Effective", icon: Gauge },
    ],
    suppliersKpis: [
      { label: "Suppliers", value: "286", subtitle: "Network total", icon: Handshake },
      { label: "Reliability", value: "94.1%", subtitle: "Aggregate", icon: ShieldCheck },
      { label: "Wait Time", value: "22 min", subtitle: "Avg at Hub", icon: Clock },
      { label: "Accounts", value: "128", subtitle: "Retailer nodes", icon: Store },
    ],
    navItems: [
      {
        section: "MAIN",
        items: [
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { label: "Inventory", href: "/inventory", icon: Boxes },
          { label: "Forecasting", href: "/forecasting", icon: LineChart },
        ],
      },
      {
        section: "SYSTEM",
        items: [
          { label: "Warehouses", href: "/warehouses", icon: Warehouse },
          { label: "Settings", href: "/settings", icon: Settings },
        ],
      },
    ],
    aiInsights: [
      { message: "Tomato demand rising in Bangalore — harvest now for best price" },
      { message: "Apply 10% discount to mango batches aged over 3 days to reduce spoilage" },
    ],
    notifications: [
      { type: "system", title: "System alerts active", description: "27 operational alerts across network.", time: "Now" },
      { type: "anomaly", title: "Anomaly flags", description: "Demand spike and cold-chain flags active.", time: "9 min ago" },
    ],
    anomalyAlerts: [
      { id: "adm-a1", type: "high", title: "Platform anomaly", description: "Demand spike in Bangalore out of normal range.", timestamp: "3 min ago" },
      { id: "adm-a2", type: "medium", title: "Cold chain break", description: "Multiple hubs reporting temp variance in Mumbai.", timestamp: "15 min ago" },
      { id: "adm-a3", type: "low", title: "Supplier delay", description: "Riverbend Dairy reporting logistics failure.", timestamp: "45 min ago" },
    ],
    aiRecommendations: [
      { id: "adm-r1", title: "Tomato Demand", description: "Tomato demand rising in Bangalore.", action: "Approve" },
      { id: "adm-r2", title: "Mango Discount", description: "Apply 10% discount to mango batches.", action: "Apply" },
    ],
    forecastChartData: [
      { day: "Jan", value: 42000 }, { day: "Feb", value: 45000 }, { day: "Mar", value: 48000 }, 
      { day: "Apr", value: 46000 }, { day: "May", value: 51000 }, { day: "Jun", value: 55000 }
    ],
    forecastChartTitle: "Platform Demand Forecast",
    forecastChartSubtitle: "Aggregate demand across all categories and regions",
    supplyChainLabel: "Full Network",
    dashboardTitle: "Inventory Intelligence Dashboard",
    dashboardSubtitle: "Monitor inventory, forecast demand, optimize pricing, and reduce spoilage using AI.",
    inventoryTitle: "Enterprise Inventory Control",
    inventorySubtitle: "Global visibility into network stock, spoilage trends, and operational health.",
    forecastingTitle: "Platform Intelligence",
    forecastingSubtitle: "Multi-layered demand modeling, anomaly detection, and trust-scored forecasts.",
    distributionTitle: "Network Distribution",
    distributionSubtitle: "Track platform-wide fulfillment, lane performance, and logistics reliability.",
    suppliersTitle: "Partner Network",
    suppliersSubtitle: "Manage enterprise-wide supplier and retailer accounts and reliability metrics.",
    forecastingFocus: "Forecasting shows full-network demand, confidence bands, external signals, and role escalations.",
    analyticsItems: ["Regional Demand", "Waste Analytics", "Pricing Intelligence"],
  },
};

export function useRoleConfig() {
  const currentRole = useRoleStore((state) => state.currentRole);
  return ROLE_CONFIG[currentRole];
}

export const WAREHOUSE_ROLE_VIEW: Record<
  Role,
  {
    title: string;
    subtitle: string;
    metrics: RoleKpi[];
    warehouses: { name: string; capacity: number; spoilage: number; orders: number }[];
    controlRows: { name: string; detail: string; metric: string; status: string }[];
    hideControlQueue: boolean;
  }
> = {
  admin: {
    title: "Warehouses",
    subtitle: "Warehouse dashboards for storage health, capacity, throughput, and spoilage monitoring.",
    metrics: ROLE_CONFIG.warehouse.kpis,
    warehouses: [
      { name: "Bangalore North", capacity: 86, spoilage: 5.2, orders: 1240 },
      { name: "Mumbai Cold Hub", capacity: 79, spoilage: 3.8, orders: 980 },
      { name: "Hyderabad East", capacity: 91, spoilage: 7.9, orders: 760 },
    ],
    controlRows: [
      { name: "Bangalore North", detail: "Fresh produce and dairy hub", metric: "86% capacity", status: "Balanced" },
      { name: "Mumbai Cold Hub", detail: "Cold chain and beverages", metric: "79% capacity", status: "Healthy" },
      { name: "Hyderabad East", detail: "Fruit inbound pressure", metric: "91% capacity", status: "Action ready" },
    ],
    hideControlQueue: false,
  },
  warehouse: {
    title: "Warehouses",
    subtitle: "Warehouse dashboards for storage health, capacity, throughput, and spoilage monitoring.",
    metrics: ROLE_CONFIG.warehouse.kpis,
    warehouses: [
      { name: "Bangalore North", capacity: 86, spoilage: 5.2, orders: 1240 },
      { name: "Mumbai Cold Hub", capacity: 79, spoilage: 3.8, orders: 980 },
      { name: "Hyderabad East", capacity: 91, spoilage: 7.9, orders: 760 },
    ],
    controlRows: [
      { name: "Bangalore North", detail: "Fresh produce and dairy hub", metric: "86% capacity", status: "Balanced" },
      { name: "Mumbai Cold Hub", detail: "Cold chain and beverages", metric: "79% capacity", status: "Healthy" },
      { name: "Hyderabad East", detail: "Fruit inbound pressure", metric: "91% capacity", status: "Action ready" },
    ],
    hideControlQueue: false,
  },
  distributor: {
    title: "Partner Warehouses",
    subtitle: "Warehouse partners linked to active distribution routes and retailer replenishment.",
    metrics: [
      { label: "Partner Hubs", value: "3", subtitle: "Linked to routes", icon: Warehouse },
      { label: "Pickup Readiness", value: "92%", subtitle: "Today", icon: PackageCheck },
      { label: "Avg Fill Rate", value: "89.5%", subtitle: "Warehouse supply", icon: Store },
      { label: "Dispatch Backlog", value: "7 orders", subtitle: "Needs scheduling", icon: Route },
    ],
    warehouses: [
      { name: "Bangalore North", capacity: 86, spoilage: 5.2, orders: 640 },
      { name: "Mumbai Cold Hub", capacity: 79, spoilage: 3.8, orders: 520 },
      { name: "Chennai Cross Dock", capacity: 74, spoilage: 4.6, orders: 410 },
    ],
    controlRows: [
      { name: "Bangalore North", detail: "Route-linked pickup hub", metric: "86% capacity", status: "Pickup ready" },
      { name: "Mumbai Cold Hub", detail: "Cold chain dispatch point", metric: "79% capacity", status: "Healthy" },
      { name: "Chennai Cross Dock", detail: "Retailer transfer hub", metric: "74% capacity", status: "Balanced" },
    ],
    hideControlQueue: false,
  },
  farmer: {
    title: "My Pickup Hub",
    subtitle: "Your linked warehouse pickup location for scheduled harvest movement.",
    metrics: [
      { label: "Linked Hub", value: "1", subtitle: "Bangalore North", icon: Warehouse },
      { label: "Pickup Slot", value: "Tomorrow", subtitle: "9am confirmed", icon: PackageCheck },
      { label: "Hub Utilization", value: "68%", subtitle: "Pickup available", icon: Gauge },
      { label: "Cold Compliance", value: "98.2%", subtitle: "Produce safe", icon: Thermometer },
    ],
    warehouses: [
      { name: "Bangalore North", capacity: 68, spoilage: 4.8, orders: 124 },
    ],
    controlRows: [],
    hideControlQueue: true,
  },
  retailer: {
    title: "Warehouses",
    subtitle: "Warehouse management is not available for retailer operations.",
    metrics: [],
    warehouses: [],
    controlRows: [],
    hideControlQueue: true,
  },
};
