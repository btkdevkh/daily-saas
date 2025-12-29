"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type TabLinkProps = {
  url: string;
  title: string;
};

const TabLink = ({ url, title }: TabLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const order = searchParams.get("order");

  return (
    <Link
      href={url}
      className={`w-fit font-semibold uppercase border-b-3 border-white ${
        pathname === url || `${pathname}?order=${order}` === url
          ? "bg-graphite"
          : "bg-[#979696]"
      } text-white text-center shadow py-1 px-2 rounded`}
    >
      {title}
    </Link>
  );
};

export default TabLink;
