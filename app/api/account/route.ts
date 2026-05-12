import { NextRequest, NextResponse } from "next/server";
import { getAccountByRole, type Role } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get("role") as Role;
  const userId = searchParams.get("userId");

  if (!role) {
    return NextResponse.json({ error: "Role is required" }, { status: 400 });
  }

  // Map role to default userId if not provided
  let resolvedUserId = userId;
  if (!resolvedUserId) {
    switch (role) {
      case "farmer":
        resolvedUserId = "FRM-001";
        break;
      case "warehouse":
        resolvedUserId = "WH-001";
        break;
      case "distributor":
        resolvedUserId = "DSB-001";
        break;
      case "retailer":
        resolvedUserId = "RET-001";
        break;
      case "admin":
        resolvedUserId = "ADMIN";
        break;
    }
  }

  const account = getAccountByRole(role, resolvedUserId);

  return NextResponse.json({
    success: true,
    role,
    userId: resolvedUserId,
    data: account,
  });
}