"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getConnectedUser } from "../auth/user";
import { PrevState } from "@/types/PrevState";
import { Prisma } from "@prisma/client";

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

export { createBankAccount, createBankExpense, createBankIncome };

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
