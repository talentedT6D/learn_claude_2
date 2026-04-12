import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, moduleTitle, history } = (await req.json()) as {
      message: string;
      moduleTitle: string;
      history?: ChatMessage[];
    };

    const messages: Anthropic.MessageParam[] = [
      ...(history ?? []).map(
        (m): Anthropic.MessageParam => ({ role: m.role, content: m.content }),
      ),
      { role: "user", content: message },
    ];

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: `You are a concise coding tutor helping non-technical creatives learn Claude's API. Current module: ${moduleTitle}. Keep answers under 4 sentences. Use backticks for code.`,
      messages,
    });

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || "No response." });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get response";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
