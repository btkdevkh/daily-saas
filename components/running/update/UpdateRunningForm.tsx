"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Running } from "@prisma/client";
import { updateRunning } from "@/actions/update/running";
import SubmitButton from "@/components/SubmitButton";

type UpdateRunningFormProps = {
  running?: Running | null;
};

export default function UpdateRunningForm({ running }: UpdateRunningFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(updateRunning, {
    id: running?.id as string,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => router.push("/dashboard/running?order=1"), 1000);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <h2 className="text-xl font-bold mb-3 uppercase">
        Modifier vos course à pied
      </h2>

      {state.success && state.message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {state.message}
        </div>
      )}
      {!state.success && state.message && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {state.message}
        </div>
      )}

      <div>
        <select
          id="mode"
          name="mode"
          defaultValue={running?.mode}
          className="w-full p-2.5 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
        >
          <option value="treadmill">Tapis de course</option>
          <option value="outside">Dehors</option>
        </select>
      </div>

      <div>
        <input
          step="any"
          type="number"
          id="kilometers"
          name="kilometers"
          placeholder="Kilomètres"
          defaultValue={Number(running?.kilometers)}
          className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
        />
      </div>

      <div>
        <input
          type="text"
          id="durations"
          name="durations"
          placeholder="Temps (00:00:00)"
          defaultValue={running?.durations}
          className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
        />
      </div>

      <div>
        <input
          step="any"
          type="number"
          id="calories"
          name="calories"
          placeholder="Calories"
          defaultValue={Number(running?.calories)}
          className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
        />
      </div>

      <div>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={running?.date}
          className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
        />
      </div>

      <SubmitButton isPending={isPending} padding={2} />
    </form>
  );
}
