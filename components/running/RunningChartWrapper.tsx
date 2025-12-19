"use client";

import { UI } from "@/lib/ui-config";
import { ReactNode } from "react";

const RunningChartWrapper = ({
  children,
  order,
}: {
  children: ReactNode;
  order: number;
}) => {
  return (
    <div
      className={`w-full flex flex-col gap-1 rounded ${
        order && Number(order) === 1 ? "pr-1" : ""
      } flex-3 h-1/2 md:h-full overflow-auto`}
      onScroll={UI.indicatorScroll}
    >
      {children}
    </div>
  );
};

export default RunningChartWrapper;
