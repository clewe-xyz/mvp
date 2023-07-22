import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const mabryPro = localFont({
  src: [
    { path: "./mabry-pro/MabryPro-Regular.woff", weight: "400" },
    { path: "./mabry-pro/MabryPro-Regular.woff2", weight: "400" },
    {
      path: "./mabry-pro/MabryPro-Bold.woff",
      weight: "700",
    },
    {
      path: "./mabry-pro/MabryPro-Bold.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-mabry-pro",
});

export const stolzl = localFont({
  src: [
    { path: "./stolzl/Stolzl-Book.woff", weight: "400" },
    { path: "./stolzl/Stolzl-Book.woff2", weight: "400" },
  ],
  display: "swap",
  variable: "--font-stolzl",
});
