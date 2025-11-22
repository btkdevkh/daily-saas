"use server";

import { prisma } from "@/lib/prisma";
import { getConnectedUser } from "../auth/user";

export async function getChatais() {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const chatais = await prisma.chatai.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "asc" },
    });

    return {
      message: "ChatAI bot trouvés!",
      chatais,
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
}
