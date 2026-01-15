"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import { useModalContext } from "@/context/ModalContext";
import { notify } from "@/lib/notification";
import { Running } from "@prisma/client";
import { parseCSVLine, stripQuotes } from "@/utils/utils";
import { IBankAccount } from "@/types/interfaces/IBankAccount";
import { createImportBankAccount } from "@/actions/post/bank";

type BankImportFormProps = {
  bankAccounts: IBankAccount[];
};

const BankImportForm = ({ bankAccounts }: BankImportFormProps) => {
  const { setOpenModal } = useModalContext();

  // UI interaction
  const [dataImport, setDataImport] = useState<Running[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [state, formAction, isPending] = useActionState(
    createImportBankAccount,
    {
      success: false,
      message: "",
    }
  );

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
      setFile(fileTaken);

      const text = await fileTaken.text();
      const rows = text.split("\n");
      const headers = rows[0].split(",");

      const JSON_COLUMNS = ["incomes", "expenses"];

      const dataCSV = rows.slice(1).map((row) => {
        const values = parseCSVLine(row) as string[];

        return Object.fromEntries(
          headers.map((h, i) => {
            const raw = values[i]?.trim();
            const value = stripQuotes(raw) as string;

            if (JSON_COLUMNS.includes(h)) {
              try {
                return [h, JSON.parse(value)];
              } catch {
                return [h, value];
              }
            }

            return [h, value];
          })
        );
      });

      const filteredData = (dataCSV as Running[]).filter(
        (datum) => !bankAccounts.some((bank) => bank.id === datum.id)
      );
      setDataImport(filteredData);
    }
  };

  return (
    <div className="min-w-[320px] max-w-[500px] bg-dust-grey p-5 text-graphite text-center rounded">
      <form action={formAction} className="flex flex-col gap-3">
        <h2 className="text-lg font-bold uppercase">
          Importer des comptes bancaires
        </h2>
        <p className="text-xs font-semibold">
          ⚠️ Cette fonctionalité n'est utils que si vous voulez importer des
          onnées sauvegardés depuis un fichier de type CSV. Dans le cas
          contraire, veuillez utiliser plutôt celle depuis le formulaire.
        </p>

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

        <div className="flex flex-col gap-1">
          <input
            type="file"
            id="import-file"
            name="import-file"
            className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
            onChange={handleChangeFile}
          />

          {/* Sup. intéraction UI */}
          {dataImport.length > 0 && (
            <div className="text-left text-[0.8rem] font-semibold italic text-green-700">
              {dataImport.length === 1
                ? "1 compte bancaire sera importé."
                : `${dataImport.length} comptes bancaires seront importés.`}
            </div>
          )}

          {dataImport.length === 0 && file && (
            <div className="text-left text-[0.8rem] font-semibold italic text-red-700">
              Toutes les données dans le CSV existent déja dans la base de
              donnée.
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={isPending}
            className="w-full mt-3 p-2 rounded shadow font-bold cursor-pointer text-white bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal uppercase flex justify-center items-center"
            onClick={() => setOpenModal(false)}
          >
            Annuler
          </button>

          <SubmitButton isPending={isPending} title="Importer" padding={2} />
        </div>
      </form>
    </div>
  );
};

export default BankImportForm;
