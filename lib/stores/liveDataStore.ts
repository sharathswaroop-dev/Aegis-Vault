"use client";

import { create } from "zustand";
import { DemandPattern } from "../types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Types ────────────────────────────────────────────────────────────

export interface LiveWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  is_day: number;
  city: string;
  region: string;
  country: string;
  ip: string;
  lat: number;
  lng: number;
  fetchedAt: string;
}

export interface LiveLocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  isp: string;
  org: string;
  timezone: string;
  fetchedAt: string;
}

export interface LiveOrderRow {
  id: string;
  sku: string;
  item: string;
  category: string;
  location: string;
  stock: string;
  age: string;
  risk: "Low" | "Medium" | "High";
  status: string;
  harvestDate: string;
  expiryDate: string;
  daysLeft: number;
  demandPattern: DemandPattern;
}

export interface LiveAlert {
  id: string;
  type: string;
  title: string;
  description: string;
  affected: string;
  timestamp: string;
}

export interface LivePrice {
  commodity: string;
  market: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceDate: string;
}

export interface LiveShipment {
  id: string;
  shipmentId: string;
  vehicleId: string;
  driver: string;
  origin: string;
  destination: string;
  status: "scheduled" | "dispatched" | "in-transit" | "delivered" | "delayed";
  tons: number;
  eta: string;
  gps: { lat: number; lng: number };
  speed: number;
  temp: number;
}

export interface LiveHub {
  id: string;
  hubId: string;
  name: string;
  location: string;
  capacity: number;
  utilization: number;
  utilizationPct: number;
  staff: number;
  status: string;
}

interface LiveDataState {
  weather: LiveWeather | null;
  location: LiveLocation | null;
  orders: LiveOrderRow[];
  alerts: LiveAlert[];
  prices: LivePrice[];
  shipments: LiveShipment[];
  hubs: LiveHub[];
  lastUpdated: Date | null;
  loading: boolean;
  
  // Setters for socket updates
  setWeather: (data: LiveWeather) => void;
  setPrices: (data: { prices: LivePrice[] }) => void;
  setShipments: (data: { shipments: LiveShipment[] }) => void;
  setHubs: (data: { hubs: LiveHub[] }) => void;
  setOrders: (data: { orders: LiveOrderRow[] }) => void;
  setAlerts: (data: { alerts: LiveAlert[] }) => void;
  setEta: (data: any) => void;
  setLocation: (data: LiveLocation) => void;
  
  fetchAll: () => Promise<void>;
}

// ─── Fetch helpers ────────────────────────────────────────────────────

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}/api/live/${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

// ─── Zustand Store ────────────────────────────────────────────────────

export const useLiveDataStore = create<LiveDataState>((set) => ({
  weather: null,
  location: null,
  orders: [],
  alerts: [],
  prices: [],
  shipments: [],
  hubs: [],
  lastUpdated: null,
  loading: false,

  setWeather: (weather) => set({ weather, lastUpdated: new Date() }),
  setPrices: (data) => set({ prices: data.prices, lastUpdated: new Date() }),
  setShipments: (data) => set({ shipments: data.shipments, lastUpdated: new Date() }),
  setHubs: (data) => set({ hubs: data.hubs, lastUpdated: new Date() }),
  setOrders: (data) => set({ orders: data.orders, lastUpdated: new Date() }),
  setAlerts: (data) => set({ alerts: data.alerts, lastUpdated: new Date() }),
  setEta: (data) => {
    // Update specific shipment in list if it exists
    set((state) => ({
      shipments: state.shipments.map((s) => 
        s.shipmentId === data.shipmentId ? { ...s, ...data } : s
      ),
      lastUpdated: new Date()
    }));
  },
  setLocation: (location) => set({ location, lastUpdated: new Date() }),

  fetchAll: async () => {
    set({ loading: true });

    const [weather, location, ordersData, alertsData, pricesData, shipmentsData, hubsData] =
      await Promise.all([
        safeFetch<LiveWeather>("weather"),
        safeFetch<LiveLocation>("location"),
        safeFetch<{ orders: LiveOrderRow[] }>("orders"),
        safeFetch<{ alerts: LiveAlert[] }>("alerts"),
        safeFetch<{ prices: LivePrice[] }>("prices"),
        safeFetch<{ shipments: LiveShipment[] }>("shipments"),
        safeFetch<{ hubs: LiveHub[] }>("hubs"),
      ]);

    set({
      weather: weather ?? null,
      location: location ?? null,
      orders: ordersData?.orders ?? [],
      alerts: alertsData?.alerts ?? [],
      prices: pricesData?.prices ?? [],
      shipments: shipmentsData?.shipments ?? [],
      hubs: hubsData?.hubs ?? [],
      lastUpdated: new Date(),
      loading: false,
    });
  },
}));

