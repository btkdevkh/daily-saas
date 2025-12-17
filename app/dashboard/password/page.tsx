import { getPasswords } from "@/actions/get/password";
import CreateButton from "@/components/CreateButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import PasswordList from "@/components/password/PasswordList";
import TabLink from "@/components/TabLink";

const PasswordPage = async () => {
  const data = await getPasswords();

  return (
    <>
      <div className={`flex justify-between gap-2 items-center mb-1`}>
        {data.passwords && data.passwords.length === 0 ? (
          <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
            Aucune donnée disponible
          </span>
        ) : (
          <div className="w-full flex items-center gap-1">
            <TabLink url="/dashboard/password" title="Mot de passe" />
          </div>
        )}

        <div className="flex items-center">
          <CreateButton page="password" />
        </div>
      </div>

      <DashboardSectionWrapper>
        <PasswordList passwords={data.passwords ?? []} />
      </DashboardSectionWrapper>
    </>
  );
};

export default PasswordPage;
