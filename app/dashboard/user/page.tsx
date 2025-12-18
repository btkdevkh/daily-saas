import { getConnectedUser } from "@/actions/auth/user";
import { getUsers } from "@/actions/get/user";
import CreateButton from "@/components/CreateButton";
import { redirect } from "next/navigation";
import TabLink from "@/components/TabLink";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import UserList from "@/components/user/UserList";
import { UI } from "@/lib/ui-config";
import ExportData from "@/components/ExportData";

const UserPage = async () => {
  const { user } = await getConnectedUser();

  if (user?.role === "User") {
    return redirect("/dashboard/rdv");
  }

  const data = await getUsers();

  return (
    <>
      <div
        className={`flex justify-between items-center gap-2 mb-${UI.mbWithSearchBar}`}
      >
        {data.users && data.users.length === 0 ? (
          <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
            Aucune donnée disponible
          </span>
        ) : (
          <div className="w-full flex items-center gap-1">
            <TabLink url="/dashboard/user" title="Utilisateurs" />
          </div>
        )}

        <div className="flex items-center gap-1">
          <ExportData title="Exporter" label="CSV" fileName="users.csv" />
          <CreateButton page="user" />
        </div>
      </div>

      <DashboardSectionWrapper>
        <UserList users={data.users ?? []} />
      </DashboardSectionWrapper>
    </>
  );
};

export default UserPage;
