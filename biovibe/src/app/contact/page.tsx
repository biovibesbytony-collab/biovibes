import { Metadata } from "next";
import { Mail, Instagram, Twitter, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | BioVibes Support",
  description: "Get in touch with the team behind BioVibes. We're here to help you find your social media vibe.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="w-full flex justify-between items-center py-6 px-6 md:px-12 border-b border-panel-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-neon-blue" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
            BioVibes
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-black text-white px-4">Get In <span className="text-neon-blue">Touch</span></h2>
          <p className="text-foreground/50 text-lg">Have a question or a feature request? We’d love to hear from you!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-6 bg-panel-bg border border-panel-border rounded-2xl space-y-3">
              <Mail className="w-6 h-6 text-neon-purple" />
              <h3 className="text-xl font-bold text-white">Email Us</h3>
              <p className="text-foreground/60">Our team typically responds in 24-48 hours.</p>
              <a href="mailto:support@biovibes.net" className="text-neon-blue font-bold hover:underline">support@biovibes.net</a>
            </div>

            <div className="p-6 bg-panel-bg border border-panel-border rounded-2xl space-y-3">
              <Instagram className="w-6 h-6 text-neon-blue" />
              <h3 className="text-xl font-bold text-white">Connect on Social</h3>
              <p className="text-foreground/60">Follow us for updates and trend reports.</p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="p-2 bg-white/5 hover:bg-neon-purple/20 border border-panel-border rounded-full transition-all">
                   <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="p-2 bg-white/5 hover:bg-neon-blue/20 border border-panel-border rounded-full transition-all">
                   <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="p-10 bg-panel-bg border border-panel-border rounded-3xl space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 bg-background border border-panel-border rounded-xl focus:border-neon-purple outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Email</label>
                <input 
                   type="email" 
                   placeholder="Your@Email.com" 
                   className="w-full px-4 py-3 bg-background border border-panel-border rounded-xl focus:border-neon-blue outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Message</label>
                <textarea 
                   rows={4} 
                   placeholder="Tell us about yourself..." 
                   className="w-full px-4 py-3 bg-background border border-panel-border rounded-xl focus:border-neon-purple outline-none resize-none"
                />
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-blue rounded-2xl text-white font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <Send className="w-5 h-5" /> Send Message
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
