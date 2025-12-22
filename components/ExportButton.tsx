"use client";

import { notify } from "@/lib/notification";
import { UI } from "@/lib/ui-config";
import { BiSolidFileExport } from "react-icons/bi";

type CSVValue = any | null | unknown | undefined;

type ExportButtonProps<T extends Record<string, CSVValue>> = {
  title: string;
  data: T[];
  fileName: string;
  label?: string;
};

const ExportButton = <T extends Record<string, CSVValue>>({
  title,
  data,
  fileName,
  label,
}: ExportButtonProps<T>) => {
  const handleExport = () => {
    const dataExported = objectToCSV(data);
    downloadCSV(dataExported, fileName);
    notify(true, "Données exportées", fileName);
  };

  return (
    <button
      title={`Exporter en ${label}`}
      className="w-fit bg-stormy-teal flex items-center gap-1 p-2 md:pr-3 rounded font-semibold cursor-pointer uppercase"
      onClick={handleExport}
    >
      <BiSolidFileExport size={UI.iconSize} />
      <span className="hidden md:block">{title}</span>
      <small className="text-[10px] text-graphite bg-amber-400 py-0.5 px-1 hidden md:block rounded">
        {label}
      </small>
    </button>
  );
};

export default ExportButton;

const objectToCSV = <T extends Record<string, CSVValue>>(
  data: T[],
  separator = ","
) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(separator),
    ...data.map((obj) =>
      headers
        .map((key) => {
          const value = obj[key];

          if (value === null || value === undefined) return "";

          const stringValue = String(value).replace(/"/g, '""');
          return `"${stringValue}"`;
        })
        .join(separator)
    ),
  ];

  return csvRows.join("\n");
};

const downloadCSV = (csv: string, filename = "export.csv") => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
