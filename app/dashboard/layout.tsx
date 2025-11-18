"use client";

import LeftNavbar from "@/components/LeftNavbar";
import Navbar from "@/components/Navbar";
import { ReactNode, useState } from "react";

// Custom layout
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <main className="bg-dust-grey min-h-screen flex justify-between">
        {/* Left Navbar */}
        <LeftNavbar open={open} setOpen={setOpen} />

        {/* Children */}
        <div className={`${open ? "w-[calc(100%-250px)]" : "w-[calc(100%)]"}`}>
          <Navbar open={open} />
          {children}
        </div>
      </main>
    </>
  );
}
