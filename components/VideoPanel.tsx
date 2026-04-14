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
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchVideos = useCallback(async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setActiveVideo(null);
    fetchVideos(moduleTitle + " Claude API tutorial");
  }, [moduleTitle, fetchVideos]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      fetchVideos(
        trimmed ? trimmed : moduleTitle + " Claude API tutorial"
      );
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

      {activeVideo && (
        <div className="border-b border-gray-200 bg-black">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              key={activeVideo.id.videoId}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id.videoId}?autoplay=1&rel=0`}
              title={activeVideo.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="flex items-start justify-between gap-2 px-3 py-2 bg-white">
            <p className="text-xs font-medium text-dark line-clamp-2 leading-snug">
              {activeVideo.snippet.title}
            </p>
            <button
              onClick={() => setActiveVideo(null)}
              className="shrink-0 text-[10px] font-medium text-mid hover:text-dark uppercase tracking-wide"
              aria-label="Close video"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
        {videos.map((video) => {
          const isActive = activeVideo?.id.videoId === video.id.videoId;
          return (
            <button
              key={video.id.videoId}
              type="button"
              onClick={() => setActiveVideo(video)}
              className={`block w-full text-left rounded-lg border overflow-hidden transition-colors ${
                isActive
                  ? "border-accent"
                  : "border-gray-200 hover:border-accent/40"
              }`}
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full h-auto block"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="ml-0.5 border-y-[6px] border-y-transparent border-l-[10px] border-l-dark" />
                  </div>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-dark line-clamp-2 leading-snug">
                  {video.snippet.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
