import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  open: boolean;
};

const Navbar = ({ open }: NavbarProps) => {
  return (
    <nav className="py-1.5 px-3 bg-white">
      <div className="flex items-center justify-between">
        {!open ? (
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={35}
              height={35}
              alt="logo"
              className="shadow rounded-xl"
            />
            <span className="text-graphite font-semibold uppercase">
              Daily SaaS
            </span>
          </Link>
        ) : (
          <span className="text-graphite font-semibold uppercase">
            Daily SaaS
          </span>
        )}

        <div className="flex items-center gap-3 text-black">
          <div>
            <span className="font-semibold">Bienvenue </span>
            <span className="border-b-2 border-dust-grey">BK</span>
            <span className="font-semibold"> !</span>
          </div>
          <Image src="/profile.png" width={35} height={35} alt="profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
