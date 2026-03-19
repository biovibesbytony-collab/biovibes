import { Metadata } from "next";
import { Sparkles, Users, Globe, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | BioVibes - The AI Identity Platform",
  description: "Learn about the mission behind BioVibes and how we're using AI to help creators build their personal brands.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="w-full flex justify-between items-center py-6 px-6 md:px-12 border-b border-panel-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-neon-blue" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
            BioVibes
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20">
        <section className="text-center mb-20 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Helping creators find their <span className="text-neon-purple">Vibe</span>.
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            BioVibes was born out of a simple problem: the first impression is everything, but writing a bio is hard. We used advanced AI to build the tool we always wanted.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 bg-panel-bg border border-panel-border rounded-3xl space-y-4 hover:border-neon-blue transition-colors group">
            <Zap className="w-10 h-10 text-neon-blue group-hover:animate-pulse" />
            <h3 className="text-2xl font-bold text-white">Instant Identity</h3>
            <p className="text-foreground/50">
              Why spend hours staring at a blinking cursor? Our AI understands your vibe and generates dozens of variations in seconds.
            </p>
          </div>

          <div className="p-8 bg-panel-bg border border-panel-border rounded-3xl space-y-4 hover:border-neon-purple transition-colors group">
            <Users className="w-10 h-10 text-neon-purple group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white">Community Driven</h3>
            <p className="text-foreground/50">
              With our Explore Gallery, you can see what's trending and find inspiration from thousands of other creators in your niche.
            </p>
          </div>
        </div>

        <section className="bg-panel-bg border border-neon-purple/20 rounded-3xl p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 blur-[100px] -z-10" />
          <Sparkles className="w-12 h-12 text-neon-purple mx-auto" />
          <h3 className="text-3xl font-black text-white">Our Mission</h3>
          <p className="text-lg text-foreground/70 leading-relaxed italic">
            "To empower every individual on the internet with a professional, creative, and viral-ready identity that truly represents who they are and what they do."
          </p>
          <div className="pt-6">
             <Link href="/" className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-neon-blue hover:text-white transition-all transform hover:scale-110">
               Get Started Now
             </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
