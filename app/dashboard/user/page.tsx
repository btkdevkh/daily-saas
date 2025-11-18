import { getUsers } from "@/actions/get/user";
import CreateButton from "@/components/CreateButton";
import PageWrapper from "@/components/PageWrapper";

const UserPage = async () => {
  const data = await getUsers();

  return (
    <PageWrapper>
      <div className="p-3">
        <div className="flex justify-between">
          {data.users && data.users.length === 0 ? (
            <div>
              <mark>Il n'y pas d'utilisateur.</mark>
            </div>
          ) : (
            <span className="text-black font-semibold text-xl border-b-2 border-stormy-teal">
              Utilisateurs
            </span>
          )}

          {/* Create button */}
          <CreateButton page="user" />
        </div>

        <br />

        <div className="grid md:grid-cols-6 gap-2 text-black">
          {data.users &&
            data.users.length > 0 &&
            data.users?.map((user) => (
              <div key={user.id} className="bg-white shadow p-3 rounded">
                <p>Id: {user.id}</p>
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <p>Email: {user.email}</p>
              </div>
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserPage;
