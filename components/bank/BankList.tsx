"use client";

import Link from "next/link";
import { UI } from "@/lib/ui-config";
import { PiPencilDuotone } from "react-icons/pi";
import { IBankAccount } from "@/types/interfaces/IBankAccount";

type BankListProps = {
  bankAccounts: IBankAccount[];
};
const BankList = ({ bankAccounts }: BankListProps) => {
  console.log(bankAccounts);

  return (
    <div
      className={`max-h-full h-full grid md:grid-cols-2 lg:grid-cols-2 gap-1 text-graphite overflow-auto`}
      onScroll={UI.indicatorScroll}
    >
      {bankAccounts &&
        bankAccounts.length > 0 &&
        bankAccounts.map((bankAccount) => (
          <div
            key={bankAccount.id}
            className="bg-white shadow p-3 relative rounded"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <small className="bg-amber-400 py-1 px-2 w-fit font-bold rounded-xl">
                    {bankAccount.type === "saving" ? "Épargne" : "Chèque"}
                  </small>
                  <small className="bg-blue-700 text-white py-1 px-2 w-fit font-bold rounded-xl">
                    {bankAccount.label}
                  </small>
                </div>
                <hr />

                <div className="flex gap-3 items-center justify-center p-6 bg-light-teal rounded">
                  <span className="text-white text-3xl font-bold border-b-2 border-white">
                    {bankAccount.balance.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </span>
                  <span className="w-fit font-semibold uppercase text-xs self-end">
                    Balance
                  </span>
                </div>

                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                    <Link href={`/dashboard/bank/update/${bankAccount.id}`}>
                      <PiPencilDuotone size={20} color="orange" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Expenses */}
              <div>
                <h2 className="uppercase border-b-2 border-stormy-teal w-fit font-semibold">
                  Dépenses
                </h2>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BankList;
