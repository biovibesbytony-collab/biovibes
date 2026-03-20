import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.biovibes.net'),
  title: "BioVibes: The #1 AI Bio Generator",
  description: "Create modern, clean Instagram bios and TikTok captions with BioVibes AI.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BioVibes: The #1 AI Bio Generator",
    description: "Create modern, clean Instagram bios and TikTok captions with BioVibes AI. Elevate your social presence with our professional, funny, and hype vibes.",
    url: 'https://www.biovibes.net',
    siteName: 'BioVibes',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BioVibes - AI-Powered Bio Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BioVibes: The #1 AI Bio Generator",
    description: "Create modern, clean Instagram bios and TikTok captions with BioVibes AI. Elevate your social presence with our professional, funny, and hype vibes.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
