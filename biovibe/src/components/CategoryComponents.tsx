"use client";

import React, { useState } from "react";
import { Copy, Check, Instagram, Video } from "lucide-react";

interface SavedBio {
  id: string;
  role: string;
  vibe: string;
  content: {
    instagram_bios: string[];
    tiktok_captions: string[];
  };
}

export function CategoryGridItem({ item }: { item: SavedBio }) {
  return (
    <div className="bg-panel-bg border border-panel-border rounded-2xl p-6 shadow-xl relative overflow-hidden group h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <p className="text-[10px] uppercase tracking-widest text-neon-blue font-bold px-2 py-0.5 bg-neon-blue/10 rounded-md">
          {item.vibe}
        </p>
      </div>

      <div className="space-y-6 flex-1 text-left">
        {/* IG BIOS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 mb-1 leading-none uppercase tracking-wider">
            <Instagram className="w-3 h-3" /> Instagram Options
          </div>
          <div className="space-y-2">
            {item.content.instagram_bios.slice(0, 3).map((bio, idx) => (
              <CopyCard key={`ig-${idx}`} text={bio} />
            ))}
          </div>
        </div>

        {/* TT CAPTIONS */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 mb-1 leading-none uppercase tracking-wider">
            <Video className="w-3 h-3" /> TikTok Captions
          </div>
          <div className="space-y-2">
            {item.content.tiktok_captions.slice(0, 2).map((caption, idx) => (
              <CopyCard key={`tt-${idx}`} text={caption} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyCard({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative bg-white/95 rounded-xl p-3 shadow-md border border-white/20 transform hover:-translate-y-0.5 transition-transform group text-zinc-900">
      <p className="pr-8 text-[12px] leading-relaxed font-medium">
        {text}
      </p>
      
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors"
      >
        {isCopied ? (
          <Check className="w-3 h-3 text-green-600" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}
