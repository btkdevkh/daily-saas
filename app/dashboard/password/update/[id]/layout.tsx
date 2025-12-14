import BackButton from "@/components/BackButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import TabLink from "@/components/TabLink";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Modification",
};

// Custom layout
export default async function UpdatePasswordLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <TabLink url={`/dashboard/password/update/${id}`} title="Modifier" />
        <BackButton />
      </div>

      <DashboardSectionWrapper>{children}</DashboardSectionWrapper>
    </>
  );
}
