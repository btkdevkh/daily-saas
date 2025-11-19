import { getConnectedUser } from "@/actions/auth/user";
import { deleteUser } from "@/actions/delete/user";
import { getUsers } from "@/actions/get/user";
import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import PageWrapper from "@/components/PageWrapper";
import { redirect } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

const UserPage = async () => {
  const { user } = await getConnectedUser();

  if (user?.role === "User") {
    return redirect("/dashboard/rdv");
  }

  const data = await getUsers();

  return (
    <PageWrapper>
      <div className="p-3">
        <div className="flex justify-between items-center mb-3">
          {data.users && data.users.length === 0 ? (
            <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
              Il n'y pas d'utilisateur
            </span>
          ) : (
            <span className="text-graphite font-semibold uppercase border-b-2 border-stormy-teal">
              Utilisateurs
            </span>
          )}

          {/* Create button */}
          <CreateButton page="user" />
        </div>

        <div className="grid md:grid-cols-4 gap-2 text-black">
          {data.users &&
            data.users.length > 0 &&
            data.users?.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow p-3 rounded relative"
              >
                <div>
                  <p>Prénom: {user.firstname}</p>
                  <p>
                    NOM: <b>{user.lastname}</b>
                  </p>
                  <p>Email: {user.email}</p>
                  <p>Rôle: {user.role}</p>
                </div>

                <DeleteButton id={user.id} handler={deleteUser}>
                  <RiDeleteBin6Line size={20} color="crimson" />
                </DeleteButton>
              </div>
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserPage;
