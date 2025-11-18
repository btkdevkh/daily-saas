import { prisma } from "@/lib/prisma";

export async function getRdvs() {
  try {
    const rdvs = await prisma.rdv.findMany();

    return { message: "Rdvs trouvés avec success", rdvs };
  } catch (error) {
    return { error: "Une erreur s'est produit." };
  }
}
