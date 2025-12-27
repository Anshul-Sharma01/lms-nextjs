import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { getCurrentUser } from "@/lib/utils/auth";

export async function GET() {
  const userData = await getCurrentUser();
  if (!userData) return NextResponse.json({ user: null });

  await connectDb();
  const user = await User.findById(userData._id).select("-password");

  return NextResponse.json({ user });
}
