import type React from "react";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ✅ Export separately
export const metadata: Metadata = {
  title: "ParkSmart - Smart Parking Solutions",
  description: "Find, book, and manage parking spots with AI-powered recommendations",
  generator: "v0.dev",
};

// ✅ Separate viewport (required by Next.js 15+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// ✅ Add head manually for manifest + PWA icons
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
