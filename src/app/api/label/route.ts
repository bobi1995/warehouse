import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const rawBody = await req.text();
      const text = JSON.parse(rawBody).text;

      // Fire-and-forget fetch
      fetch("http://192.168.55.22:6101", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: text,
      }).catch((err) => {
        console.error("Error sending request:", err.message);
      });

      // Immediately return success response
      return NextResponse.json({ message: "Request sent" }, { status: 200 });
    } catch (error: any) {
      console.error("Error handling request:", error.message);
      return NextResponse.json({ message: "Error" }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}
