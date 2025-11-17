"use client";

import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/create/user";

export default function CreateUserPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const data = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
    };

    const result = await createUser(data);

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

      router.push("/dashboard/user");
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

          <h2 className="text-xl">Créer un utilisateur</h2>

          <div>
            <input
              type="text"
              id="firstname"
              name="firstname"
              required
              placeholder="Prénom"
              className="w-full p-3 shadow bg-white rounded-xl outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <div>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              placeholder="Nom"
              className="w-full p-3 shadow bg-white rounded-xl outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
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
