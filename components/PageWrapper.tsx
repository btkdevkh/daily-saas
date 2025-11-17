import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div className="min-h-screen w-full bg-dust-grey">{children}</div>;
};

export default PageWrapper;
