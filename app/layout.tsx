import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InboxSensi.ai",
  description: "This AI will classify your email's using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16"/>
      </Head>
      <Providers>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </Providers>
    </html>
  );
}
