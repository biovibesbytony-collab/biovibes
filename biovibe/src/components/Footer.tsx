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
        </div>

        <div className="text-foreground/20 text-[10px] font-mono">
          &copy; {new Date().getFullYear()} BioVibes.net - All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
