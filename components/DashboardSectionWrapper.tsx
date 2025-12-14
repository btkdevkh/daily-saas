import { UI } from "@/lib/ui-config";
import { ReactNode } from "react";

const DashboardSectionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      // className={`h-[calc(${UI.dashboardSectionHeight}-125px)]`}
      style={{
        height: `calc(${UI.dashboardSectionHeightVh} - 125px)`,
        overflow: "hidden",
        // backgroundColor: "orange",
      }}
    >
      {children}
    </div>
  );
};

export default DashboardSectionWrapper;
