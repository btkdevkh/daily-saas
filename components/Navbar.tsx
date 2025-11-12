import Image from "next/image";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="p-2 dark:bg-[#eaffe9] sticky top-0">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="logo"
            className="z-1"
          />
        </Link>

        <button className="bg-[#ed3067] h-[30px] px-2 rounded mr-0.5 font-semibold flex items-center gap-1">
          <IoMdAdd /> RDV
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
