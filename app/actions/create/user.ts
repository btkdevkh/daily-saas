"use server";

import { prisma } from "@/lib/prisma";
import { IUser } from "@/types/interfaces/IUser";
import { revalidatePath } from "next/cache";

export async function createUser(data: IUser) {
  try {
    const user = await prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
    });

    revalidatePath("/");
    return { message: "Utilisateur créé avec success", user };
  } catch (error) {
    return { error: "Une erreur s'est produit." };
  }
}
