import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

// Hardcoded fal.ai credentials. Environment variable overrides it if set,
// so the key can be rotated without touching the source.
const HARDCODED_FAL_KEY =
  "58cb75b2-a68a-4643-ad18-70a725833ad1:9b4278393d71ccdf1e6f413a33b3af0e";
fal.config({ credentials: process.env.FAL_KEY || HARDCODED_FAL_KEY });

interface FalChatResponse {
  choices: { text: string }[];
}

export async function POST(req: NextRequest) {
  try {
    const { message, moduleTitle, history } = await req.json();

    // Build conversation context from history
    const conversationContext = (history ?? [])
      .map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
      .join("\n");

    const fullPrompt = conversationContext
      ? `${conversationContext}\nuser: ${message}`
      : message;

    const result = await fal.subscribe(
      "openrouter/router/openai/v1/chat/completions",
      {
        input: {
          model: "anthropic/claude-sonnet-4.6",
          prompt: fullPrompt,
          system_prompt: `You are a concise coding tutor helping non-technical creatives learn Claude's API. Current module: ${moduleTitle}. Keep answers under 4 sentences. Use backticks for code.`,
          max_tokens: 512,
          temperature: 0.7,
        },
      }
    );

    const data = result.data as FalChatResponse;
    const reply = data.choices?.[0]?.text ?? "No response.";

    return NextResponse.json({ reply });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get response";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
