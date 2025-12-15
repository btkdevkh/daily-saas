import { UI } from "@/lib/ui-config";
import { ReactNode } from "react";

const DashboardSectionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        height: `calc(${UI.dashboardSectionHeightSvh} - 120px)`,
        overflow: "hidden",
        // backgroundColor: "orange",
      }}
    >
      {children}
    </div>
  );
};

export default DashboardSectionWrapper;
