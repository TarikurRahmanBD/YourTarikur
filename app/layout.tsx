import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import AvatarAnimationProvider from "./context/AvatarAnimationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarikur Rahman | Robotics & IoT Engineer",
  description:
    "Multidisciplinary engineer specializing in robotics, IoT, embedded systems, and web development. Proficient in React, Node.js, C++, ESP32, and 3D modeling.",
  keywords: [
    "Tarikur Rahman",
    "Robotics Engineer",
    "IoT Engineer",
    "Embedded Systems",
    "Web Developer",
    "React",
    "ESP32",
    "Bangladesh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>
          <AvatarAnimationProvider>
            <main
              className="min-h-screen transition-colors duration-500"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-color)",
              }}
              suppressHydrationWarning
            >
              <div className="custom-gradient-grid fixed top-0 left-0 w-full h-full opacity-60 pointer-events-none"></div>
              {children}
            </main>
          </AvatarAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
