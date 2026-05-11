import { Map } from "lucide-react";
import { regionalStateDemand } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/EmptyState";

export function IndiaDemandMap() {
  if (regionalStateDemand.length === 0) {
    return <EmptyState heading="No regional demand data" subtext="State-level demand intensity will appear after forecasts refresh." />;
  }

  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5 flex items-center gap-2">
        <Map className="size-5 text-[#0F8F5F]" />
        <div>
          <h3 className="text-base font-semibold text-[#111827]">India Demand Choropleth</h3>
          <p className="mt-1 text-sm text-[#6B7280]">Static demand-index mock using the FoodFlow green ramp.</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <svg viewBox="0 0 360 420" role="img" aria-label="Mock India demand map" className="mx-auto h-[360px] w-full max-w-sm">
          <path d="M162 35 208 52 234 88 220 130 246 178 222 221 238 272 205 331 178 395 149 326 112 292 130 238 96 190 119 145 102 94Z" fill="#F7F8F4" stroke="#E5E7EB" strokeWidth="3" />
          <path d="M104 148 129 143 148 172 136 213 103 199 94 176Z" fill="#24A873" stroke="#fff" strokeWidth="2" />
          <path d="M88 114 119 91 144 112 128 144 103 149Z" fill="#0F8F5F" stroke="#fff" strokeWidth="2" />
          <path d="M137 215 170 226 163 285 126 273Z" fill="#68C796" stroke="#fff" strokeWidth="2" />
          <path d="M188 66 224 86 219 126 181 116Z" fill="#43B881" stroke="#fff" strokeWidth="2" />
          <path d="M207 211 234 267 205 326 174 292 181 240Z" fill="#E8F5EE" stroke="#fff" strokeWidth="2" />
        </svg>
        <div className="grid gap-3 sm:grid-cols-2">
          {regionalStateDemand.map((state) => (
            <div key={state.state} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#111827]">{state.state}</span>
                <span className="size-4 rounded-full" style={{ backgroundColor: state.color }} />
              </div>
              <p className="mt-2 text-sm text-[#6B7280]">Demand index {state.demandIndex}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
