import { Running } from "@prisma/client";
import RunningMode from "./RunningMode";
import { format } from "date-fns";
import Link from "next/link";
import { PiPencilDuotone } from "react-icons/pi";
import ActionButton from "../ActionButton";
import { deleteRunning } from "@/actions/delete/running";
import { RiDeleteBin6Line } from "react-icons/ri";

const RunningList = ({ runnings }: { runnings: Running[] }) => {
  return (
    <div className="grid gap-1 text-graphite">
      {runnings &&
        runnings.length > 0 &&
        runnings.map((running) => (
          <div
            key={running.id}
            className="bg-white shadow p-3 relative rounded"
          >
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="bg-amber-300 p-2 rounded-full">
                  <RunningMode mode={running.mode} />
                </span>
                <span>{format(new Date(running.date), "dd/MM/yyyy")}</span>
              </div>

              <hr className="h-px border-none bg-dust-grey" />

              <div className="flex justify-between">
                <div className="flex flex-col items-center gap-2 p-1">
                  <span className="font-bold">
                    {Number(running.kilometers)}
                  </span>
                  <span>Kilomètres</span>
                </div>

                <div className="flex flex-col items-center gap-2 p-1">
                  <span className="font-bold">{running.durations}</span>
                  <span>Temps</span>
                </div>

                <div className="flex flex-col items-center gap-2 p-1">
                  <span className="font-bold">{Number(running.calories)}</span>
                  <span>Calories</span>
                </div>
              </div>

              <div className="justify-end flex gap-2">
                <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                  <Link href={`/dashboard/running/update/${running.id}`}>
                    <PiPencilDuotone size={20} color="orange" />
                  </Link>
                </div>

                <ActionButton
                  id={running.id}
                  handler={deleteRunning as (id?: string) => void}
                >
                  <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                    <RiDeleteBin6Line size={20} color="crimson" />
                  </div>
                </ActionButton>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RunningList;
