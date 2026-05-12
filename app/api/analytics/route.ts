import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsByRole, type Role } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get("role") as Role;
  const period = searchParams.get("period");

  if (!role) {
    return NextResponse.json({ error: "Role is required" }, { status: 400 });
  }

  const analytics = getAnalyticsByRole(role, period || undefined);

  return NextResponse.json({
    success: true,
    role,
    period: period || "all",
    data: analytics,
    meta: {
      totalRecords: analytics.length,
      latestPeriod: analytics[0]?.period || null,
    },
  });
}