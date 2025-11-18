import { ReactNode } from "react";

// Custom layout
export default async function CreateUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
