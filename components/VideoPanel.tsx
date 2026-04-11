"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface VideoItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
}

export default function VideoPanel({ moduleTitle }: { moduleTitle: string }) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const fetchVideos = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/youtube?q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setVideos(data);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos(moduleTitle + " Claude API tutorial");
  }, [moduleTitle, fetchVideos]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim()) fetchVideos(value);
    }, 400);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="font-display font-bold text-sm text-dark">
          Video Tutorials
        </h3>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tutorials..."
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:border-accent"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && (
          <p className="text-xs text-mid text-center py-4 animate-pulse">
            Loading videos...
          </p>
        )}
        {!loading && videos.length === 0 && (
          <p className="text-xs text-mid text-center py-4">
            No videos found.
          </p>
        )}
        {videos.map((video) => (
          <a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-gray-200 overflow-hidden hover:border-accent/40 transition-colors"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-auto"
            />
            <div className="p-2.5">
              <p className="text-xs font-medium text-dark line-clamp-2 leading-snug">
                {video.snippet.title}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
