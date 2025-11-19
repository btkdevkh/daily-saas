"use client";

import { ReactNode } from "react";

type DeleteButtonProps = {
  children: ReactNode;
  id: string;
  handler: (id: string) => void;
};

const DeleteButton = ({ children, id, handler }: DeleteButtonProps) => {
  return (
    <button
      type="submit"
      title="Supprimer"
      className="absolute top-2 right-2 cursor-pointer bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition"
      onClick={() => {
        if (confirm("Souhaitez-vous continuer ?")) {
          handler(id);
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteButton;
