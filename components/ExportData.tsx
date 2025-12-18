"use client";

import ExportButton from "./ExportButton";
import { useSearchBar } from "@/context/SearchBarContext";

type ExportDataProps = {
  title: string;
  label: string;
  fileName: string;
  data?: any[];
};

const ExportData = ({ title, label, fileName, data }: ExportDataProps) => {
  const { searchData } = useSearchBar();

  return (
    <ExportButton
      {...{ title, label, fileName }}
      data={searchData ?? data ?? []}
    />
  );
};

export default ExportData;
