import localFont from "next/font/local";

// Switzer Variable Font (Primary - Best performance with full weight range)
export const switzer = localFont({
  src: [
    {
      path: "../fonts/Switzer-Variable.woff2",
      style: "normal",
    },
    {
      path: "../fonts/Switzer-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
  preload: true,
  weight: "100 900", // Variable font supports full range
});

// Essential Switzer Static Weights (Fallback for better browser support)
export const switzerFallback = localFont({
  src: [
    {
      path: "../fonts/Switzer-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Switzer-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Switzer-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Switzer-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Switzer-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-switzer-fallback",
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

// Keep Geist Mono for code snippets (it's already optimized)
import { Geist_Mono } from "next/font/google";

export const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
