import type { Metadata } from "next";
import {Raleway} from "next/font/google"

const raleway_font = Raleway({subsets:['latin']})

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Versal Technologies",
  description:
    "Phone System Billing Software.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Versal Technologies",
    description:
      "Phone System Billing Software.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Versal Technologies",
    description:
      "Phone System Billing Software."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={raleway_font.className}>
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
