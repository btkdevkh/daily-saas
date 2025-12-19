import { getPasswords } from "@/actions/get/password";
import CreateButton from "@/components/CreateButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import ExportData from "@/components/ExportData";
import PasswordList from "@/components/password/PasswordList";
import TabLink from "@/components/TabLink";
import { UI } from "@/lib/ui-config";

const PasswordPage = async () => {
  const data = await getPasswords();

  return (
    <>
      <div
        className={`flex justify-between gap-2 items-center mb-${UI.mbWithSearchBar}`}
      >
        {data.passwords && data.passwords.length === 0 ? (
          <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
            Aucune donnée disponible
          </span>
        ) : (
          <div className="w-full flex items-center gap-1">
            <TabLink url="/dashboard/password" title="Mot de passe" />
          </div>
        )}

        <div className="flex items-center gap-1">
          {data.passwords && data.passwords.length > 0 && (
            <ExportData title="Exporter" label="CSV" fileName="passwords.csv" />
          )}
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
