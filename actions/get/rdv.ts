import { prisma } from "@/lib/prisma";
import { getConnectedUser } from "../auth/user";

export async function getRdvs() {
  try {
    const { user } = await getConnectedUser();

    const rdvs = await prisma.rdv.findMany({
      where: {
        userId: user?.id,
      },
    });

    return { message: "Rdvs trouvés avec success", rdvs };
  } catch (error) {
    return { error: "Une erreur s'est produit." };
  }
}
