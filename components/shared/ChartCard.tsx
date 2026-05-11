import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <section className="surface-card rounded-lg p-5">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
