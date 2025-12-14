import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Mot de passe",
};

// Custom layout
export default async function PasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
