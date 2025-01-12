import { NextResponse } from "next/server";

export async function GET() {
  const data = { message: "Welcome to the LPL Hackathon API!" };
  return NextResponse.json(data);
}