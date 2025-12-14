import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Chat AI",
};

// Custom layout
export default async function ChatAiLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
