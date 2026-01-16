"use client";

import Link from "next/link";
import { UI } from "@/lib/ui-config";
import { IoMdAdd } from "react-icons/io";
import { PiPencilDuotone } from "react-icons/pi";
import { IBankAccount } from "@/types/interfaces/IBankAccount";
import { useModalContext } from "@/context/ModalContext";
import ModalWrapper from "../ModalWrapper";
import CreateBankIncomeForm from "./create/CreateBankIncomeForm";
import { useEffect, useState } from "react";
import CreateBankExpenseForm from "./create/CreateBankExpenseForm";
import ActionButton from "../ActionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  deleteBankAccount,
  deleteBankExpense,
  deleteBankIncome,
} from "@/actions/delete/bank";
import BankChart from "./BankChart";
import BankImportForm from "./BankImportForm";

type BankListProps = {
  bankAccounts: IBankAccount[];
};
const BankList = ({ bankAccounts }: BankListProps) => {
  const { openModal, setOpenModal } = useModalContext();
  const [selectedAccount, setSelectedAccount] = useState<{
    id: string;
    income: boolean;
    expense: boolean;
  }>({
    id: "",
    income: false,
    expense: false,
  });

  useEffect(() => {
    if (!openModal) {
      setSelectedAccount({
        id: "",
        income: false,
        expense: false,
      });
    }
  }, [openModal]);

  return (
    <div
      className={`max-h-full flex-1 grid gap-2 text-graphite overflow-auto`}
      onScroll={UI.indicatorScroll}
    >
      {bankAccounts &&
        bankAccounts.length > 0 &&
        bankAccounts.map((bankAccount) => (
          <div
            key={bankAccount.id}
            className="bg-white p-3 grid gap-3 md:grid-cols-2 md:mr-1 relative shadow rounded"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <small className="bg-amber-400 py-1 px-3 w-fit font-bold rounded-xl">
                      {bankAccount.type === "saving" ? "Épargne" : "Chèque"}
                    </small>
                    <small className="bg-blue-700 text-white py-1 px-3 w-fit font-bold rounded-xl">
                      {bankAccount.label}
                    </small>
                  </div>

                  <div className="flex gap-2">
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

                <div className="flex gap-3 items-center justify-center p-10 bg-light-teal rounded">
                  <span className="text-white text-3xl md:text-4xl font-bold border-b-2 border-white">
                    {bankAccount.balance.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </span>
                </div>
              </div>

              <div
                className={`flex flex-col gap-${
                  bankAccount.incomes?.length === 0 ? "0" : "3"
                }`}
              >
                {/* Revenues */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h2 className="w-20 text-center bg-green-700 text-white py-1 px-2 text-xs font-semibold rounded-xl">
                      {bankAccount.incomes && bankAccount.incomes.length > 0
                        ? "Revenus"
                        : "0 Revenu"}
                    </h2>

                    <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] flex justify-center items-center rounded-xl py-0.5 px-2 transition">
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

                  <div className="max-h-[30svh] flex flex-col gap-1 overflow-auto">
                    {bankAccount.incomes &&
                      bankAccount.incomes.length > 0 &&
                      bankAccount.incomes.map((income) => (
                        <div
                          key={income.id}
                          className="relative flex flex-col gap-0.5 bg-green-50 p-2 rounded"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold">
                              {formatDateFR(income.createdAt)}
                            </span>
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

                          <div className="flex gap-3">
                            <span className="font-bold text-green-700">
                              +{" "}
                              {income.income.toLocaleString("fr-FR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              €
                            </span>
                            <span>{income.object}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Expenses */}
                <div
                  className={`flex flex-col gap-${
                    bankAccount.expenses?.length === 0 ? "0" : "2"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="w-20 text-center bg-red-700 text-white py-1 px-2 text-xs font-semibold rounded-xl">
                      {bankAccount.expenses && bankAccount.expenses.length > 0
                        ? "Dépenses"
                        : "0 Dépense"}
                    </h2>

                    <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] flex justify-center items-center rounded-xl py-0.5 px-2 transition">
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

                  <div className="max-h-[30svh] flex flex-col gap-1 overflow-auto">
                    {bankAccount.expenses &&
                      bankAccount.expenses.length > 0 &&
                      bankAccount.expenses.map((expense) => (
                        <div key={expense.id} className="bg-red-50 p-2 rounded">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold">
                              {formatDateFR(expense.createdAt)}
                            </span>
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

                          <div className="flex gap-3">
                            <span className="font-bold text-red-700">
                              -{" "}
                              {expense.expense.toLocaleString("fr-FR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              €
                            </span>
                            <span>{expense.object}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-teal-50 md:block rounded pt-3 overflow-auto">
              <BankChart bankAccount={bankAccount} />
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

      {/* Modal */}
      {!selectedAccount.id && (
        <ModalWrapper>
          <BankImportForm bankAccounts={bankAccounts ?? []} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default BankList;

function formatDateFR(date: Date) {
  const formatted = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Paris",
  });

  return (
    formatted.charAt(0).toUpperCase() + formatted.slice(1).replace(".", "")
  );
}
