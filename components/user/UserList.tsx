"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@prisma/client";
import { MdAdminPanelSettings } from "react-icons/md";
import { deleteUser } from "@/actions/delete/user";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiPencilDuotone } from "react-icons/pi";
import ActionButton from "../ActionButton";
import SearchBasic from "../SearchBasic";
import { UI } from "@/lib/ui-config";
import ExportButton from "../ExportButton";

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  const [term, setTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
      term.toLowerCase()
    )
  );

  return (
    <>
      {filteredUsers && filteredUsers.length > 0 && (
        <div className={`flex justify-between gap-2 mb-${UI.mbWithSearchBar}`}>
          <SearchBasic term={term} setTerm={setTerm} />
          <ExportButton
            title="Exporter"
            label="CSV"
            fileName="users.csv"
            data={filteredUsers}
          />
        </div>
      )}

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
