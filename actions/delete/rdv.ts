"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRdv(rdvId: string) {
  try {
    const rdv = await prisma.rdv.delete({
      where: {
        id: rdvId,
      },
    });

    revalidatePath("/");
    return { message: "RDV deleted successfully", rdv };
  } catch (error) {
    return { error: "Failed to deleted RDV" };
  }
}
