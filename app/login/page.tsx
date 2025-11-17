"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateRdvPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Champs obligatoires");
      setMessage("");
      return;
    }

    const data = {
      title: email,
      withWhom: password,
    };

    router.push("/dashboard");
  }

  return (
    <div className="w-full md:w-lg mx-auto p-4 text-graphite">
      <div className="flex flex-col gap-5">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="logo"
            loading="eager"
          />
        </div>

        <h2 className="text-xl font-bold uppercase text-center">
          S'identifier
        </h2>

        <form action={handleSubmit} className="flex flex-col gap-3 p-6">
          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 shadow bg-white rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              className="w-full p-3 shadow bg-white rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 p-3 rounded shadow font-bold uppercase cursor-pointer text-white bg-yale-blue hover:bg-stormy-teal focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
          >
            S'identifier
          </button>
        </form>

        <Link href="#" className="block text-center">
          Mot de passe oublié ?
        </Link>
      </div>
    </div>
  );
}
