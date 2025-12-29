"use client";

import { ReactNode } from "react";
import { MdClose } from "react-icons/md";
import { useModalContext } from "@/context/ModalContext";
import { UI } from "@/lib/ui-config";

const ModalWrapper = ({ children }: { children: ReactNode }) => {
  const { openModal, setOpenModal } = useModalContext();

  return (
    <>
      {openModal && (
        <div
          className="w-[calc(100%+50px)] h-full absolute top-0 bottom-0 -left-[50px] right-0 z-1000 bg-[rgb(0,0,0,0.7)] flex flex-col items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpenModal(false);
            }
          }}
        >
          <button
            type="button"
            className="bg-red-700 p-1.5 absolute top-1 right-1 cursor-pointer rounded"
            onClick={() => setOpenModal(false)}
          >
            <MdClose size={UI.iconSize} color="white" />
          </button>

          <div className="p-3">{children}</div>
        </div>
      )}
    </>
  );
};

export default ModalWrapper;
