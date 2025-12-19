import { UIEvent } from "react";

export const UI = {
  dashboardSectionHeightSvh: "100svh",
  mbWithSearchBar: 3,
  iconSize: 25,
  indicatorScroll: (e: UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const scrollIndicator = document.getElementById(
      "scroll-indicator"
    ) as HTMLDivElement;

    const scrollPercent =
      (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;

    if (scrollIndicator) {
      scrollIndicator.style.width = `${scrollPercent}%`;
    }
  },
};
