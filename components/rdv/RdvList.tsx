"use client";

import Link from "next/link";
import { useEffect } from "react";
import { format } from "date-fns";
import { Rdv } from "@prisma/client";
import { deleteRdv } from "@/actions/delete/rdv";
import ActionButton from "@/components/ActionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiPencilDuotone } from "react-icons/pi";
import { useSearchBar } from "@/context/SearchBarContext";

type RdvListProps = {
  rdvs: Rdv[];
};
const RdvList = ({ rdvs }: RdvListProps) => {
  const { term, setSearchData } = useSearchBar();

  const filteredRdvs = rdvs.filter((rdv) =>
    rdv.title.toLowerCase().includes(term.toLowerCase())
  );

  useEffect(() => {
    setSearchData(filteredRdvs);
  }, [term]);

  return (
    <div
      className={`h-fit grid md:grid-cols-2 lg:grid-cols-3 gap-1 text-graphite`}
    >
      {filteredRdvs &&
        filteredRdvs.length > 0 &&
        filteredRdvs.map((rdv) => (
          <div key={rdv.id} className="bg-white shadow p-3 relative rounded">
            <div>
              <h2>Sujet: {rdv.title}</h2>
              <p>Avec: {rdv.withWhom}</p>
              <p>Date: {format(new Date(rdv.date), "dd/MM/yyyy à HH'h'mm")}</p>
              <p>Adresse: {rdv.address}</p>
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <ActionButton
                id={rdv.id}
                handler={deleteRdv as (id?: string) => void}
              >
                <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                  <RiDeleteBin6Line size={20} color="crimson" />
                </div>
              </ActionButton>

              <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                <Link href={`/dashboard/rdv/update/${rdv.id}`}>
                  <PiPencilDuotone size={20} color="orange" />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RdvList;
