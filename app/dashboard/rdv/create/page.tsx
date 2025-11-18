"use client";

import { use, useState } from "react";
import { createRdv } from "@/actions/create/rdv";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/navigation";
import { getUserById } from "@/actions/get/user";

export default function CreateRdvPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const user = await getUserById(1);

    const data = {
      title: formData.get("title") as string,
      withWhom: formData.get("withWhom") as string,
      date: formData.get("date") as string,
      address: formData.get("address") as string,
      userId: user.user?.id as number,
    };

    const result = await createRdv(data);

    if (result.error) {
      setError(result.error);
      setMessage("");
    } else {
      if (result.message) {
        setMessage(result.message);
        setError("");
      }
      // Reset form
      const form = document.querySelector("form") as HTMLFormElement;
      form.reset();

      router.push("/dashboard/rdv");
    }
  }

  return (
    <PageWrapper>
      <div className="md:w-lg mx-auto w-full p-4 text-black">
        <form action={handleSubmit} className="space-y-4 p-6 rounded-md">
          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <h2 className="text-xl">Créer un Rendez-vous</h2>

          <div>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Chez"
              className="w-full p-3 shadow bg-white rounded-xl outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <div>
            <input
              type="text"
              id="withWhom"
              name="withWhom"
              required
              placeholder="Avec"
              className="w-full p-3 shadow bg-white rounded-xl outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <div>
            <input
              type="datetime-local"
              id="date"
              name="date"
              required
              className="w-full p-3 shadow bg-white rounded-xl outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <div>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Adresse"
              className="w-full p-3 shadow bg-white rounded-xl outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-xl shadow font-bold uppercase cursor-pointer text-white bg-yale-blue hover:bg-stormy-teal focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
          >
            Créer
          </button>
        </form>
      </div>
    </PageWrapper>
  );
}
