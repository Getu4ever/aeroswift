import type { Metadata, Viewport } from "next";
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

// Explicitly define viewport for mobile stability
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents accidental zooming on mobile
  userScalable: false,
};

export const metadata: Metadata = {
  title: "AeroSwift | Find Your Next Journey",
  description: "Compare millions of flight routes and book with ease using AeroSwift.",
  appleWebApp: {
    capable: true,
    title: "AeroSwift",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-200">
        {children}
      </body>
    </html>
  );
}