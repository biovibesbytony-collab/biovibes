import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Viral AI-Generated Bios & Captions",
  description: "Browse the most recent and creative AI-generated Instagram bios and TikTok captions created by the BioVibes community.",
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
