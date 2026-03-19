"use client";

import { useState } from "react";
import { Copy, Check, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Footer from "@/components/Footer";

interface GenerationResults {
  instagram_bios: string[];
  tiktok_captions: string[];
}

export default function Home() {
  const [role, setRole] = useState("");
  const [vibe, setVibe] = useState("Professional");
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<GenerationResults | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<{ section: string; index: number } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!role && !keywords) {
      setError("Please provide at least a role or some keywords!");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey || apiKey === "YOUR_ACTUAL_API_KEY_HERE") {
        throw new Error("Gemini API key is missing or not configured correctly in .env.local (Ensure NEXT_PUBLIC_ prefix is used)");
      }

      const prompt = `System: You are a social media expert. Based on the user's Role, Vibe, and Keywords, generate 5 Instagram bios and 3 TikTok captions. Output ONLY valid JSON.
      
      User Details:
      Role: ${role}
      Vibe: ${vibe}
      Keywords: ${keywords}

      JSON Format Example: { "instagram_bios": ["bio1", "bio2"], "tiktok_captions": ["caption1", "caption2"] }`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}") + 1;
      const jsonString = text.slice(jsonStart, jsonEnd);
      
      const parsedResults: GenerationResults = JSON.parse(jsonString);
      setResults(parsedResults);

      // Save to Supabase
      const { error: dbError } = await supabase.from("generated_bios").insert([
        {
          role,
          vibe,
          content: parsedResults,
        },
      ]);

      if (dbError) {
        console.error("Database save error:", dbError);
      }

    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Failed to generate bios. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, section: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex({ section, index });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-neon-purple/30">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 px-6 md:px-12 border-b border-panel-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] cursor-pointer">
          BioVibes
        </h1>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-xs text-foreground/40 border border-panel-border px-2 py-1 rounded-full">
            Powered by BioVibes AI
          </span>
          <Link
            href="/explore"
            className="text-sm md:text-base font-medium text-foreground/80 hover:text-neon-blue transition-colors hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.6)]"
          >
            Explore Gallery
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start w-full px-4 pt-10 md:pt-20 pb-24">
        
        {/* Generator Section */}
        <div className="w-full max-w-lg bg-panel-bg border border-panel-border rounded-2xl p-6 md:p-8 shadow-[0_0_25px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-purple/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-blue/20 blur-[60px] rounded-full pointer-events-none" />

          <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-md relative z-10 flex items-center justify-center gap-2">
            Create Your Vibe <Sparkles className="w-5 h-5 text-neon-purple" />
          </h2>

          <div className="space-y-5 relative z-10">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="role" className="font-medium text-sm text-foreground/90">
                What is your role?
              </label>
              <input
                id="role"
                type="text"
                placeholder="e.g., DJ, Fitness Coach, Entrepreneur"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-panel-border focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder:text-foreground/40 text-sm"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="vibe" className="font-medium text-sm text-foreground/90">
                What is the Vibe?
              </label>
              <select
                id="vibe"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-panel-border focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all appearance-none cursor-pointer text-sm"
              >
                <option value="Professional">Professional</option>
                <option value="Funny">Funny</option>
                <option value="Savage">Savage</option>
                <option value="Aesthetic">Aesthetic</option>
                <option value="Hype">Hype</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="keywords" className="font-medium text-sm text-foreground/90">
                Keywords
              </label>
              <input
                id="keywords"
                type="text"
                placeholder="e.g., Techno, Qatar, 5AM Club"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-panel-border focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder:text-foreground/40 text-sm"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-medium bg-red-400/10 p-2 rounded-lg border border-red-400/20">
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-4 py-3.5 px-6 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-neon-purple to-neon-blue hover:from-purple-500 hover:to-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-neon-blue transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate My Bios"
              )}
            </button>
          </div>
        </div>

        {/* Results Area */}
        {results && (
          <div className="w-full max-w-2xl mt-12 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            
            {/* Instagram Bios Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-center text-foreground/90 flex items-center justify-center gap-2">
                Instagram Bios <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded-md">5 Results</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.instagram_bios.map((bio, index) => (
                  <ResultCard 
                    key={`ig-${index}`}
                    text={bio}
                    section="ig"
                    index={index}
                    isCopied={copiedIndex?.section === 'ig' && copiedIndex?.index === index}
                    onCopy={() => handleCopy(bio, 'ig', index)}
                  />
                ))}
              </div>
            </div>

            {/* TikTok Captions Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-center text-foreground/90 flex items-center justify-center gap-2">
                TikTok Captions <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded-md">3 Results</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.tiktok_captions.map((caption, index) => (
                  <ResultCard 
                    key={`tt-${index}`}
                    text={caption}
                    section="tt"
                    index={index}
                    isCopied={copiedIndex?.section === 'tt' && copiedIndex?.index === index}
                    onCopy={() => handleCopy(caption, 'tt', index)}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ResultCard({ text, isCopied, onCopy, section, index }: { text: string; isCopied: boolean; onCopy: () => void; section: string; index: number }) {
  return (
    <div className="relative bg-white/95 rounded-2xl p-4 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-white/20 transform hover:-translate-y-1 transition-all duration-300 group">
      <p className="text-zinc-900 pr-10 text-sm leading-relaxed font-medium">
        {text}
      </p>
      
      <button
        onClick={onCopy}
        className="absolute top-3 right-3 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      {isCopied && (
        <span className="absolute -top-8 right-0 text-[10px] font-bold text-neon-blue bg-neon-blue/10 px-2 py-1 rounded-md animate-bounce">
          Copied!
        </span>
      )}
    </div>
  );
}
