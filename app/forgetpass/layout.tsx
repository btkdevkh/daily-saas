import PageWrapper from "@/components/PageWrapper";
import { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Daily SaaS | Oublié le mot de passe",
};

// Custom layout
export default async function ForgetPassLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageWrapper>
      <div className="h-svh flex items-center">
        <div className="w-[500px] mx-auto bg-dust-grey flex items-center p-8">
          {children}
        </div>
        <div className="hidden md:flex justify-center items-center h-svh md:w-[calc(100%-300px)] bg-stormy-teal ">
          <Image
            src="/background.svg"
            width={1000}
            height={1000}
            alt="saas background"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
