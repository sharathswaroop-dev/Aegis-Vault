import { create } from "zustand";

export type DrillDownType = 
  | "deliveries" 
  | "otif" 
  | "eta" 
  | "returns" 
  | "shipment" 
  | "hub" 
  | "metric";

interface DrillDownState {
  isOpen: boolean;
  type: DrillDownType | null;
  data: any;
  open: (type: DrillDownType, data?: any) => void;
  close: () => void;
}

export const useDrillDownStore = create<DrillDownState>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  open: (type, data = null) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null, data: null }),
}));
