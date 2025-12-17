import BackButton from "@/components/BackButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import TabLink from "@/components/TabLink";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Modification",
};

// Custom layout
export default async function UpdateRunningLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <TabLink url={`/dashboard/running/update/${id}`} title="Modifier" />
        <BackButton />
      </div>

      <DashboardSectionWrapper>{children}</DashboardSectionWrapper>
    </>
  );
}
