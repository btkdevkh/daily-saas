import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useSearchBar } from "@/context/SearchBarContext";
import { BiSolidCreditCard } from "react-icons/bi";
import Clock from "./Clock";

type LeftNavbarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LeftNavbar = ({ open, setOpen }: LeftNavbarProps) => {
  const { setTerm, setSearchData } = useSearchBar();

  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const order = searchParams.get("order") ?? 1;

  const resetContextState = () => {
    setTerm("");
    setSearchData(null);

    const scrollIndicator = document.getElementById(
      "scroll-indicator"
    ) as HTMLDivElement;
    scrollIndicator.style.width = `${0}%`;
  };

  return (
    <div
      id="root-left-navbar-parent"
      className={`bg-white shadow text-graphite flex flex-col justify-between ${
        open ? "w-[300px] fade-out" : "w-[50px] fade-in"
      } py-1 px-1.5`}
    >
      <div>
        <div className="flex justify-between items-center">
          {open && (
            <Link href="/dashboard" className="ml-1.5 mr-auto">
              <Image src="/logo.png" width={35} height={35} alt="logo" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => {
              setOpen(!open);
            }}
            className="cursor-pointer hover:bg-[rgb(0,0,0,0.2)] rounded-full p-2 transition"
          >
            <GiHamburgerMenu size={23} />
          </button>
        </div>

        <br />

        <nav className={`flex flex-col ${!open ? "items-center" : ""} gap-3`}>
          {MENU.filter(
            (menu) => menu.access === "User" || session?.user.role === "Admin"
          ).map((menu) => {
            return (
              <Link
                key={menu.id}
                href={
                  menu.pathname === "/dashboard/running"
                    ? `${menu.pathname}?order=${order}`
                    : menu.pathname
                }
                className={`flex items-center gap-2 ${open ? "p-1" : ""}`}
                onClick={resetContextState}
              >
                <span className="shadow p-1.5 hover:bg-[rgb(0,0,0,0.1)] transition">
                  {pathname.includes(menu.pathname) ||
                  `${pathname}?order=${order}`.includes(menu.pathname)
                    ? menu.iconActive
                    : menu.icon}
                </span>

                {open && (
                  <span
                    className={`w-full shadow py-1.5 px-3 uppercase hover:bg-[rgb(0,0,0,0.1)] transition ${
                      pathname.includes(menu.pathname) ||
                      `${pathname}?order=${order}`.includes(menu.pathname)
                        ? "text-stormy-teal font-semibold"
                        : ""
                    }`}
                  >
                    {menu.title}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {open ? (
        <>
          <Clock />

          <button
            type="button"
            title="Déconnexion"
            className="w-fit flex items-center gap-2 py-2 px-4 shadow text-graphite font-semibold self-center cursor-pointer hover:bg-[rgb(0,0,0,0.1)] transition uppercase mb-2"
            onClick={() => signOut()}
          >
            <AiOutlineLogout size={28} /> <span>Déconnexion</span>
          </button>
        </>
      ) : (
        <button
          type="button"
          title="Déconnexion"
          className="w-fit py-1.5 px-1.5 rounded-full text-graphite self-center cursor-pointer hover:bg-[rgb(0,0,0,0.1)] transition"
          onClick={() => signOut()}
        >
          <AiOutlineLogout size={28} />
        </button>
      )}
    </div>
  );
};

export default LeftNavbar;

const ICON_SIZE = 25;

const MENU = [
  {
    id: uuidv4(),
    title: "Utilisateurs",
    pathname: "/dashboard/user",
    show: true,
    icon: <FaUsers size={ICON_SIZE} color="#353535" />,
    iconActive: <FaUsers size={ICON_SIZE} color="#3C6E71" />,
    access: "Admin",
  },
  {
    id: uuidv4(),
    title: "Rendez-vous",
    pathname: "/dashboard/rdv",
    show: false,
    icon: <IoCalendarNumberSharp size={ICON_SIZE} color="#353535" />,
    iconActive: <IoCalendarNumberSharp size={ICON_SIZE} color="#3C6E71" />,
    access: "User",
  },
  {
    id: uuidv4(),
    title: "Mot de passe",
    pathname: "/dashboard/password",
    show: false,
    icon: <MdOutlinePassword size={ICON_SIZE} color="#353535" />,
    iconActive: <MdOutlinePassword size={ICON_SIZE} color="#3C6E71" />,
    access: "User",
  },
  {
    id: uuidv4(),
    title: "Course à pied",
    pathname: "/dashboard/running",
    show: false,
    icon: <FaRunning size={ICON_SIZE} color="#353535" />,
    iconActive: <FaRunning size={ICON_SIZE} color="#3C6E71" />,
    access: "User",
  },
  {
    id: uuidv4(),
    title: "Banques",
    pathname: "/dashboard/bank",
    show: false,
    icon: <BiSolidCreditCard size={ICON_SIZE} color="#353535" />,
    iconActive: <BiSolidCreditCard size={ICON_SIZE} color="#3C6E71" />,
    access: "User",
  },
  {
    id: uuidv4(),
    title: "Chatbot I.A",
    pathname: "/dashboard/chatai",
    show: false,
    icon: <RiRobot2Fill size={ICON_SIZE} color="#353535" />,
    iconActive: <RiRobot2Fill size={ICON_SIZE} color="#3C6E71" />,
    access: "User",
  },
];
