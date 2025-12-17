import BackButton from "@/components/BackButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import TabLink from "@/components/TabLink";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Création",
};

// Custom layout
export default async function CreateRunningLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <TabLink url="/dashboard/running/create" title="Créer" />
        <BackButton />
      </div>

      <DashboardSectionWrapper>{children}</DashboardSectionWrapper>
    </>
  );
}
