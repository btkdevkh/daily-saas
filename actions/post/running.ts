"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, Running } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getConnectedUser } from "../auth/user";
import { PrevState } from "@/types/PrevState";
import { stripQuotes } from "@/utils/utils";
import { getRunnings } from "../get/running";

const createRunning = async (prevState: PrevState, formData: FormData) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const mode = formData.get("mode") as string;
    const kilometers = formData.get("kilometers") as string;
    const durations = formData.get("durations") as string;
    const calories = formData.get("calories") as string;
    const date = formData.get("date") as string;

    if (!mode || !kilometers || !durations || !calories || !date) {
      throw new Error("Champs obligatoires");
    }

    await prisma.running.create({
      data: {
        mode,
        kilometers: new Prisma.Decimal(Number(kilometers)),
        durations: durations,
        calories: new Prisma.Decimal(Number(calories)),
        date,
        userId: user.id,
      },
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Running crée",
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

const createImportRunning = async (
  prevState: PrevState,
  formData: FormData
) => {
  try {
    const { user } = await getConnectedUser();

    if (!user) {
      throw new Error("Identification inconnu");
    }

    const importFile = formData.get("import-file") as File;

    if (importFile.size === 0) {
      throw new Error("Champ obligatoire");
    }

    const text = await importFile.text();
    const rows = text.split("\n");
    const headers = rows[0].split(",");

    const dataCSV = rows.slice(1).map((row) => {
      const values = row.split(",");
      return Object.fromEntries(
        headers.map((h, i) => [h.trim(), stripQuotes(values[i]?.trim())])
      );
    });

    const data = await getRunnings();

    const filteredData = (dataCSV as Running[])
      .filter(
        (datum) => !data.runnings?.some((running) => running.id === datum.id)
      )
      .map((r) => ({
        id: r.id,
        mode: r.mode,
        kilometers: new Prisma.Decimal(Number(r.kilometers)),
        durations: r.durations,
        calories: new Prisma.Decimal(Number(r.calories)),
        createdAt: new Date(r.createdAt),
        date: r.date,
        userId: r.userId,
      }));

    if (filteredData.length === 0) {
      throw new Error(
        "Toutes les données existent déja dans la base de donnée"
      );
    }

    await prisma.running.createMany({
      data: filteredData,
    });

    revalidatePath("/");

    return {
      ...prevState,
      success: true,
      message: "Activités importées",
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

export { createRunning, createImportRunning };
