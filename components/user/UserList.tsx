"use client";

import Link from "next/link";
import { useEffect } from "react";
import { User } from "@prisma/client";
import ActionButton from "../ActionButton";
import { PiPencilDuotone } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteUser } from "@/actions/delete/user";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSearchBar } from "@/context/SearchBarContext";

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  const { term, setSearchData } = useSearchBar();

  const filteredUsers = users.filter((user) =>
    `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
      term.toLowerCase()
    )
  );

  useEffect(() => {
    setSearchData(filteredUsers);
  }, [term]);

  return (
    <>
      <div
        className={`grid md:grid-cols-2 ${
          filteredUsers.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
        }  gap-1 text-graphite`}
      >
        {filteredUsers &&
          filteredUsers.length > 0 &&
          filteredUsers?.map((user) => (
            <div key={user.id} className="bg-white shadow p-3 relative rounded">
              <div>
                <p>Prénom: {user.firstname}</p>
                <p>
                  NOM: <b>{user.lastname}</b>
                </p>
                <p>Email: {user.email}</p>
                <p> Rôle: {user.role}</p>
              </div>
              <div className="absolute top-2 right-13">
                {user.role === "Admin" && (
                  <MdAdminPanelSettings size={20} color="green" title="Admin" />
                )}
              </div>

              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <ActionButton
                  id={user.id}
                  data={filteredUsers}
                  handler={deleteUser as (id?: string) => void}
                >
                  <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                    <RiDeleteBin6Line size={20} color="crimson" />
                  </div>
                </ActionButton>

                <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                  <Link href={`/dashboard/user/update/${user.id}`}>
                    <PiPencilDuotone size={20} color="orange" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserList;
