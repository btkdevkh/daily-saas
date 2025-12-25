"use server";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getConnectedUser } from "../auth/user";
import { PrevState } from "@/types/PrevState";
import { stripQuotes } from "@/utils/utils";
import { getPasswords } from "../get/password";
import { Password } from "@prisma/client";

const createPassword = async (prevState: PrevState, formData: FormData) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const sites = formData.get("sites") as string;
    const note = formData.get("note") as string;

    if (!username || !password || !sites) {
      throw new Error("Champs obligatoires");
    }

    if (password.length < 8) {
      throw new Error("Le mot de passe doit avoir 8 caratères minimum");
    }

    const encrypted = encrypt(password);

    await prisma.password.create({
      data: {
        username,
        password: encrypted,
        sites: [sites],
        note,
        userId: user.id,
      },
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Mot de passe crée avec success",
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

const createImportPassword = async (
  prevState: PrevState,
  formData: FormData
) => {
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

    const response = await getPasswords();

    if (!response.passwords) {
      throw new Error("Aucune donnée disponible");
    }

    // Version optimale (si beaucoup de données)
    // const userIds = new Set(users.users.map((u) => u.id));
    // const filteredData = data.filter((d) => !userIds.has(d.id));

    const filteredData = (data as Password[])
      .filter((datum) => !response.passwords.some((pwd) => pwd.id === datum.id))
      .map((pwd) => ({
        id: pwd.id,
        username: pwd.username,
        password: encrypt(pwd.password),
        sites: [pwd.sites.toString()],
        note: pwd.note,
        userId: pwd.userId,
        createdAt: new Date(pwd.createdAt),
      })) as Password[];

    if (filteredData.length === 0) {
      throw new Error(
        "Toutes les données existent déja dans la base de donnée"
      );
    }

    await prisma.password.createMany({
      data: filteredData,
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Mot de passe importés",
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

export { createPassword, createImportPassword };

// Helpers
// Clé maître depuis .env
const MASTER_KEY = crypto
  .createHash("sha256")
  .update(process.env.NEXT_PUBLIC_MASTER_KEY!)
  .digest();

// Fonction de chiffrement AES-GCM
function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", MASTER_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return JSON.stringify({
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    data: encrypted.toString("base64"),
  });
}

// Fonction de déchiffrement
function decrypt(jsonEncrypted: string) {
  const obj = JSON.parse(jsonEncrypted);
  const iv = Buffer.from(obj.iv, "base64");
  const tag = Buffer.from(obj.tag, "base64");
  const encryptedData = Buffer.from(obj.data, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", MASTER_KEY, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
