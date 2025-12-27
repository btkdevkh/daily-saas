"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getConnectedUser } from "../auth/user";
import { Prisma } from "@prisma/client";

const deleteBankAccount = async (bankAccountId: string) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    await prisma.bankAccount.delete({
      where: {
        id: bankAccountId,
        userId: user.id,
      },
    });

    revalidatePath("/");
    return { success: true, message: "Compte bancaire supprimé" };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { error: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { error: err.message as string };
    } else {
      return { error: "Internal server error" as string };
    }
  }
};

const deleteBankExpense = async (
  bankExpenseId: string,
  bankAccountId: string,
  expense: number
) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    await prisma.$transaction([
      prisma.expense.delete({
        where: {
          id: bankExpenseId,
        },
      }),
      prisma.bankAccount.update({
        where: { id: bankAccountId },
        data: {
          balance: { increment: new Prisma.Decimal(expense) },
        },
      }),
    ]);

    revalidatePath("/");
    return { success: true, message: "Dépense supprimée" };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { error: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { error: err.message as string };
    } else {
      return { error: "Internal server error" as string };
    }
  }
};

const deleteBankIncome = async (
  bankIncomeId: string,
  bankAccountId: string,
  income: number
) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    await prisma.$transaction([
      prisma.income.delete({
        where: {
          id: bankIncomeId,
        },
      }),
      prisma.bankAccount.update({
        where: { id: bankAccountId },
        data: {
          balance: { decrement: new Prisma.Decimal(income) },
        },
      }),
    ]);

    revalidatePath("/");
    return { success: true, message: "Revenu supprimé" };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { error: err.message as string };
    } else if (typeof err === "object" && err !== null && "message" in err) {
      return { error: err.message as string };
    } else {
      return { error: "Internal server error" as string };
    }
  }
};

export { deleteBankAccount, deleteBankExpense, deleteBankIncome };
