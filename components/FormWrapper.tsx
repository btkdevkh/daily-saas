import { ReactNode } from "react";

const FormWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[500px] mx-auto bg-dust-grey text-graphite">
      {children}
    </div>
  );
};

export default FormWrapper;
