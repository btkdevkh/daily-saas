"use client";

import LeftNavbar from "@/components/LeftNavbar";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { ReactNode, Suspense, useState } from "react";

// Custom layout
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Suspense>
      <PageWrapper>
        <title>Daily SaaS | Tableau de bord</title>
        <div className="bg-dust-grey h-screen flex justify-between">
          {/* Left Navbar */}
          <LeftNavbar open={open} setOpen={setOpen} />

          <div
            className={`${
              open ? "w-[calc(100%-300px)]" : "w-[calc(100%)] fade-in"
            }`}
          >
            {/* Main Navbar */}
            <Navbar open={open} />

            {/* Children */}
            <div className="max-h-screen p-3 overflow-hidden">{children}</div>
          </div>
        </div>
      </PageWrapper>
    </Suspense>
  );
}
