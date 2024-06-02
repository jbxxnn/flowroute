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
  title: "Flowbill",
  description:
    "Manage your Flowbill.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Flowbill",
    description:
      "Manage your flowbill",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowbill",
    description:
      "Manage your flowbill"
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
