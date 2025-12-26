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

export { createBankAccount };
