"use client";

import { UI } from "@/lib/ui-config";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

type CreateButtonProps = {
  page: string;
};

const CreateButton = ({ page }: CreateButtonProps) => {
  const router = useRouter();

  return (
    <button
      className="w-fit bg-stormy-teal flex justify-center items-center gap-1 p-1 md:p-2 font-semibold cursor-pointer uppercase rounded"
      onClick={() => router.push(`/dashboard/${page}/create`)}
    >
      <IoMdAdd size={UI.iconSize} />
      <span className="hidden md:block">Créer</span>
    </button>
  );
};

export default CreateButton;
