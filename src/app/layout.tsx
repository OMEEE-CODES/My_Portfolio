import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500", "600", "700", "800", "900"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Omkar More | Full Stack Developer",
  description: "Full Stack Developer skilled in React.js, Supabase, Firebase, and building end-to-end web applications. Portfolio of Omkar More.",
  keywords: ["Omkar More", "Full Stack Developer", "React.js", "Supabase", "Firebase", "JavaScript", "Portfolio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
