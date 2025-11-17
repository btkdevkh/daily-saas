"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();

    return { message: "Utilisateurs trouvés avec success", users };
  } catch (error) {
    return { error: "Une erreur s'est produit." };
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return { message: "Utilisateur trouvé avec success", user };
  } catch (error) {
    return { error: "Une erreur s'est produit." };
  }
}
