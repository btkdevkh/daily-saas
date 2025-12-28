"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { updateBankAccount } from "@/actions/update/bank";
import { IBankAccount } from "@/types/interfaces/IBankAccount";

type UpdateBankAccountFormProps = {
  bankAccount?: IBankAccount;
};

const UpdateBankAccountForm = ({ bankAccount }: UpdateBankAccountFormProps) => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(updateBankAccount, {
    id: bankAccount?.id ?? "",
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => router.push("/dashboard/bank"), 1000);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <h2 className="text-xl font-bold mb-3 uppercase">
        Modifier un compte bancaire
      </h2>

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
        <select
          id="type"
          name="type"
          defaultValue={bankAccount?.type}
          className="w-full p-3 shadow bg-white rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
        >
          <option value="saving">Épargne</option>
          <option value="current">Chèque</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          id="label"
          name="label"
          placeholder="Label *"
          defaultValue={bankAccount?.label}
          className="w-full p-3 shadow bg-white rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
        />
      </div>

      <div>
        <input
          type="number"
          id="balance"
          name="balance"
          placeholder="Solde *"
          defaultValue={bankAccount?.balance}
          className="w-full p-3 shadow bg-white rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
        />
      </div>

      <SubmitButton isPending={isPending} />
    </form>
  );
};

export default UpdateBankAccountForm;
