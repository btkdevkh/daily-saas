import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <main className="h-svh w-full bg-dust-grey overflow-hidden">
      {children}
    </main>
  );
};

export default PageWrapper;
