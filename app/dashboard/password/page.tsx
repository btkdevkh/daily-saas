import { getPasswords } from "@/actions/get/password";
import CreateButton from "@/components/CreateButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import ExportButton from "@/components/ExportButton";
import PasswordList from "@/components/password/PasswordList";
import SearchBasic from "@/components/SearchBasic";
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

        <div className="flex gap-1 items-center">
          <SearchBasic data={data.passwords ?? []} />
          <ExportButton
            title="Exporter"
            label="CSV"
            fileName="passwords.csv"
            data={data.passwords ? data.passwords : []}
          />
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
