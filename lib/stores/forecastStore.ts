import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ForecastAnnotation } from "@/lib/types";
import { FORECAST_ANNOTATIONS } from "@/lib/mock-data";

interface ForecastState {
  annotations: ForecastAnnotation[];
  addAnnotation: (annotation: ForecastAnnotation) => void;
  clearAnnotations: () => void;
}

export const useForecastStore = create<ForecastState>()(
  persist(
    (set) => ({
      annotations: FORECAST_ANNOTATIONS,
      addAnnotation: (newAnnotation) =>
        set((state) => ({
          annotations: [...state.annotations, newAnnotation],
        })),
      clearAnnotations: () => set({ annotations: [] }),
    }),
    {
      name: "foodflow-forecast-storage",
    }
  )
);
