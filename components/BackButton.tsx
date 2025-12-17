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
      className="md:w-[175px] bg-stormy-teal flex justify-center items-center gap-1 p-2 rounded font-semibold cursor-pointer uppercase"
      onClick={() => router.back()}
    >
      <IoMdArrowRoundBack size={UI.iconSize} />
      <span className="hidden md:block">Retour</span>
    </button>
  );
};

export default BackButton;
