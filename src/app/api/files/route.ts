import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body = {};
  try {
    body = await req.json();
  } catch (error) {
    // If no JSON body is provided, use defaults.
    body = { pagination: { limit: 10, offset: 0 }, order_dir: "desc" };
  }

  const apiKey = process.env.DEMO_RAG_API_KEY;
  const supaApiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.supavec.com";

  const response = await fetch(`${supaApiUrl}/user_files`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: apiKey!,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
