"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import { createImportUser } from "@/actions/post/user";
import { useModalContext } from "@/context/ModalContext";
import { notify } from "@/lib/notification";
import { getUsers } from "@/actions/get/user";
import { User } from "@prisma/client";
import { stripQuotes } from "@/utils/utils";

const UserImportForm = () => {
  const { setOpenModal } = useModalContext();
  const [importUsers, setImprtUsers] = useState<User[]>([]);

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

  // ici, j'ai besoin de l'intération dans le UI,
  // sinon ce code ne doit pas être implémenter,
  // à commenter si vous n'avez pas besoin de l'intéraction
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileTaken = e.target.files[0];

      const text = await fileTaken.text();
      const rows = text.split("\n");
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return Object.fromEntries(
          headers.map((h, i) => [h.trim(), stripQuotes(values[i]?.trim())])
        );
      });

      const users = await getUsers();
      const filteredData = (data as User[])
        .filter((datum) => !users.users?.some((user) => user.id === datum.id))
        .map((u) => ({
          id: u.id,
          firstname: u.firstname,
          lastname: u.lastname,
          email: u.email,
          password: u.password,
          role: u.role,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt),
        })) as User[];

      setImprtUsers(filteredData);
    }
  };

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

        <div className="flex flex-col gap-1">
          <input
            type="file"
            id="import-file"
            name="import-file"
            placeholder="Confirmer le mot de passe *"
            className="w-full p-3 shadow bg-white rounded outline-none focus:border-2 border-stormy-teal"
            onChange={handleChangeFile}
          />

          {/* Sup. intéraction UI */}
          {importUsers.length > 0 && (
            <div className="text-left text-[0.8rem] font-semibold italic text-green-700">
              <b>{importUsers.length}</b> utilisateurs seront importés.{" "}
            </div>
          )}
        </div>

        <SubmitButton isPending={isPending} />
      </form>
    </div>
  );
};

export default UserImportForm;
