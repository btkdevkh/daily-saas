import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Budget",
};

// Custom layout
export default async function BankLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
