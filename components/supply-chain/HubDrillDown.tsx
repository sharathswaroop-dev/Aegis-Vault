"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Activity, Cpu, HardDrive, Wifi, Users, Clock, Server, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface HubMetrics {
  hubId: string;
  status: "healthy" | "degraded" | "critical";
  latencyMs: number;
  uptimePct: number;
  cpuPct: number;
  memPct: number;
  activeSessions: number;
  connectedDevices: number;
  downloadMbps: number;
  uploadMbps: number;
  throughputMbps: number;
  packetLossPct: number;
  errorsPerMin: number;
  location: string;
  isp: string;
  org: string;
  lastSeen: string;
}

interface HubDrillDownProps {
  hubId: string;
  hubName: string;
  onBack: () => void;
}

function MetricRow({ icon: Icon, label, value, unit, warn }: {
  icon: typeof Activity;
  label: string;
  value: string | number;
  unit?: string;
  warn?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className={`flex size-8 items-center justify-center rounded-md ${warn ? "bg-red-50" : "bg-[#E8F5EE]"}`}>
          <Icon className={`size-4 ${warn ? "text-red-600" : "text-[#0F8F5F]"}`} />
        </div>
        <span className="text-sm font-medium text-[#6B7280]">{label}</span>
      </div>
      <span className={`text-sm font-bold ${warn ? "text-red-600" : "text-[#111827]"}`}>
        {value}{unit ? <span className="ml-0.5 text-xs font-normal text-[#9CA3AF]">{unit}</span> : null}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: HubMetrics["status"] }) {
  const map = {
    healthy: { icon: CheckCircle, color: "bg-[#E8F5EE] text-[#0F8F5F]", label: "Healthy" },
    degraded: { icon: AlertTriangle, color: "bg-amber-50 text-amber-700", label: "Degraded" },
    critical: { icon: XCircle, color: "bg-red-50 text-red-700", label: "Critical" },
  };
  const { icon: Icon, color, label } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

export function HubDrillDown({ hubId, hubName, onBack }: HubDrillDownProps) {
  const [metrics, setMetrics] = useState<HubMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMetrics() {
    try {
      const res = await fetch(`${API}/api/live/hub/${hubId}`, { cache: "no-store" });
      const json = await res.json();
      if (json.success) setMetrics(json.data);
    } catch {
      // Keep previous data on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 15_000); // refresh every 15s
    return () => clearInterval(interval);
  }, [hubId]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-[#6B7280] transition hover:bg-[#F7F8F4] hover:text-[#111827]"
        >
          <ArrowLeft className="size-4" />
          Back to Overview
        </button>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-[#111827]">{hubName}</h3>
          <p className="text-xs text-[#9CA3AF]">
            Hub ID: {hubId} · Last seen: {metrics ? new Date(metrics.lastSeen).toLocaleTimeString("en-IN") : "—"}
          </p>
        </div>
        {metrics && <StatusBadge status={metrics.status} />}
      </div>

      {loading && !metrics ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg border border-[#E5E7EB] bg-white animate-pulse" />
          ))}
        </div>
      ) : metrics ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricRow icon={Wifi} label="Network Latency" value={metrics.latencyMs} unit="ms" warn={metrics.latencyMs > 400} />
          <MetricRow icon={Activity} label="Download Bandwidth" value={metrics.downloadMbps} unit=" Mbps" />
          <MetricRow icon={Activity} label="Upload Bandwidth" value={metrics.uploadMbps} unit=" Mbps" />
          <MetricRow icon={Server} label="Throughput" value={metrics.throughputMbps} unit=" Mbps" />
          <MetricRow icon={Cpu} label="CPU Load" value={metrics.cpuPct} unit="%" warn={metrics.cpuPct > 80} />
          <MetricRow icon={HardDrive} label="Memory Usage" value={metrics.memPct} unit="%" warn={metrics.memPct > 85} />
          <MetricRow icon={Users} label="Active Sessions" value={metrics.activeSessions} />
          <MetricRow icon={Wifi} label="Connected Devices" value={metrics.connectedDevices} />
          <MetricRow icon={Clock} label="Uptime" value={metrics.uptimePct} unit="%" />
          <MetricRow icon={AlertTriangle} label="Packet Loss" value={metrics.packetLossPct} unit="%" warn={metrics.packetLossPct > 0} />
          <MetricRow icon={XCircle} label="Error Rate" value={metrics.errorsPerMin} unit=" err/min" warn={metrics.errorsPerMin > 5} />
          <MetricRow icon={CheckCircle} label="Availability" value={`${metrics.uptimePct}.0`} unit="%" />
          <div className="col-span-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 space-y-1">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Network Info</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-[#6B7280]">Location</span><span className="font-medium text-[#111827]">{metrics.location}</span>
              <span className="text-[#6B7280]">ISP</span><span className="font-medium text-[#111827]">{metrics.isp}</span>
              <span className="text-[#6B7280]">Org</span><span className="font-medium text-[#111827] truncate">{metrics.org}</span>
              <span className="text-[#6B7280]">Last Seen</span><span className="font-medium text-[#111827]">{new Date(metrics.lastSeen).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
