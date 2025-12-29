"use client";

import { UI } from "@/lib/ui-config";
import { BiSolidFileImport } from "react-icons/bi";
import { useModalContext } from "@/context/ModalContext";

type ImportButtonProps = {
  title: string;
  label?: string;
};

const ImportButton = ({ title, label }: ImportButtonProps) => {
  const { setOpenModal } = useModalContext();

  return (
    <button
      type="button"
      title={`Exporter en ${label}`}
      className="w-fit bg-stormy-teal flex items-center gap-1 p-1 md:p-2 rounded font-semibold cursor-pointer uppercase"
      onClick={() => setOpenModal(true)}
    >
      <BiSolidFileImport size={UI.iconSize} />
      <span className="hidden md:block">{title}</span>
      <small className="text-[10px] text-graphite bg-amber-400 py-0.5 px-1 hidden md:block rounded">
        {label}
      </small>
    </button>
  );
};

export default ImportButton;
