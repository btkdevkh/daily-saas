import { getPasswords } from "@/actions/get/password";
import CreateButton from "@/components/CreateButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import PasswordList from "@/components/password/PasswordList";
import TabLink from "@/components/TabLink";

const PasswordPage = async () => {
  const data = await getPasswords();

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        {data.passwords && data.passwords.length === 0 ? (
          <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
            Aucune donnée disponible
          </span>
        ) : (
          <TabLink url="/dashboard/password" title="Mot de passe" />
        )}

        <CreateButton page="password" />
      </div>

      <DashboardSectionWrapper>
        <PasswordList passwords={data.passwords ?? []} />
      </DashboardSectionWrapper>
    </>
  );
};

export default PasswordPage;
