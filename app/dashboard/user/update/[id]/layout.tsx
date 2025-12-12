import { ReactNode } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";
import TabLink from "@/components/TabLink";
import ChildrenWrapper from "@/components/ChildrenWrapper";

export const metadata: Metadata = {
  title: "Daily SaaS | Modification",
};

// Custom layout
export default async function UpdateUserLayout({
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
        <TabLink url={`/dashboard/user/update/${id}`} title="Modifier" />
        <BackButton />
      </div>

      <ChildrenWrapper>{children}</ChildrenWrapper>
    </PageWrapper>
  );
}
