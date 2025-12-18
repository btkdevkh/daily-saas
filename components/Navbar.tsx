import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { IoMdRefresh } from "react-icons/io";
import SearchBasic from "./SearchBasic";
import { useSearchBar } from "@/context/SearchBarContext";
import { usePathname } from "next/navigation";

type NavbarProps = {
  open: boolean;
};

const Navbar = ({ open }: NavbarProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { term, setTerm } = useSearchBar();

  return (
    <nav className="py-1.5 px-3 bg-white">
      <div className="flex items-center gap-1 justify-between">
        <div className="flex items-center gap-3 w-full">
          {!open && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                width={35}
                height={35}
                alt="logo"
                className="-mt-2"
              />
            </Link>
          )}
          <span className="hidden md:block w-[130px] text-graphite font-semibold uppercase">
            Daily SaaS
          </span>

          {!sectionsWithNoSearchBar.includes(pathname) && (
            <SearchBasic term={term} setTerm={setTerm} />
          )}
        </div>

        <div className="flex gap-1 items-center">
          <button
            type="submit"
            title="Actualiser"
            className="w-[35px] h-[35px] flex justify-center items-center hover:bg-[rgb(0,0,0,0.1)] cursor-pointer rounded-full"
            onClick={() => {
              window.location.reload();
            }}
          >
            <IoMdRefresh size={25} className="text-graphite" />
          </button>
          <div className="text-white font-semibold bg-[#3cbf99] w-[35px] h-[35px] rounded-full flex items-center justify-center shadow">
            <span>
              {session?.user.name?.split(" ")[0][0]}
              {session?.user.name?.split(" ")[1][0]}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const sectionsWithNoSearchBar = ["/dashboard/running", "/dashboard/chatai"];
