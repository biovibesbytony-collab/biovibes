import { Metadata } from "next";
import { ArrowLeft, ShieldCheck, Mail, Globe, Database, Cpu } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | BioVibes.net",
  description: "Learn how we handle your data and privacy at BioVibes. We value your information and security.",
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
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

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-neon-blue" />
          <h2 className="text-4xl font-black text-white">Privacy Policy</h2>
        </div>

        <div className="space-y-12 text-foreground/70 leading-relaxed text-sm md:text-base">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-neon-purple" /> 1. Overview
            </h3>
            <p>
              BioVibes respects your privacy. We use industry-standard cookies to improve user experience. Note: We use third-party vendors, including Google, which use cookies to serve ads based on a user's prior visits to your website or other websites.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-neon-purple" /> 2. Data Collection
            </h3>
            <p>
              We collect minimal data necessary to provide our services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Input data (Role, Vibe, Keywords) used to generate your bios.</li>
              <li>Successfully generated bios which are stored in our public gallery.</li>
              <li>Basic usage analytics (anonymized) to improve our AI models and user experience.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-neon-purple" /> 3. AI Processing
            </h3>
            <p>
              We use the BioVibes AI engine to generate content. When you submit a request, your inputs are processed securely to provide high-quality results. No personal identifiers are shared with third-party model providers unless you include them in your keywords.
            </p>
          </section>

          <section className="space-y-4">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-neon-purple" /> 4. Storage & Security
            </h3>
            <p>
              Your generated bios are stored in our Supabase database. We use industry-standard encryption and security measures to protect this data. Note: Generated bios saved to the gallery are publicly viewable by visitors to BioVibes.net.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-neon-purple" /> 5. Your Rights
            </h3>
            <p>
              You have the right to request the removal of any bio you have generated. If you would like a specific category or bio removed from our database, please contact us.
            </p>
          </section>

          <section className="pt-8 border-t border-panel-border/30">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
