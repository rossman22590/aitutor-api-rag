import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) {
    return NextResponse.json(
      { success: false, error: "No file provided" },
      { status: 400 }
    );
  }
  // Create a new FormData to send to the Supavec API.
  const supaFormData = new FormData();
  supaFormData.append("file", file);

  const apiKey = process.env.DEMO_RAG_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "API Key not configured" },
      { status: 500 }
    );
  }

  const supaApiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.supavec.com";

  const response = await fetch(`${supaApiUrl}/upload_file`, {
    method: "POST",
    headers: {
      // Do not set Content-Type when sending FormData.
      authorization: apiKey,
    },
    body: supaFormData,
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
