import React from "react";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/src/components/shadcn-ui/toaster";
import ModalProvider from "@/src/components/providers/modal-provider";
import QueryProvider from "@/src/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/Trello.svg",
      href: "/Trello.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <ModalProvider />
            <Toaster />
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
