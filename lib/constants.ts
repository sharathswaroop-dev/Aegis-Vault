import {
  BarChart3,
  Bell,
  Boxes,
  Building2,
  CircleDollarSign,
  LayoutDashboard,
  LineChart,
  Map,
  Route,
  Settings,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

export const APP_NAME = "FoodFlow AI";

export const COLORS = {
  background: "#F7F8F4",
  card: "#FFFFFF",
  primary: "#0F8F5F",
  primaryHover: "#0C7A51",
  primarySoft: "#E8F5EE",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
};

export const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Inventory", href: "/inventory", icon: Boxes },
      { name: "Forecasting", href: "/forecasting", icon: LineChart },
      { name: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
  {
    label: "SUPPLY CHAIN",
    items: [
      { name: "Warehouses", href: "/warehouses", icon: Warehouse },
      { name: "Suppliers", href: "/suppliers", icon: Truck },
      { name: "Distribution", href: "/distribution", icon: Route },
    ],
  },
  {
    label: "ANALYTICS",
    items: [
      { name: "Regional Demand", href: "/analytics/regional-demand", icon: Map },
      { name: "Waste Analytics", href: "/analytics/waste", icon: BarChart3 },
      { name: "Pricing Intelligence", href: "/analytics/pricing", icon: CircleDollarSign },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Roles", href: "/settings/roles", icon: Users },
      { name: "Organization", href: "/settings/organization", icon: Building2 },
    ],
  },
];

export const ROLE_OPTIONS = ["Admin", "Warehouse", "Retailer", "Distributor", "Farmer"] as const;
