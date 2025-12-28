import { ReactNode } from "react";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";
import TabLink from "@/components/TabLink";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";

export const metadata: Metadata = {
  title: "Daily SaaS | Modification",
};

// Custom layout
export default async function UpdateBankAccountLayout({
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
        <TabLink url={`/dashboard/bank/update/${id}`} title="Modifier" />
        <BackButton />
      </div>

      <DashboardSectionWrapper>{children}</DashboardSectionWrapper>
    </>
  );
}
