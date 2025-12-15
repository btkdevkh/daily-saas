"use client";

import { BiSolidFileExport } from "react-icons/bi";

type CSVValue = string | number | boolean | null | undefined;

type ExportButtonProps<T extends Record<string, CSVValue>> = {
  title: string;
  data: T[];
  label?: string;
};

const ExportButton = <T extends Record<string, CSVValue>>({
  title,
  data,
  label,
}: ExportButtonProps<T>) => {
  const handleExport = () => {
    const dataExported = objectToCSV(data);
    downloadCSV(dataExported, "daily_saas_runnings.csv");
  };

  return (
    <button
      title={`Exporter en ${label}`}
      className="bg-stormy-teal flex items-center gap-1 p-2 rounded font-semibold cursor-pointer uppercase"
      onClick={handleExport}
    >
      <BiSolidFileExport size={20} />
      <span className="hidden md:block">{title}</span>
      <small className="text-[10px] text-graphite bg-amber-400 rounded py-0.5 px-1">
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
