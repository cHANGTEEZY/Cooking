import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { switzer, switzerFallback, mono } from "@/lib/fonts";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import QueryProvider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Event Finder - Discover Amazing Events",
  description: "Find and create amazing events in your area with Event Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${switzer.variable} ${switzerFallback.variable} ${mono.variable} font-sans antialiased`}
        >
          <QueryProvider>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Analytics />
              <Toaster richColors position="top-right" />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
