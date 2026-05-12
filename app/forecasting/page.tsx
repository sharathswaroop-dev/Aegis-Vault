"use client";

import { useState, createElement } from "react";
import { 
  CloudRain, LineChart, Sparkles, TrendingUp, Sun, Cloud, Droplets, Wind, Calendar, MapPin, 
  Search, Filter, Plus, FileText, CheckCircle2, AlertTriangle, Info, Clock, MessageSquare, XCircle
} from "lucide-react";
import { 
  LineChart as RechartLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, AreaChart, Area, ReferenceLine 
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AccuracyLog } from "@/components/forecasting/AccuracyLog";
import { ExternalSignals } from "@/components/forecasting/ExternalSignals";
import { ForecastTags } from "@/components/forecasting/ForecastTags";
import { InlineAiInsights } from "@/components/forecasting/InlineAiInsights";
import { WeatherWidget } from "@/components/forecasting/WeatherWidget";
import { PageHeader } from "@/components/shared/PageHeader";
import { useRoleStore } from "@/lib/stores/roleStore";
import { useRoleConfig } from "@/lib/config/roleConfig";
import { cn } from "@/lib/utils";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SKU_SEGMENTS, FORECAST_OVERRIDES } from "@/lib/mock-data";
import { ModelIndicator } from "@/components/forecasting/ModelIndicator";
import { ConfidenceMeter } from "@/components/forecasting/ConfidenceMeter";
import { useForecastStore } from "@/lib/stores/forecastStore";
import { Badge } from "@/components/ui/badge";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const crops = ["Tomatoes", "Onions", "Capsicum", "Coriander", "Mango", "Potato"];

// Demand forecast data per crop
const demandData: Record<string, { day: number; actual: number; forecast: number }[]> = {};
crops.forEach(crop => {
  demandData[crop] = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const base = crop === "Tomatoes" ? 500 : crop === "Onions" ? 400 : crop === "Mango" ? 300 : 250;
    const seasonal = crop === "Mango" ? Math.sin((day / 30) * Math.PI) * 100 : 0;
    const random = Math.random() * 50 - 25;
    return {
      day,
      actual: Math.round(base + seasonal + random),
      forecast: Math.round(base + seasonal + Math.random() * 30),
    };
  });
});

const seasonalLifts = [
  { event: "Diwali", crops: ["Mango", "Tomatoes"], startDate: "2026-05-24", endDate: "2026-06-02", demandIncrease: 28, status: "upcoming" },
  { event: "Ugadi", crops: ["Onions", "Potato", "Coriander"], startDate: "2026-04-01", endDate: "2026-04-15", demandIncrease: 15, status: "past" },
  { event: "Ramadan", crops: ["Dairy", "Fruits"], startDate: "2026-03-01", endDate: "2026-03-30", demandIncrease: 22, status: "past" },
  { event: "Tomato Harvest Season", crops: ["Tomatoes"], startDate: "2026-05-15", endDate: "2026-06-30", demandIncrease: 35, status: "active" },
];

const weatherForecast = [
  { date: "2026-05-12", condition: "Sunny", temp: 32, humidity: 45, impact: "Normal growth" },
  { date: "2026-05-13", condition: "Partly Cloudy", temp: 30, humidity: 52, impact: "Normal growth" },
  { date: "2026-05-14", condition: "Heavy Rain", temp: 24, humidity: 85, impact: "Tomato supply disrupted - price rising 12%" },
  { date: "2026-05-15", condition: "Rain", temp: 26, humidity: 78, impact: "Onion crop yield down 8%" },
  { date: "2026-05-16", condition: "Cloudy", temp: 28, humidity: 65, impact: "Normal conditions" },
  { date: "2026-05-17", condition: "Sunny", temp: 31, humidity: 48, impact: "Good for harvest" },
  { date: "2026-05-18", condition: "Sunny", temp: 33, humidity: 42, impact: "Fast ripening - sell soon" },
];

const linkedHubs = [
  { id: "WH-001", name: "Bangalore North Hub", location: "Yelahanka, Bangalore", utilization: 72, capacity: 5000, products: ["Tomatoes", "Onions", "Potato", "Capsicum"], contactPerson: "Ramesh Kumar", contactPhone: "+91 98765 12345", storedProducts: 1240 },
  { id: "WH-002", name: "Hassan Cold Storage", location: "Hassan", city: "Hassan", utilization: 58, capacity: 3000, products: ["Mango", "Banana"], contactPerson: "Shankarappa", contactPhone: "+91 98765 12346", storedProducts: 580 },
];

const currentWeather = {
  location: "Bangalore, Karnataka",
  condition: "Partly Cloudy",
  temp: 28,
  humidity: 55,
  wind: 12,
  description: "Ideal conditions for tomato and onion crops",
};

const weatherImpactPerCrop: Record<string, { impact: string; direction: "up" | "down" | "neutral" }> = {
  Tomatoes: { impact: "Heavy rain disrupting supply - prices rising 12%", direction: "up" },
  Onions: { impact: "Dry spell reducing yield by 8%", direction: "up" },
  Mango: { impact: "Ideal weather - excellent harvest expected", direction: "neutral" },
  Potato: { impact: "Stable conditions - normal supply", direction: "neutral" },
  Capsicum: { impact: "Slightly reduced yield due to humidity", direction: "down" },
  Coriander: { impact: "High demand - limited supply", direction: "up" },
};

export default function ForecastingPage() {
  const role = useRoleStore((state) => state.currentRole);
  const roleConfig = useRoleConfig();
  const [activeTab, setActiveTab] = useState("Active Forecast");
  const [selectedCrop, setSelectedCrop] = useState("Tomatoes");
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [forecastPeriod, setForecastPeriod] = useState<"7" | "30" | "90">("30");
  
  // Annotation state
  const { annotations, addAnnotation, clearAnnotations } = useForecastStore();
  const [newNote, setNewNote] = useState("");
  const [clickedDate, setClickedDate] = useState<number | null>(null);

  const filteredData = demandData[selectedCrop].slice(0, forecastPeriod === "7" ? 7 : forecastPeriod === "30" ? 30 : 30);

  // Find segment for selected crop
  const segmentCropName = selectedCrop === "Tomatoes" ? "Tomato" : selectedCrop;
  const segment = SKU_SEGMENTS.find(s => s.sku === segmentCropName) || SKU_SEGMENTS[0];

  const handleChartClick = (state: any) => {
    if (state && state.activeLabel) {
      setClickedDate(state.activeLabel);
    }
  };

  const handleAddAnnotation = () => {
    if (clickedDate && newNote.trim()) {
      addAnnotation({ date: `Day ${clickedDate}`, note: newNote });
      setNewNote("");
      setClickedDate(null);
    }
  };

  const filteredOverrides = FORECAST_OVERRIDES.filter(o => 
    role === "admin" || o.changedBy.toLowerCase().includes(role.toLowerCase())
  );

  const getUtilizationColor = (utilization: number) => {
    if (utilization < 70) return "bg-[#0F8F5F]";
    if (utilization < 85) return "bg-amber-500";
    return "bg-red-500";
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain") || condition.includes("rain")) return Droplets;
    if (condition.includes("Cloud")) return Cloud;
    return Sun;
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title={roleConfig.forecastingTitle}
        subtitle={roleConfig.forecastingSubtitle}
      />

      <div className="border-b border-[#E5E7EB]">
        <FilterTabs 
          tabs={["Active Forecast", "Override History"]} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "Active Forecast" ? (
          <motion.div 
            key="forecast"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <InlineAiInsights insights={[
              "Tomato demand rising 12% due to festival season - consider early harvest",
              "Onion prices expected to surge next 2 weeks due to weather disruption",
              "Mango harvest window optimal - high demand predicted",
            ]} resetKey={role} />

            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {roleConfig.forecastingKpis.map((kpi, idx) => (
                <motion.div 
                  key={kpi.label}
                  whileHover={{ y: -2 }} 
                  className="surface-card rounded-lg p-4 cursor-pointer" 
                  onClick={() => {
                    if (idx === 0) setActiveDrawer("demand");
                    if (idx === 1) setActiveDrawer("seasonal");
                    if (idx === 2) setActiveDrawer("weather");
                    if (idx === 3) setActiveDrawer("hubs");
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#F7F8F4] text-[#0F8F5F]">
                      {createElement(kpi.icon, { className: "size-5" })}
                    </div>
                  </div>
                  <div className="mt-4 text-2xl font-semibold text-[#111827]">{kpi.value}</div>
                  <div className="mt-1 text-sm text-[#6B7280]">{kpi.label}</div>
                  <div className="mt-1 text-xs text-[#9CA3AF]">{kpi.subtitle}</div>
                </motion.div>
              ))}
            </div>

            {/* Crop Selector */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition whitespace-nowrap",
                    selectedCrop === crop
                      ? "bg-[#0F8F5F] text-white"
                      : "border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F7F8F4]"
                  )}
                >
                  {crop}
                </button>
              ))}
            </div>

            {/* Demand Forecast Chart */}
            <div className="surface-card rounded-lg p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[#111827]">Demand Forecast — {selectedCrop}</h3>
                  <p className="mt-1 text-sm text-[#6B7280]">Interactive forecast with role annotations (Click chart to annotate)</p>
                </div>
                <div className="flex items-center gap-4">
                  {annotations.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAnnotations} className="text-[#6B7280]">
                      Clear annotations
                    </Button>
                  )}
                  <div className="flex gap-2">
                    {(["7", "30", "90"] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setForecastPeriod(period)}
                        className={cn(
                          "rounded-md px-3 py-1 text-sm font-medium transition",
                          forecastPeriod === period
                            ? "bg-[#0F8F5F] text-white"
                            : "text-[#6B7280] hover:bg-[#F7F8F4]"
                        )}
                      >
                        {period}D
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLine data={filteredData} onClick={handleChartClick}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="day" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => `${v}kg`} tickLine={false} axisLine={false} />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const note = annotations.find(a => a.date === `Day ${label}`);
                          return (
                            <div className="rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg">
                              <p className="font-semibold text-[#111827]">Day {label}</p>
                              {payload.map((p: any) => (
                                <p key={p.name} className="text-sm" style={{ color: p.color }}>
                                  {p.name}: {p.value} kg
                                </p>
                              ))}
                              {note && (
                                <div className="mt-2 border-t border-[#E5E7EB] pt-2">
                                  <p className="text-xs font-medium text-[#0F8F5F] flex items-center gap-1">
                                    <MessageSquare className="size-3" /> Note:
                                  </p>
                                  <p className="text-xs text-[#6B7280]">{note.note}</p>
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="actual" name="Actual Demand" stroke="#0F8F5F" strokeWidth={3} dot={{ r: 4, fill: "#0F8F5F" }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="forecast" name="AI Forecast" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    
                    {annotations.map((a, i) => (
                      <ReferenceLine 
                        key={i} 
                        x={parseInt(a.date.replace("Day ", ""))} 
                        stroke="#6B7280" 
                        strokeDasharray="3 3" 
                        label={{ position: 'top', value: 'Note', fill: '#6B7280', fontSize: 10 }}
                      />
                    ))}
                  </RechartLine>
                </ResponsiveContainer>
              </div>

              {clickedDate !== null && (
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-[#F7F8F4] p-3 border border-[#E5E7EB]">
                  <p className="text-sm font-medium text-[#111827]">Adding note for Day {clickedDate}:</p>
                  <Input 
                    placeholder="Enter annotation text..." 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="max-w-xs h-9"
                  />
                  <Button size="sm" onClick={handleAddAnnotation} className="bg-[#0F8F5F] hover:bg-[#0C7A51]">
                    Add Note
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setClickedDate(null)} className="text-[#6B7280]">
                    Cancel
                  </Button>
                </div>
              )}

              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                <ModelIndicator segment={segment} />
                <ConfidenceMeter segment={segment} />
              </div>
            </div>

            {/* Weather Impact Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {crops.slice(0, 6).map((crop) => {
                const impact = weatherImpactPerCrop[crop];
                return (
                  <div key={crop} className="surface-card rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[#111827]">{crop}</p>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        impact.direction === "up" ? "bg-red-50 text-red-700" : impact.direction === "down" ? "bg-amber-50 text-amber-700" : "bg-[#E8F5EE] text-[#0F8F5F]"
                      )}>
                        {impact.direction === "up" ? "↑ Rising" : impact.direction === "down" ? "↓ Falling" : "→ Stable"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#6B7280]">{impact.impact}</p>
                  </div>
                );
              })}
            </div>

            <ExternalSignals />
            <ForecastTags />
            <AccuracyLog />
          </motion.div>
        ) : (
          <motion.div 
            key="overrides"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {role === "admin" && (
              <div className="rounded-xl bg-[#2E5E4E] p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
                    <TrendingUp className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Override Performance Summary</h3>
                    <p className="text-white/70">Analysis of AI vs Human forecasting accuracy</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium">
                  AI forecast was more accurate in 1/4 overridden cases · Human overrides improved accuracy 75% of the time
                </p>
              </div>
            )}

            <div className="surface-card overflow-hidden rounded-lg">
              <div className="border-b border-[#E5E7EB] p-5">
                <h3 className="text-base font-semibold text-[#111827]">Override History</h3>
                <p className="text-sm text-[#6B7280]">Tracking modifications to AI-generated forecasts</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-[#F7F8F4] text-xs uppercase tracking-wide text-[#6B7280]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">SKU</th>
                      <th className="px-5 py-3 font-semibold">AI Forecast</th>
                      <th className="px-5 py-3 font-semibold">Human Override</th>
                      <th className="px-5 py-3 font-semibold">Changed By</th>
                      <th className="px-5 py-3 font-semibold">Reason</th>
                      <th className="px-5 py-3 font-semibold">Actual Outcome</th>
                      <th className="px-5 py-3 font-semibold">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] bg-white text-[#111827]">
                    {filteredOverrides.map((row, i) => (
                      <tr key={i} className="hover:bg-[#F7F8F4]">
                        <td className="px-5 py-4 font-semibold">{row.sku}</td>
                        <td className="px-5 py-4 text-[#6B7280]">{row.aiForecast}</td>
                        <td className="px-5 py-4 font-medium text-blue-600">{row.humanOverride}</td>
                        <td className="px-5 py-4 text-[#6B7280]">{row.changedBy}</td>
                        <td className="px-5 py-4 italic text-[#6B7280]">{row.reason}</td>
                        <td className="px-5 py-4">{row.actualOutcome}</td>
                        <td className="px-5 py-4">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-medium whitespace-nowrap",
                              row.accuracy === "AI accurate" || row.accuracy === "AI was closer" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            )}
                          >
                            {row.accuracy}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawers */}
      <AnimatePresence>
        {activeDrawer === "demand" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Demand Forecast</SheetTitle>
                <SheetDescription>Per crop demand prediction</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {crops.map((crop) => {
                  const avgDemand = Math.round(demandData[crop].reduce((sum, d) => sum + d.actual, 0) / demandData[crop].length);
                  const trend = demandData[crop][29].actual > demandData[crop][0].actual ? "up" : "down";
                  return (
                    <div key={crop} className="flex items-center justify-between rounded-lg border border-[#E5E7EB] p-4">
                      <div>
                        <p className="font-medium text-[#111827]">{crop}</p>
                        <p className="text-sm text-[#6B7280]">30-day avg demand</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#111827]">{avgDemand} kg/day</p>
                        <p className={cn("text-sm", trend === "up" ? "text-[#0F8F5F]" : "text-red-600")}>
                          {trend === "up" ? "↑ Rising" : "↓ Falling"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {activeDrawer === "seasonal" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Seasonal Lift & Events</SheetTitle>
                <SheetDescription>Festival and seasonal demand drivers</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                {seasonalLifts.map((event) => (
                  <div key={event.event} className={cn(
                    "rounded-lg border p-4",
                    event.status === "active" ? "border-[#0F8F5F] bg-[#E8F5EE]" : event.status === "upcoming" ? "border-amber-300 bg-amber-50" : "border-[#E5E7EB] bg-white"
                  )}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-[#6B7280]" />
                        <p className="font-semibold text-[#111827]">{event.event}</p>
                      </div>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        event.status === "active" ? "bg-[#0F8F5F] text-white" : event.status === "upcoming" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-600"
                      )}>
                        {event.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#6B7280]">
                      {event.startDate} — {event.endDate}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {event.crops.map((crop) => (
                        <span key={crop} className="rounded bg-white px-2 py-0.5 text-xs text-[#111827]">{crop}</span>
                      ))}
                    </div>
                    <p className="mt-2 text-sm font-medium text-[#0F8F5F]">+{event.demandIncrease}% demand increase</p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {activeDrawer === "weather" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Weather Impact</SheetTitle>
                <SheetDescription>Current and forecast weather in Karnataka</SheetDescription>
              </SheetHeader>
              <div className="mb-4 rounded-lg bg-[#F7F8F4] p-4">
                <div className="flex items-center gap-3">
                  <Sun className="size-8 text-amber-500" />
                  <div>
                    <p className="font-semibold text-[#111827]">{currentWeather.location}</p>
                    <p className="text-sm text-[#6B7280]">{currentWeather.condition} • {currentWeather.temp}°C • Humidity {currentWeather.humidity}%</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-[#6B7280]">{currentWeather.description}</p>
              </div>
              <div className="space-y-2">
                {weatherForecast.map((day) => {
                  const Icon = getWeatherIcon(day.condition);
                  return (
                    <div key={day.date} className="flex items-center justify-between rounded-lg border border-[#E5E7EB] p-3">
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 text-[#6B7280]" />
                        <div>
                          <p className="font-medium text-[#111827]">{day.date}</p>
                          <p className="text-sm text-[#6B7280]">{day.condition} • {day.temp}°C • {day.humidity}%</p>
                        </div>
                      </div>
                      <p className={cn(
                        "text-sm",
                        day.impact.includes("rising") || day.impact.includes("down") ? "text-red-600" : "text-[#6B7280]"
                      )}>
                        {day.impact}
                      </p>
                    </div>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {activeDrawer === "hubs" && (
          <Sheet open onOpenChange={() => setActiveDrawer(null)}>
            <SheetContent className="w-full sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Linked Hub Details</SheetTitle>
                <SheetDescription>Your connected warehouses and storage facilities</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {linkedHubs.map((hub) => (
                  <div key={hub.id} className="rounded-lg border border-[#E5E7EB] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#111827]">{hub.name}</p>
                        <p className="flex items-center gap-1 text-sm text-[#6B7280]">
                          <MapPin className="size-3" />
                          {hub.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#111827]">{hub.utilization}%</p>
                        <p className="text-xs text-[#6B7280]">utilization</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[#E5E7EB]">
                      <div className={cn("h-2 rounded-full", getUtilizationColor(hub.utilization))} style={{ width: `${hub.utilization}%` }} />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[#6B7280]">Capacity</p>
                        <p className="font-medium text-[#111827]">{hub.capacity.toLocaleString()} tonnes</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280]">Stored</p>
                        <p className="font-medium text-[#111827]">{hub.storedProducts.toLocaleString()} tonnes</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-[#6B7280]">Products: {hub.products.join(", ")}</p>
                    </div>
                    <div className="mt-3 rounded bg-[#F7F8F4] p-2">
                      <p className="text-xs text-[#6B7280]">Contact: {hub.contactPerson} • {hub.contactPhone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </AnimatePresence>
    </div>
  );
}