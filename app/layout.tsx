import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProviderClient from "@/components/SessionProviderClient";
import PageWrapper from "@/components/PageWrapper";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "@/lib/cron-dev";
import ModalContextProvider from "@/context/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily SaaS",
  description: "Gestionnaire des divers utilités",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh min-w-[320px] overflow-hidden`}
      >
        <SessionProviderClient>
          <ModalContextProvider>
            <PageWrapper>{children}</PageWrapper>
          </ModalContextProvider>
          <ToastContainer />
        </SessionProviderClient>
      </body>
    </html>
  );
}
