import { deleteRdv } from "@/actions/delete/rdv";
import { getRdvs } from "@/actions/get/rdv";
import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import PageWrapper from "@/components/PageWrapper";
import { RiDeleteBin6Line } from "react-icons/ri";

const RdvPage = async () => {
  const data = await getRdvs();

  return (
    <PageWrapper>
      <div className="p-3">
        <div className="flex justify-between items-center mb-3">
          {data.rdvs && data.rdvs.length === 0 ? (
            <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
              Il n'y pas de rendez-vous
            </span>
          ) : (
            <span className="text-graphite font-semibold uppercase border-b-2 border-stormy-teal">
              Rendez-vous
            </span>
          )}

          {/* Create button */}
          <CreateButton page="rdv" />
        </div>

        <div className="grid md:grid-cols-4 gap-2 text-black">
          {data.rdvs &&
            data.rdvs.length > 0 &&
            data.rdvs.map((rdv) => (
              <div
                key={rdv.id}
                className="bg-white shadow p-3 rounded relative"
              >
                <div>
                  <h2>Sujet: {rdv.title}</h2>
                  <p>Avec: {rdv.withWhom}</p>
                  <p>Date: {rdv.date}</p>
                  <p>Adresse: {rdv.address}</p>
                </div>

                <DeleteButton id={rdv.id} handler={deleteRdv}>
                  <RiDeleteBin6Line size={20} color="crimson" />
                </DeleteButton>
              </div>
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default RdvPage;
