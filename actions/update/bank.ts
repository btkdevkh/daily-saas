"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getConnectedUser } from "../auth/user";
import { UpdatePrevState } from "@/types/UpdatePrevState";
import { Prisma } from "@prisma/client";

export async function updateBankAccount(
  prevState: UpdatePrevState,
  formData: FormData
) {
  try {
    const type = formData.get("type") as string;
    const label = formData.get("label") as string;
    const balance = formData.get("balance") as string;

    if (!type || !label || !balance) {
      throw new Error("Champs obligatoires");
    }

    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    if (!prevState.id) {
      throw new Error("Identifiant manquant");
    }

    await prisma.bankAccount.update({
      where: {
        id: prevState.id,
      },
      data: {
        type,
        label,
        balance: new Prisma.Decimal(Number(balance)),
      },
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Compte bancaire modifié",
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
}
