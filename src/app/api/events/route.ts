import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const start = searchParams.get("start"); // YYYY-MM-DD
    const end = searchParams.get("end");     // YYYY-MM-DD

    // Validate
    if (!start || !end) {
      return NextResponse.json({ events: [] });
    }

    const client = await clientPromise;
    const db = client.db("MERADHAN");

    // Query events between start and end
    const events = await db
      .collection("Events")
      .find({
        date: {
          $gte: start,  // greater or equal
          $lte: end,    // less or equal
        },
      })
      .sort({ date: 1, time: 1 }) // sort by date first then time
      .toArray();

    return NextResponse.json({ events });

  } catch (error) {
    console.error("MongoDB error:", error);
    return NextResponse.json({ events: [] }, { status: 500 });
  }
}
