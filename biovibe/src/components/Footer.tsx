import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-panel-border bg-background/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <Link href="/">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-2 hover:opacity-80 transition-opacity">
              BioVibes AI
            </h2>
          </Link>
          <p className="text-foreground/40 text-xs max-w-xs">
            The world's most advanced social media identity generator powered by BioVibes AI.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/explore" className="text-foreground/60 hover:text-neon-purple transition-colors">Explore</Link>
          <Link href="/sitemap-categories" className="text-foreground/60 hover:text-neon-blue transition-colors">Categories</Link>
          <Link href="/about" className="text-foreground/60 hover:text-white transition-colors">About Us</Link>
          <Link href="/contact" className="text-foreground/60 hover:text-white transition-colors">Contact</Link>
          <Link href="/privacy" className="text-foreground/60 hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="text-foreground/60 hover:text-white transition-colors">Terms</Link>
        </div>

        <div className="text-foreground/20 text-[10px] font-mono">
          &copy; {new Date().getFullYear()} BioVibes.net - All Rights Reserved
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-panel-border/20 flex flex-col gap-4">
        <h3 className="text-xs uppercase font-bold text-foreground/40 tracking-widest text-center mt-2">Popular Bio Categories</h3>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <Link href="/category/dj" className="text-foreground/30 hover:text-neon-purple transition-colors">DJ Bios</Link>
          <Link href="/category/nurse" className="text-foreground/30 hover:text-neon-purple transition-colors">Nurse Bios</Link>
          <Link href="/category/gamer" className="text-foreground/30 hover:text-neon-purple transition-colors">Gamer Bios</Link>
          <Link href="/category/entrepreneur" className="text-foreground/30 hover:text-neon-purple transition-colors">Entrepreneur Bios</Link>
          <Link href="/category/fitness" className="text-foreground/30 hover:text-neon-purple transition-colors">Fitness Bios</Link>
          <Link href="/category/chef" className="text-foreground/30 hover:text-neon-purple transition-colors">Chef Bios</Link>
          <Link href="/category/travel" className="text-foreground/30 hover:text-neon-purple transition-colors">Travel Bios</Link>
          <Link href="/category/model" className="text-foreground/30 hover:text-neon-purple transition-colors">Model Bios</Link>
        </div>
      </div>
    </footer>
  );
}
