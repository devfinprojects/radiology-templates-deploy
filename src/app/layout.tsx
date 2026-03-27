import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radiology Templates - Report Management System",
  description: "Modern radiology report template management with fuzzy search, snippets, and comprehensive CT, MRI, X-Ray, and Ultrasound templates.",
  keywords: ["Radiology", "Templates", "Medical Reports", "CT", "MRI", "X-Ray", "Ultrasound", "Healthcare", "Medical Imaging"],
  authors: [{ name: "Radiology Templates" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Radiology Templates",
    description: "Modern radiology report template management system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
