"use client";

import {
  use,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type SearchBarContextType = {
  term: string;
  searchData: any[] | null;
  setTerm: Dispatch<SetStateAction<string>>;
  setSearchData: Dispatch<SetStateAction<any[] | null>>;
};

const initialState = {
  term: "",
  searchData: null,
  setTerm: () => {},
  setSearchData: () => {},
};

const SearchBarContext = createContext<SearchBarContextType>(initialState);

const SearchBarContextProvider = ({ children }: { children: ReactNode }) => {
  const [term, setTerm] = useState("");
  const [searchData, setSearchData] = useState<any[] | null>(null);

  return (
    <SearchBarContext.Provider
      value={{ term, searchData, setTerm, setSearchData }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarContextProvider;
export const useSearchBar = () => use(SearchBarContext);
