import { supabase } from "@/lib/supabase";
import { ArrowLeft, Sparkles, Tags } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Browse All Bio Categories | BioVibes Sitemap",
  description: "Find the perfect bio for any role. Browse our complete list of AI-generated social media categories.",
};

export default async function SitemapPage() {
  // Fetch unique roles using a distinct-like query (Supabase/Postgres)
  const { data, error } = await supabase
    .from("generated_bios")
    .select("role");

  if (error) {
    console.error("Fetch error:", error);
  }

  // Get unique roles and sort them
  const uniqueRoles = Array.from(new Set(data?.map((item) => item.role.toLowerCase())))
    .filter(Boolean)
    .sort();

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
          <Tags className="w-3 h-3 text-neon-purple" />
          Category Sitemap
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-8 h-8 text-neon-purple" />
          <h2 className="text-3xl md:text-4xl font-black text-white">All Categories</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uniqueRoles.length > 0 ? (
            uniqueRoles.map((role) => (
              <Link
                key={role}
                href={`/category/${encodeURIComponent(role)}`}
                className="p-4 bg-panel-bg border border-panel-border rounded-xl hover:border-neon-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all group"
              >
                <p className="text-foreground/80 group-hover:text-white capitalize font-medium text-sm md:text-base">
                  {role} <span className="text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-panel-bg border border-panel-border border-dashed rounded-2xl">
              <p className="text-foreground/40 italic">No categories generated yet. Be the first!</p>
              <Link href="/" className="text-neon-blue hover:underline mt-2 inline-block">Go to Home</Link>
            </div>
          )}
        </div>

        <footer className="mt-20 pt-8 border-t border-panel-border text-center">
          <p className="text-xs text-foreground/20 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} BioVibes AI • SEO Index v1.0
          </p>
        </footer>
      </main>
    </div>
  );
}
