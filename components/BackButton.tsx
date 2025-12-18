"use client";

import { UI } from "@/lib/ui-config";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

type BackButtonProps = {
  url?: string;
};

const BackButton = ({ url }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      className="w-fit bg-stormy-teal flex justify-center items-center gap-1 p-2 md:px-3 font-semibold cursor-pointer uppercase rounded"
      onClick={() => router.back()}
    >
      <IoMdArrowRoundBack size={UI.iconSize} />
      <span className="hidden md:block">Retour</span>
    </button>
  );
};

export default BackButton;
