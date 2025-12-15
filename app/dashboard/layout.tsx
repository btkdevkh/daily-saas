"use client";

import LeftNavbar from "@/components/LeftNavbar";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { ReactNode, Suspense, useEffect, useState } from "react";

// Custom layout
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const rootParent = target.closest("#root-left-navbar-parent");

      if (rootParent) return;
      return setOpen(false);
    });
  }, []);

  return (
    <Suspense>
      <PageWrapper>
        <title>Daily SaaS | Tableau de bord</title>
        <div className="h-full flex justify-between">
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
            <div className="p-3">{children}</div>
          </div>
        </div>
      </PageWrapper>
    </Suspense>
  );
}
