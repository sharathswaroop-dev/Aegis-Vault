"use client";

import { useEffect, useRef } from "react";

import { useLiveDataStore } from "@/lib/stores/liveDataStore";
import { io, Socket } from "socket.io-client";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function LiveDataProvider({ children }: { children: React.ReactNode }) {
  const fetchAll = useLiveDataStore((s) => s.fetchAll);
  const setters = useLiveDataStore((s) => ({
    setWeather: s.setWeather,
    setPrices: s.setPrices,
    setShipments: s.setShipments,
    setHubs: s.setHubs,
    setOrders: s.setOrders,
    setAlerts: s.setAlerts,
    setEta: s.setEta,
    setLocation: s.setLocation,
  }));

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    fetchAll();
    
    // Setup Socket.io
    const socket = io(API, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Live dashboard connected via Socket.io");
    });

    socket.on("weather-update", setters.setWeather);
    socket.on("prices-update", setters.setPrices);
    socket.on("shipments-update", setters.setShipments);
    socket.on("hubs-update", setters.setHubs);
    socket.on("orders-update", setters.setOrders);
    socket.on("alerts-update", setters.setAlerts);
    socket.on("eta-update", setters.setEta);
    socket.on("location-update", setters.setLocation);

    const interval = setInterval(fetchAll, 60_000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [fetchAll, setters]);

  return <>{children}</>;
}

