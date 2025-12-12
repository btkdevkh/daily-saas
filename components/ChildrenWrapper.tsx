import { ReactNode } from "react";

const ChildrenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[500px] mx-auto bg-dust-grey flex items-center p-8">
      {children}
    </div>
  );
};

export default ChildrenWrapper;
