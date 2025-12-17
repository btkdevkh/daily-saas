"use client";

type SearchBasicProps<T extends Object> = {
  data: T[];
};

const SearchBasic = <T extends Object>({ data }: SearchBasicProps<T>) => {
  return (
    <>
      <form className="text-graphite">
        <input
          type="text"
          placeholder="🔍︎"
          className="w-24 md:w-60 p-1.5 md:p-2 shadow bg-white rounded outline-none"
        />
      </form>
    </>
  );
};

export default SearchBasic;
