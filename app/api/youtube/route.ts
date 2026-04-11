import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "Claude API";
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || apiKey === "your-youtube-api-key-here") {
    // Return curated fallback videos when no API key is configured
    return NextResponse.json([
      {
        id: { videoId: "jvqFAi7vkBc" },
        snippet: {
          title: "What is an API? (MuleSoft)",
          description: "A beginner-friendly explanation of APIs.",
          thumbnails: {
            medium: {
              url: "https://i.ytimg.com/vi/jvqFAi7vkBc/mqdefault.jpg",
            },
          },
        },
      },
      {
        id: { videoId: "WXsD0ZgxjRw" },
        snippet: {
          title: "Next.js Tutorial for Beginners",
          description: "Learn Next.js from scratch with this full tutorial.",
          thumbnails: {
            medium: {
              url: "https://i.ytimg.com/vi/WXsD0ZgxjRw/mqdefault.jpg",
            },
          },
        },
      },
      {
        id: { videoId: "HpnISrNvo0U" },
        snippet: {
          title: "Claude API Full Course",
          description:
            "Everything you need to know about using the Claude API.",
          thumbnails: {
            medium: {
              url: "https://i.ytimg.com/vi/HpnISrNvo0U/mqdefault.jpg",
            },
          },
        },
      },
    ]);
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", q + " tutorial");
    url.searchParams.set("maxResults", "4");
    url.searchParams.set("type", "video");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString());
    const data = await res.json();
    return NextResponse.json(data.items ?? []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
