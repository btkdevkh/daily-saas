import { ReactNode } from "react";

// Custom layout
export default async function CreateRdvLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="bg-dust-grey min-h-screen flex justify-center items-center">
      {children}
    </main>
  );
}
