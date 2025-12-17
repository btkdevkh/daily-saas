"use client";

import { Dispatch, SetStateAction, useState } from "react";

type SearchBasicProps = {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
};

const SearchBasic = ({ term, setTerm }: SearchBasicProps) => {
  return (
    <form className="w-full text-graphite">
      <input
        type="text"
        placeholder="🔍 Rechercher..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="bg-white w-full md:w-50 p-2 focus:border-2 border-stormy-teal outline-none shadow rounded"
      />
    </form>
  );
};

export default SearchBasic;
