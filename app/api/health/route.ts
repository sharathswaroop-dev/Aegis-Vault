import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "FoodFlow AI",
    status: "ok",
    service: "inventory-intelligence",
  });
}
