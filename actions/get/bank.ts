"use server";

import { prisma } from "@/lib/prisma";
import { getConnectedUser } from "../auth/user";

const getBankAccounts = async () => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const bankAccounts = await prisma.bankAccount.findMany({
      where: {
        userId: user.id,
      },
      include: {
        incomes: true,
        expenses: true,
      },
    });

    return {
      success: true,
      message: "Comptes bancaires trouvés",
      bankAccounts,
    };
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

export { getBankAccounts };
