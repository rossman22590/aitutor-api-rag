import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

type Document = {
  content: string;
};

export async function POST(req: NextRequest) {
  const { messages, fileId }: { messages: Array<{ role: string; content: string }>; fileId: string } =
    await req.json();

  const userMessage = messages[messages.length - 1];
  if (!userMessage) {
    return NextResponse.json({ success: false, error: "No user message found" }, { status: 400 });
  }

  try {
    // Step 1: Query the embeddings API
    const embeddingsResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/embeddings`,
      {
        query: userMessage.content,
        file_ids: [fileId],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.DEMO_RAG_API_KEY!,
        },
      }
    );

    // Extract document content
    const documents = embeddingsResponse.data.documents;
    if (!documents || documents.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No relevant documents found for the query.",
      });
    }

    const context = documents.map((doc: Document) => doc.content).join("\n");

    // Step 2: Generate a response using generateText with the correct model configuration
    const { text } = await generateText({
      model: openai.chat('gpt-4'), // Use the chat model factory method
      prompt: `Answer the query based on the provided context below:\n${context}\nQuery: ${userMessage.content}`,
      maxTokens: 500,
    });

    // Return the AI response
    return NextResponse.json({
      success: true,
      message: text,
    });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
