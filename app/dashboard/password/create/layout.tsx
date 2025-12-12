import BackButton from "@/components/BackButton";
import ChildrenWrapper from "@/components/ChildrenWrapper";
import PageWrapper from "@/components/PageWrapper";
import TabLink from "@/components/TabLink";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Création",
};

// Custom layout
export default async function CreatePasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageWrapper>
      <div className="flex justify-between items-center p-3">
        <TabLink url={`/dashboard/password/create`} title="Créer" />
        <BackButton />
      </div>

      <ChildrenWrapper>{children}</ChildrenWrapper>
    </PageWrapper>
  );
}
