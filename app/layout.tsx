import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeIQ – AI-Powered Resume Analysis",
  description: "Get past ATS and land more interviews with ResumeIQ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-stone-50">
      <body
        className={`${geistSans.variable} antialiased min-h-screen text-stone-900`}
      >
        {children}
      </body>
    </html>
  );
}

