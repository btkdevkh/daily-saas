"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../../actions/auth/user";
import { signIn } from "next-auth/react";
import SubmitButton from "../SubmitButton";
import { IoMdSend } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

export default function LoginForm() {
  const router = useRouter();
  const [loginWithPassword, setLoginWithPassword] = useState(false);
  const [code, setCode] = useState("");
  const [openModal, setOpenModal] = useState(true);
  const [numbers] = useState(() => {
    const arr = Array.from({ length: 10 }, (_, i) => i);

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  });

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
    } else {
      state.code = "";
    }
  }, [code]);

  useEffect(() => {
    if (state.success && state.message) {
      // Signin NextAuth with MODE
      if (state.mode === "password") {
        signIn("password-login", {
          email: state.email,
          password: state.password,
          redirect: false,
        });
      } else {
        signIn("otp-login", {
          email: state.email,
          code: state.code,
          redirect: false,
        });
      }

      setTimeout(() => router.push("/"), 1000);
      setOpenModal(false);
    }
  }, [state]);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-3">
        <h2 className="text-xl font-bold uppercase text-center mb-3">
          Identification
        </h2>

        {state.success && state.message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {state.message}
          </div>
        )}

        {!state.success && state.message && state.mode !== "code" && (
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
            className="w-full p-2 bg-white outline-stormy-teal shadow rounded"
          />
        </div>

        {!loginWithPassword && (
          <div className="flex justify-between">
            <button
              className="text-blue-700 underline text-left text-xs cursor-pointer"
              onClick={() => setLoginWithPassword(true)}
            >
              S'identifier par le mot de passe ?
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
                className="w-full p-2 bg-white outline-stormy-teal shadow rounded"
              />
            </div>

            <button
              type="button"
              className="text-blue-700 underline text-left text-xs cursor-pointer"
              onClick={() => setLoginWithPassword(false)}
            >
              S'identifier par un code unique ?
            </button>
          </>
        )}

        <SubmitButton isPending={isPending} title="S'identifier" padding={2} />

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
          <div className="bg-[rgba(0,0,0,0.7)] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center p-8">
            <div className="bg-white md:w-full w-[436px] mx-auto md:mx-0 flex flex-col gap-1.5 p-3 rounded shadow">
              <div className="flex justify-between gap-1">
                <div className="w-full relative">
                  <input
                    type="text"
                    name="code"
                    value={code}
                    placeholder="Code unique"
                    className="w-full p-3 shadow bg-white outline-graphite rounded"
                    onChange={(e) => setCode(e.target.value)}
                  />

                  {code && (
                    <button
                      className="absolute top-3 right-2 cursor-pointer"
                      onClick={() => setCode("")}
                    >
                      <TiDelete size={25} />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-700 px-3 rounded cursor-pointer"
                >
                  <IoMdSend color="white" size={25} />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-0.5">
                {numbers.map((num) => (
                  <span
                    key={num}
                    onClick={(e) => {
                      e.preventDefault();
                      if (code.length >= 6) return;
                      setCode((prev) => prev + num);
                    }}
                    className="h-15 border-2 border-graphite flex items-center justify-center cursor-pointer font-semibold hover:bg-graphite hover:text-white transition shadow text-xl"
                  >
                    {num}
                  </span>
                ))}
              </div>

              {!state.success && state.message && (
                <>
                  <div className="bg-red-100 text-red-700 p-2 rounded">
                    {state.message}
                  </div>
                  <button
                    className="text-blue-700 underline text-right text-xs cursor-pointer"
                    onClick={() => setOpenModal(false)}
                  >
                    Redemandez-en !
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
}
