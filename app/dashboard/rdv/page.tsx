import { getRdvs } from "@/actions/get/rdv";
import TabLink from "@/components/TabLink";
import RdvList from "@/components/rdv/RdvList";
import ExportData from "@/components/ExportData";
import CreateButton from "@/components/CreateButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";

const RdvPage = async () => {
  const data = await getRdvs();

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        {data.rdvs && data.rdvs.length === 0 ? (
          <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
            Aucune donnée disponible
          </span>
        ) : (
          <div className="w-full flex items-center gap-1">
            <TabLink url="/dashboard/rdv" title="Rendez-vous" />
          </div>
        )}

        <div className="flex items-center gap-1">
          <ExportData title="Exporter" label="CSV" fileName="rdvs.csv" />
          <CreateButton page="rdv" />
        </div>
      </div>

      <DashboardSectionWrapper>
        <RdvList rdvs={data.rdvs ?? []} />
      </DashboardSectionWrapper>
    </>
  );
};

export default RdvPage;
