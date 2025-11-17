import PageWrapper from "@/components/PageWrapper";
import Image from "next/image";
import { ReactNode } from "react";

// Custom layout
export default async function CreateRdvLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PageWrapper>
      <div className="flex items-center">
        <div className="h-screen w-[600px] bg-dust-grey flex items-center">
          {children}
        </div>
        <div className="h-screen md:w-[calc(100%-300px)] bg-stormy-teal flex justify-center items-center">
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
