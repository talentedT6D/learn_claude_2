import { NextRequest, NextResponse } from "next/server";

interface VideoItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
}

const FALLBACK_VIDEOS: VideoItem[] = [
  {
    id: { videoId: "jvqFAi7vkBc" },
    snippet: {
      title: "What is an API? (MuleSoft)",
      description: "A beginner-friendly explanation of APIs.",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/jvqFAi7vkBc/mqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "WXsD0ZgxjRw" },
    snippet: {
      title: "Next.js Tutorial for Beginners",
      description: "Learn Next.js from scratch with this full tutorial.",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/WXsD0ZgxjRw/mqdefault.jpg" },
      },
    },
  },
  {
    id: { videoId: "HpnISrNvo0U" },
    snippet: {
      title: "Claude API Full Course",
      description: "Everything you need to know about using the Claude API.",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/HpnISrNvo0U/mqdefault.jpg" },
      },
    },
  },
];

// --- Helpers --------------------------------------------------------------

/** Call the official YouTube Data API v3 (requires an API key). */
async function searchWithDataApi(q: string, apiKey: string): Promise<VideoItem[]> {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", q);
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("type", "video");
  url.searchParams.set("safeSearch", "moderate");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`YouTube API ${res.status}`);
  const data = await res.json();
  return (data.items ?? []) as VideoItem[];
}

type InnertubeVideoRenderer = {
  videoId?: string;
  title?: { runs?: { text?: string }[]; simpleText?: string };
  descriptionSnippet?: { runs?: { text?: string }[] };
  detailedMetadataSnippets?: { snippetText?: { runs?: { text?: string }[] } }[];
};
type InnertubeItemSection = {
  itemSectionRenderer?: {
    contents?: { videoRenderer?: InnertubeVideoRenderer }[];
  };
};

function extractText(obj: { runs?: { text?: string }[]; simpleText?: string } | undefined): string {
  if (!obj) return "";
  if (obj.simpleText) return obj.simpleText;
  return (obj.runs ?? []).map((r) => r.text ?? "").join("");
}

/**
 * Use YouTube's public Innertube endpoint — the same one the YouTube web
 * player uses. No API key required, works in any region, returns the same
 * results as a normal browser search. This is what yt-dlp and youtubei.js
 * use under the hood.
 */
async function searchWithInnertube(q: string): Promise<VideoItem[]> {
  const res = await fetch(
    "https://www.youtube.com/youtubei/v1/search?prettyPrint=false",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20250101.00.00",
            hl: "en",
            gl: "US",
          },
        },
        query: q,
        // params = EgIQAQ%3D%3D filters search to videos only
        params: "EgIQAQ%3D%3D",
      }),
      // Innertube results do change; don't let Next cache them.
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error(`Innertube ${res.status}`);
  const data = await res.json();

  const sections: InnertubeItemSection[] =
    data?.contents?.twoColumnSearchResultsRenderer?.primaryContents
      ?.sectionListRenderer?.contents ?? [];

  const results: VideoItem[] = [];
  for (const section of sections) {
    const items = section.itemSectionRenderer?.contents ?? [];
    for (const it of items) {
      const v = it.videoRenderer;
      if (!v?.videoId) continue;

      const title = extractText(v.title);
      const description =
        extractText(v.descriptionSnippet) ||
        extractText(v.detailedMetadataSnippets?.[0]?.snippetText) ||
        "";

      results.push({
        id: { videoId: v.videoId },
        snippet: {
          title,
          description,
          thumbnails: {
            medium: {
              url: `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`,
            },
          },
        },
      });

      if (results.length >= 15) return results;
    }
  }
  return results;
}

// --- Route handler --------------------------------------------------------

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "Claude API tutorial").trim();
  if (!q) {
    return NextResponse.json(FALLBACK_VIDEOS);
  }

  // Hardcoded YouTube Data API v3 key. Environment variable overrides it
  // if you want to rotate without touching the code.
  const HARDCODED_YOUTUBE_API_KEY = "AIzaSyCtAr5wOYcDDNenyh6154rj2NN7Btb0Fq4";
  const apiKey = process.env.YOUTUBE_API_KEY || HARDCODED_YOUTUBE_API_KEY;

  // 1. Prefer the official Data API.
  try {
    const items = await searchWithDataApi(q, apiKey);
    if (items.length > 0) return NextResponse.json(items);
  } catch {
    // Fall through to the keyless path.
  }

  // 2. Keyless: use YouTube's public Innertube endpoint.
  try {
    const items = await searchWithInnertube(q);
    if (items.length > 0) return NextResponse.json(items);
  } catch {
    // Fall through to hardcoded fallback.
  }

  // 3. Last-resort fallback so the UI still has something to show.
  return NextResponse.json(FALLBACK_VIDEOS);
}
