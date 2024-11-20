import { NextApiResponse } from "next";
import { suggestStillage } from "@/lib/stillage/read";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse, res: NextApiResponse) {
  const { type, formedData } = await req.json();
  try {
    const stillages = await suggestStillage(type, formedData);
    return NextResponse.json(stillages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stillages." },
      { status: 500 }
    );
  }
}
