"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { createBankExpense } from "@/actions/post/bank";
import { IBankAccount } from "@/types/interfaces/IBankAccount";
import { useModalContext } from "@/context/ModalContext";

const CreateBankExpenseForm = ({
  bankAccount,
}: {
  bankAccount: IBankAccount;
}) => {
  const router = useRouter();
  const { setOpenModal } = useModalContext();

  const [state, formAction, isPending] = useActionState(createBankExpense, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => router.push("/dashboard/bank"), 1000);
      setOpenModal(false);
    }
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 bg-dust-grey p-5 rounded ml-12.5"
    >
      <h2 className="text-center font-bold mb-3 uppercase">
        Ajouter une dépense
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

      <div className="flex gap-2">
        <small className="bg-amber-400 py-1 px-3 w-fit font-bold rounded-xl">
          {bankAccount.type === "saving" ? "Épargne" : "Chèque"}
        </small>
        <small className="bg-blue-700 text-white py-1 px-3 w-fit font-bold rounded-xl">
          {bankAccount.label}
        </small>
      </div>

      <div>
        <input
          type="text"
          id="object"
          name="object"
          placeholder="Objet *"
          className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
        />
      </div>
      <div>
        <input
          type="number"
          id="expense"
          name="expense"
          placeholder="Dépense *"
          className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
          step="any"
        />
      </div>
      <input type="hidden" id="id" name="id" value={bankAccount.id} />

      <SubmitButton isPending={isPending} padding={2} />
    </form>
  );
};

export default CreateBankExpenseForm;
