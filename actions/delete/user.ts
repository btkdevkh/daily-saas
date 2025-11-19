"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/");
    return { message: "User deleted successfully", user };
  } catch (error) {
    return { error: "Failed to deleted User" };
  }
}
