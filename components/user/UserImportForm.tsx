"use client";

import { useActionState, useEffect } from "react";
import SubmitButton from "../SubmitButton";
import { createImportUser } from "@/actions/post/user";
import { useModalContext } from "@/context/ModalContext";
import { notify } from "@/lib/notification";

const UserImportForm = () => {
  const { setOpenModal } = useModalContext();

  const [state, formAction, isPending] = useActionState(createImportUser, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => setOpenModal(false), 1000);
      notify(true, state.message, "import-success");
    }
  }, [state.success]);

  return (
    <div className="min-w-[320px] max-w-[500px] bg-dust-grey p-5 text-graphite text-center rounded">
      <form action={formAction} className="flex flex-col gap-3">
        <h2 className="text-lg font-bold uppercase">
          Importer des utilisateurs
        </h2>
        <p className="text-xs font-semibold">
          ⚠️ Cette fonctionalité n'est utils que si vous voulez importer des
          utilisateurs sauvegardés depuis un fichier de type CSV. Dans le cas
          contraire, veuillez utiliser plutôt celle depuis le formulaire.
        </p>

        {state.success && state.message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {state.message}
          </div>
        )}
        {!state.success && state.message && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {state.message}
          </div>
        )}

        <div>
          <input
            type="file"
            id="import-file"
            name="import-file"
            placeholder="Confirmer le mot de passe *"
            className="w-full p-3 shadow bg-white rounded outline-none focus:border-2 border-stormy-teal"
          />
        </div>

        <SubmitButton isPending={isPending} />
      </form>
    </div>
  );
};

export default UserImportForm;
