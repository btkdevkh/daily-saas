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
      className="md:w-[175px] bg-stormy-teal flex justify-center items-center gap-2 py-2 px-2 md:px-3 rounded font-semibold cursor-pointer uppercase"
      onClick={() => router.push(`/dashboard/${page}/create`)}
    >
      <IoMdAdd size={UI.iconSize} />
      <span className="hidden md:block">Créer</span>
    </button>
  );
};

export default CreateButton;
