import { ReactNode } from "react";
import PageWrapper from "@/components/PageWrapper";
import { Metadata } from "next";
import BackButton from "@/components/BackButton";
import TabLink from "@/components/TabLink";
import ChildrenWrapper from "@/components/ChildrenWrapper";

export const metadata: Metadata = {
  title: "Daily SaaS | Création",
};

// Custom layout
export default async function CreateUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageWrapper>
      <div className="flex justify-between items-center p-3">
        <TabLink url="/dashboard/user/create" title="Créer" />
        <BackButton />
      </div>

      <ChildrenWrapper>{children}</ChildrenWrapper>
    </PageWrapper>
  );
}
