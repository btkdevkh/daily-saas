"use client";

import Link from "next/link";
import { UI } from "@/lib/ui-config";
import { IoMdAdd } from "react-icons/io";
import { PiPencilDuotone } from "react-icons/pi";
import { IBankAccount } from "@/types/interfaces/IBankAccount";
import { useModalContext } from "@/context/ModalContext";
import ModalWrapper from "../ModalWrapper";
import CreateBankIncomeForm from "./create/CreateBankIncomeForm";
import { useState } from "react";
import CreateBankExpenseForm from "./create/CreateBankExpenseForm";
import ActionButton from "../ActionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteBankAccount,
  deleteBankExpense,
  deleteBankIncome,
} from "@/actions/delete/bank";

type BankListProps = {
  bankAccounts: IBankAccount[];
};
const BankList = ({ bankAccounts }: BankListProps) => {
  const { setOpenModal } = useModalContext();
  const [selectedAccount, setSelectedAccount] = useState<{
    id: string;
    income: boolean;
    expense: boolean;
  }>({
    id: "",
    income: false,
    expense: false,
  });

  return (
    <div
      className={`max-h-full h-full flex-1 grid gap-1 text-graphite overflow-auto`}
      onScroll={UI.indicatorScroll}
    >
      {bankAccounts &&
        bankAccounts.length > 0 &&
        bankAccounts.map((bankAccount, idx) => (
          <div
            key={bankAccount.id}
            className="bg-white shadow p-3 relative rounded mr-1"
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
                  <span className="text-white text-2xl md:text-3xl font-bold border-b-2 border-white">
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

                <div className="absolute top-2 right-3 flex gap-2">
                  <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                    <Link href={`/dashboard/bank/update/${bankAccount.id}`}>
                      <PiPencilDuotone size={20} color="orange" />
                    </Link>
                  </div>

                  <ActionButton
                    id={bankAccount.id}
                    handler={deleteBankAccount as (id?: string) => void}
                  >
                    <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                      <RiDeleteBin6Line size={20} color="crimson" />
                    </div>
                  </ActionButton>
                </div>
              </div>

              {/* Revenues */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  {bankAccount.incomes && bankAccount.incomes.length > 0 ? (
                    <h2 className="w-18 bg-green-700 text-white py-1 px-2 text-xs font-semibold rounded-xl">
                      Revenus
                    </h2>
                  ) : (
                    <h2 className="w-20 bg-amber-400 py-1 px-2 text-xs font-semibold rounded-xl">
                      0 Revenu
                    </h2>
                  )}

                  <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] flex justify-center items-center rounded-full p-2 transition">
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedAccount((prev) => ({
                          ...prev,
                          id: bankAccount.id,
                          income: true,
                          expense: false,
                        }));
                      }}
                    >
                      <IoMdAdd size={20} />
                    </button>
                  </div>
                </div>
                <hr />

                {bankAccount.incomes &&
                  bankAccount.incomes.length > 0 &&
                  bankAccount.incomes.map((income) => (
                    <div
                      key={income.id}
                      className="relative flex items-center justify-between bg-dust-grey p-2 rounded"
                    >
                      <div className="flex gap-3">
                        <span className="font-bold text-green-700">
                          +{income.income.toFixed(2)}€
                        </span>
                        <span>{income.object}</span>
                      </div>

                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          if (confirm("Souhaitez-vous continuer ?")) {
                            deleteBankIncome(
                              income.id,
                              bankAccount.id,
                              income.income
                            );
                          }
                        }}
                      >
                        <div className="rounded-full transition">
                          <RiDeleteBin6Line size={15} color="crimson" />
                        </div>
                      </button>
                    </div>
                  ))}
              </div>

              {/* Expenses */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  {bankAccount.expenses && bankAccount.expenses.length > 0 ? (
                    <h2 className="w-18 bg-red-700 text-white py-1 px-2 text-xs font-semibold rounded-xl">
                      Dépenses
                    </h2>
                  ) : (
                    <h2 className="w-20 bg-amber-400 py-1 px-2 text-xs font-semibold rounded-xl">
                      0 Dépense
                    </h2>
                  )}

                  <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] flex justify-center items-center rounded-full p-2 transition">
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedAccount((prev) => ({
                          ...prev,
                          id: bankAccount.id,
                          income: false,
                          expense: true,
                        }));
                      }}
                    >
                      <IoMdAdd size={20} />
                    </button>
                  </div>
                </div>
                <hr />

                {bankAccount.expenses &&
                  bankAccount.expenses.length > 0 &&
                  bankAccount.expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="relative flex items-center justify-between bg-dust-grey p-2 rounded"
                    >
                      <div className="flex gap-3">
                        <span className="font-bold text-red-700">
                          -{expense.expense.toFixed(2)}€
                        </span>
                        <span>{expense.object}</span>
                      </div>

                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          if (confirm("Souhaitez-vous continuer ?")) {
                            deleteBankExpense(
                              expense.id,
                              bankAccount.id,
                              expense.expense
                            );
                          }
                        }}
                      >
                        <div className="rounded-full transition">
                          <RiDeleteBin6Line size={15} color="crimson" />
                        </div>
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Modal */}
            {bankAccount.id === selectedAccount.id &&
              selectedAccount.income && (
                <ModalWrapper>
                  <CreateBankIncomeForm bankAccount={bankAccount} />
                </ModalWrapper>
              )}

            {bankAccount.id === selectedAccount.id &&
              selectedAccount.expense && (
                <ModalWrapper>
                  <CreateBankExpenseForm bankAccount={bankAccount} />
                </ModalWrapper>
              )}
          </div>
        ))}
    </div>
  );
};

export default BankList;
