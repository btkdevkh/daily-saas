"use client";

import {
  use,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ModalContextType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  openModal: false,
  setOpenModal: () => {},
};

const ModalContext = createContext<ModalContextType>(initialState);

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
export const useModalContext = () => use(ModalContext);
