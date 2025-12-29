"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { forgetPassword } from "@/actions/auth/user";
import SubmitButton from "../SubmitButton";

export default function ForgetPassForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(forgetPassword, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => router.push("/login"), 1000);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-3">
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
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email *"
          className="w-full p-2 bg-white outline-0 focus:border-2 border-stormy-teal shadow rounded"
        />
      </div>
      <SubmitButton
        isPending={isPending}
        title="Réinitialisation"
        padding={2}
      />

      <div className="flex justify-between items-center">
        <Link
          href="/login"
          className="text-blue-700 underline text-left text-xs"
        >
          Retour
        </Link>
      </div>
    </form>
  );
}
