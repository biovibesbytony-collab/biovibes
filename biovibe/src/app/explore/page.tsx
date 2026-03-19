"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Sparkles, Loader2, ArrowLeft, Instagram, Video } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic';

interface SavedBio {
  id: string;
  role: string;
  vibe: string;
  content: {
    instagram_bios: string[];
    tiktok_captions: string[];
  };
  created_at: string;
}

export default function ExplorePage() {
  const [savedBios, setSavedBios] = useState<SavedBio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<{ id: string; section: string; index: number } | null>(null);

  useEffect(() => {
    async function fetchBios() {
      try {
        const { data, error } = await supabase
          .from("generated_bios")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;
        setSavedBios(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBios();
  }, []);

  const handleCopy = (text: string, id: string, section: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ id, section, index });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-neon-purple/30">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 px-6 md:px-12 border-b border-panel-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-neon-blue" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] cursor-pointer">
            BioVibes
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-foreground/40 border border-panel-border px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-neon-purple" />
          Community Gallery
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Explore <span className="text-neon-blue">Viral</span> Concepts
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Discover the most popular AI-generated social media identities created by our community.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-neon-purple" />
            <p className="text-foreground/40 font-medium">Fetching most recent vibes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedBios.map((item) => (
              <div key={item.id} className="flex flex-col space-y-4">
                <div className="bg-panel-bg border border-panel-border rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                  {/* Category Header */}
                  <div className="flex justify-between items-start mb-6 border-b border-panel-border/50 pb-4">
                    <Link 
                      href={`/category/${encodeURIComponent(item.role.toLowerCase())}`}
                      className="group/link"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-neon-blue font-bold mb-1 group-hover/link:text-neon-purple transition-colors">
                        {item.vibe}
                      </p>
                      <h3 className="text-lg font-bold text-white capitalize group-hover/link:underline decoration-neon-blue decoration-2 underline-offset-4">
                        {item.role}
                      </h3>
                    </Link>
                    <div className="text-[10px] text-foreground/30 font-mono">
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-6">
                    {/* IG BIOS */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 mb-1">
                        <Instagram className="w-3 h-3" /> INSTAGRAM OPTIONS
                      </div>
                      <div className="space-y-2">
                        {item.content.instagram_bios.slice(0, 2).map((bio, idx) => (
                          <ExploreCard 
                            key={`ig-${idx}`}
                            text={bio}
                            isCopied={copiedId?.id === item.id && copiedId?.section === 'ig' && copiedId?.index === idx}
                            onCopy={() => handleCopy(bio, item.id, 'ig', idx)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* TT CAPTIONS */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 mb-1">
                        <Video className="w-3 h-3" /> TIKTOK CAPTIONS
                      </div>
                      <div className="space-y-2">
                        {item.content.tiktok_captions.slice(0, 1).map((caption, idx) => (
                          <ExploreCard 
                            key={`tt-${idx}`}
                            text={caption}
                            isCopied={copiedId?.id === item.id && copiedId?.section === 'tt' && copiedId?.index === idx}
                            onCopy={() => handleCopy(caption, item.id, 'tt', idx)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ExploreCard({ text, isCopied, onCopy }: { text: string; isCopied: boolean; onCopy: () => void }) {
  return (
    <div className="relative bg-white/95 rounded-xl p-3 shadow-md border border-white/20 transform hover:-translate-y-0.5 transition-transform group">
      <p className="text-zinc-900 pr-8 text-[12px] leading-relaxed font-medium">
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
