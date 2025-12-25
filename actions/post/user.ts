"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getUsers } from "../get/user";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { PrevState } from "@/types/PrevState";
import { stripQuotes } from "@/utils/utils";

const createUser = async (prevState: PrevState, formData: FormData) => {
  try {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const role = formData.get("role") as string;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      throw new Error("Champs obligatoires");
    }

    if (password !== confirmPassword) {
      throw new Error("Les mots de passe ne sont pas identiques");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: role ?? "User",
      },
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Utilisateur crée",
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

const createImportUser = async (prevState: PrevState, formData: FormData) => {
  try {
    const importFile = formData.get("import-file") as File;

    if (importFile.size === 0) {
      throw new Error("Champ obligatoire");
    }

    const text = await importFile.text();
    const rows = text.split("\n");

    const headers = rows[0].split(",");

    const data = rows.slice(1).map((row) => {
      const values = row.split(",");
      return Object.fromEntries(
        headers.map((h, i) => [h.trim(), stripQuotes(values[i]?.trim())])
      );
    });

    const users = await getUsers();

    if (!users.users) {
      throw new Error("Aucune donnée disponible");
    }

    // Version optimale (si beaucoup de données)
    // const userIds = new Set(users.users.map((u) => u.id));
    // const filteredData = data.filter((d) => !userIds.has(d.id));

    const filteredData = (data as User[])
      .filter((datum) => !users.users.some((user) => user.id === datum.id))
      .map((u) => ({
        id: u.id,
        firstname: u.firstname,
        lastname: u.lastname,
        email: u.email,
        password: u.password,
        role: u.role,
        createdAt: new Date(u.createdAt),
        updatedAt: new Date(u.updatedAt),
      }));

    if (filteredData.length === 0) {
      throw new Error(
        "Toutes les données existent déja dans la base de donnée"
      );
    }

    await prisma.user.createMany({
      data: filteredData,
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Utilisateurs importés",
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

export { createUser, createImportUser };
