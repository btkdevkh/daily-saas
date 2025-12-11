"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../../actions/auth/user";
import { signIn } from "next-auth/react";
import SubmitButton from "../SubmitButton";
import { IoMdSend } from "react-icons/io";

export default function LoginForm() {
  const router = useRouter();
  const [loginWithPassword, setLoginWithPassword] = useState(false);
  const [code, setCode] = useState("");
  const [openModal, setOpenModal] = useState(true);

  const [state, formAction, isPending] = useActionState(loginUser, {
    success: false,
    message: "",
    email: "",
    password: "",
    code: "",
    mode: "",
  });

  useEffect(() => {
    if (code) {
      state.code = code;
    }
  }, [code]);

  useEffect(() => {
    if (state.success && state.message) {
      // Signin NextAuth
      signIn("credentials", {
        email: state.email,
        password: state.password,
        redirect: false,
      });

      setTimeout(() => router.push("/"), 1000);
    }
  }, [state]);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-3">
        <h2 className="text-xl font-bold uppercase text-center mb-3">
          Identification
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
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email *"
            className="w-full p-3 shadow bg-white rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
          />
        </div>

        {!loginWithPassword && (
          <div className="flex justify-between">
            <span className="text-left text-xs">Un code vous sera envoyé</span>

            <button
              className="text-blue-700 underline text-left text-xs cursor-pointer"
              onClick={() => setLoginWithPassword(true)}
            >
              S'identifier par le mot de passe
            </button>
          </div>
        )}

        {loginWithPassword && (
          <>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe *"
                className="w-full p-3 shadow bg-white rounded outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stormy-teal"
              />
            </div>

            <button
              type="button"
              className="text-blue-700 text-left text-xs cursor-pointer"
              onClick={() => setLoginWithPassword(false)}
            >
              S'identifier par un code unique
            </button>
          </>
        )}

        <SubmitButton isPending={isPending} title="S'identifier" />

        <div className="flex justify-between items-center">
          <Link
            href="/signup"
            className="text-blue-700 underline text-left text-xs"
          >
            S'inscrire ?
          </Link>

          <Link href="/forgetpass" className="text-blue-700 underline text-xs">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Code modal */}
        {openModal && !state.success && state.mode === "code" && (
          <div
            className="bg-[rgba(0,0,0,0.7)] absolute top-0 left-0 bottom-0 right-0 px-8 flex items-center modal"
            onClick={(e) => {
              if ((e.target as HTMLDivElement).classList.contains("modal")) {
                setOpenModal((prev) => !prev);
              }
            }}
          >
            <div className="bg-white w-[345px] flex flex-col gap-1.5 p-3 rounded">
              <div className="flex justify-between gap-1">
                <input
                  type="text"
                  value={code}
                  placeholder="Code unique"
                  className="w-full p-3 shadow bg-white outline-graphite rounded"
                  onChange={(e) => setCode(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-blue-700 px-3 rounded cursor-pointer"
                >
                  <IoMdSend color="white" size={25} />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-0.5">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <span
                    key={num}
                    onClick={() => {
                      if (code.length >= 6) return;
                      setCode((prev) => prev + num);
                    }}
                    className="h-15 border-2 border-graphite flex items-center justify-center cursor-pointer font-semibold hover:bg-graphite hover:text-white transition shadow text-xl"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
