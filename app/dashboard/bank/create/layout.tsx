import { ReactNode } from "react";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";
import TabLink from "@/components/TabLink";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";

export const metadata: Metadata = {
  title: "Daily SaaS | Création",
};

// Custom layout
export default async function CreateBankAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        <TabLink url="/dashboard/bank/create" title="Créer" />
        <BackButton />
      </div>

      <DashboardSectionWrapper>{children}</DashboardSectionWrapper>
    </>
  );
}
