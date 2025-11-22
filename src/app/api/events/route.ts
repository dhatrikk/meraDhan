import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date"); // YYYY-MM-DD

    if (!date) return NextResponse.json({ events: [] });

    const client = await clientPromise;
    const db = client.db("MERADHAN"); // <-- choose your DB name

    // Query events for that specific date
    const events = await db
      .collection("Events")
      .find({ date })        // e.g., { date: "2024-07-04" }
      .sort({ time: 1 })
      .toArray();

    return NextResponse.json({ events });
  } catch (error) {
    console.error("MongoDB error:", error);
    return NextResponse.json({ events: [] }, { status: 500 });
  }
}
