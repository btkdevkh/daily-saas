"use client";

import { useRouter } from "next/navigation";

type CreateButtonProps = {
  page: string;
};

const CreateButton = ({ page }: CreateButtonProps) => {
  const router = useRouter();

  return (
    <button
      className="bg-yale-blue py-2 px-6 rounded font-semibold cursor-pointer"
      onClick={() => router.push(`/dashboard/${page}/create`)}
    >
      Créer
    </button>
  );
};

export default CreateButton;
