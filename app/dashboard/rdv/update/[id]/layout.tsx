import BackButton from "@/components/BackButton";
import ChildrenWrapper from "@/components/ChildrenWrapper";
import PageWrapper from "@/components/PageWrapper";
import TabLink from "@/components/TabLink";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Modification",
};

// Custom layout
export default async function UpdateRdvLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageWrapper>
      <div className="flex justify-between items-center p-3">
        <TabLink url={`/dashboard/rdv/update/${id}`} title="Modifier" />
        <BackButton />
      </div>

      <ChildrenWrapper>{children}</ChildrenWrapper>
    </PageWrapper>
  );
}
