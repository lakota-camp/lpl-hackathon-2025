import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";

// Font - Geist Sans
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Font - Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "LPL Hackathon",
  description: "LPL Hackathon 2025",
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <h1 className="text-xl font-semibold text-center">
            LPL Hackathon 2025
          </h1>
        </header>
        <main>
          <QueryProvider>{children}</QueryProvider>
        </main>
        <footer className="text-center p-4">
          <p>&copy; {new Date().getFullYear()} LPL Hackathon</p>
        </footer>
      </body>
    </html>
  );
}
