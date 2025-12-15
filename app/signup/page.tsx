import Image from "next/image";
import CreateUserFormExternal from "@/components/user/create/CreateUserFormExternal";

export default function SignupPage() {
  return (
    <div className="w-full text-graphite">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/logo.png"
            width={150}
            height={150}
            alt="logo"
            loading="eager"
          />

          <h2 className="text-3xl font-bold uppercase text-center">
            Daily SaaS
          </h2>
        </div>

        <br />

        <CreateUserFormExternal />
      </div>
    </div>
  );
}
