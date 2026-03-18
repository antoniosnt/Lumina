import { NextResponse } from "next/server";

// Mock.
import users from "@/users.json";

export async function POST() {
	console.log("[DEBUG] USERS, ", users);
  return NextResponse.json({ message: "created" });
}
