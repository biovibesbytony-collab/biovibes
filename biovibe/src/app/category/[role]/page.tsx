import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { CategoryGridItem } from "@/components/CategoryComponents";
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
}

interface PageProps {
  params: Promise<{ role: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedRole = decodeURIComponent(resolvedParams.role);
  const capitalizedRole = decodedRole.charAt(0).toUpperCase() + decodedRole.slice(1).toLowerCase();

  return {
    title: `50+ Best Instagram Bios & TikTok Captions for ${capitalizedRole} | BioVibes`,
    description: `Discover the best AI-generated social media bios and captions for ${decodedRole}. Perfect for Instagram, TikTok, and more!`,
    alternates: {
      canonical: `/category/${resolvedParams.role}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedRole = decodeURIComponent(resolvedParams.role);

  const { data, error } = await supabase
    .from("generated_bios")
    .select("*")
    .ilike("role", decodedRole)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
  }

  const bios: SavedBio[] = data || [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-neon-purple/30">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-6 px-6 md:px-12 border-b border-panel-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/explore" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-neon-blue" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] cursor-pointer">
            BioVibes
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-foreground/40 border border-panel-border px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-neon-purple" />
          Category: <span className="capitalize">{decodedRole}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight capitalize">
            {decodedRole} <span className="text-neon-blue">Collection</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Browse through our curated AI-generated social media templates specifically designed for <span className="text-white font-medium underline decoration-neon-purple/50 decoration-2 underline-offset-4 capitalize">{decodedRole}s</span>.
          </p>
        </div>

        {bios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="p-4 bg-panel-bg border border-panel-border rounded-2xl">
              <Sparkles className="w-10 h-10 text-neon-purple mx-auto mb-4 animate-pulse" />
              <p className="text-white font-bold text-xl">No "{decodedRole}" bios yet!</p>
              <p className="text-foreground/40 mt-2">Check back later or generate yours now on the home page.</p>
              <Link
                href="/"
                className="inline-block mt-6 px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-blue rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Start Generating
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bios.map((item) => (
              <CategoryGridItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
