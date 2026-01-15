"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getConnectedUser } from "../auth/user";
import { PrevState } from "@/types/PrevState";
import { BankAccount, Expense, Income, Prisma } from "@prisma/client";
import { getBankAccounts } from "../get/bank";
import { parseCSVLine, stripQuotes } from "@/utils/utils";
import { IBankAccount } from "@/types/interfaces/IBankAccount";

const createBankAccount = async (prevState: PrevState, formData: FormData) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const type = formData.get("type") as string;
    const label = formData.get("label") as string;
    const balance = formData.get("balance") as string;

    if (!type || !balance) {
      throw new Error("Champs obligatoires");
    }

    await prisma.bankAccount.create({
      data: {
        type,
        label,
        balance: new Prisma.Decimal(Number(balance)), // Euro (FR)
        userId: user.id,
      },
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Compte bancaire crée",
    };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { ...prevState, success: false, message: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { ...prevState, success: false, message: err.message as string };
    } else {
      return {
        ...prevState,
        success: false,
        message: "Internal server error" as string,
      };
    }
  }
};

const createBankExpense = async (prevState: PrevState, formData: FormData) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const expense = formData.get("expense") as string;
    const object = formData.get("object") as string;
    const bankAccountId = formData.get("id") as string;

    if (!expense || !object || !bankAccountId) {
      throw new Error("Champs obligatoires");
    }

    await prisma.$transaction([
      prisma.expense.create({
        data: {
          expense: new Prisma.Decimal(Number(expense)), // Euro (FR)
          object,
          bankAccountId,
        },
      }),
      prisma.bankAccount.update({
        where: { id: bankAccountId },
        data: {
          balance: { decrement: new Prisma.Decimal(expense) },
        },
      }),
    ]);

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Dépense créee",
    };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { ...prevState, success: false, message: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { ...prevState, success: false, message: err.message as string };
    } else {
      return {
        ...prevState,
        success: false,
        message: "Internal server error" as string,
      };
    }
  }
};

const createBankIncome = async (prevState: PrevState, formData: FormData) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const income = formData.get("income") as string;
    const object = formData.get("object") as string;
    const bankAccountId = formData.get("id") as string;

    if (!income || !object || !bankAccountId) {
      throw new Error("Champs obligatoires");
    }

    await prisma.$transaction([
      prisma.income.create({
        data: {
          income: new Prisma.Decimal(Number(income)), // Euro (FR)
          object,
          bankAccountId,
        },
      }),
      prisma.bankAccount.update({
        where: { id: bankAccountId },
        data: {
          balance: { increment: new Prisma.Decimal(income) },
        },
      }),
    ]);

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Revenu crée",
    };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { ...prevState, success: false, message: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { ...prevState, success: false, message: err.message as string };
    } else {
      return {
        ...prevState,
        success: false,
        message: "Internal server error" as string,
      };
    }
  }
};

const createImportBankAccount = async (
  prevState: PrevState,
  formData: FormData
) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const importFile = formData.get("import-file") as File;

    if (importFile.size === 0) {
      throw new Error("Champ obligatoire");
    }

    const text = await importFile.text();
    const rows = text.split("\n");
    const headers = rows[0].split(",");

    const JSON_COLUMNS = ["incomes", "expenses"];

    const dataCSV = rows.slice(1).map((row) => {
      const values = parseCSVLine(row) as string[];

      return Object.fromEntries(
        headers.map((h, i) => {
          const raw = values[i]?.trim();
          const value = stripQuotes(raw) as string;

          if (JSON_COLUMNS.includes(h)) {
            try {
              return [h, JSON.parse(value)];
            } catch {
              return [h, value];
            }
          }

          return [h, value];
        })
      );
    });

    console.log("dataCSV", dataCSV);

    const data = await getBankAccounts();

    const filteredData = (dataCSV as IBankAccount[])
      .filter(
        (datum) => !data.bankAccounts?.some((bank) => bank.id === datum.id)
      )
      .map((b) => ({
        ...b,
        id: b.id,
        type: b.type,
        label: b.type,
        balance: new Prisma.Decimal(Number(b.balance)), // Euro (FR)
        createdAt: new Date(b.createdAt),
        userId: b.userId,
      }));

    if (filteredData.length === 0) {
      throw new Error(
        "Toutes les données existent déja dans la base de donnée"
      );
    }

    const banks = filteredData.map((datum) => ({
      id: datum.id,
      type: datum.type,
      label: datum.type,
      balance: new Prisma.Decimal(Number(datum.balance)), // Euro (FR)
      createdAt: new Date(datum.createdAt),
      userId: datum.userId,
    })) as BankAccount[];

    const incomes = filteredData.flatMap((datum) =>
      datum.incomes?.map((ic) => ({
        ...ic,
        income: new Prisma.Decimal(Number(ic.income)),
        createdAt: new Date(ic.createdAt),
      }))
    ) as Income[];

    const expenses = filteredData.flatMap((datum) =>
      datum.expenses?.map((exp) => ({
        ...exp,
        expense: new Prisma.Decimal(Number(exp.expense)),
        createdAt: new Date(exp.createdAt),
      }))
    ) as Expense[];

    await prisma.bankAccount.createMany({
      data: banks,
    });

    await prisma.income.createMany({
      data: incomes,
    });

    await prisma.expense.createMany({
      data: expenses,
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Comptes bancaires importés",
    };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { ...prevState, success: false, message: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { ...prevState, success: false, message: err.message as string };
    } else {
      return {
        ...prevState,
        success: false,
        message: "Internal server error" as string,
      };
    }
  }
};

export {
  createBankAccount,
  createBankExpense,
  createBankIncome,
  createImportBankAccount,
};

// await prisma.expense.create({
//   data: {
//     expense: new Prisma.Decimal(Number(expense)), // Euro (FR)
//     bankAccountId,
//   },
// });
// await prisma.bankAccount.update({
//   where: { id: bankAccountId },
//   data: {
//     balance: {
//       decrement: new Prisma.Decimal(Number(expense)), // Euro (FR)
//     },
//   },
// });
