import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const rawBody = await req.text();
      const text = JSON.parse(rawBody).text;
      const response = await fetch("http://192.168.55.22:6101", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: text,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return NextResponse.json(
        { message: "Received text successfully", text: rawBody },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error sending request:", error.message);
      return NextResponse.json(
        { error: "Failed to process request" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 500 });
  }
}
