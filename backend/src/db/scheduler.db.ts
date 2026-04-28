import { decrypt } from "@/utils/encryption.js";
import { prisma } from "./prisma.js";
import { getDay } from "@/utils/date.js";

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
    },
  });
}

export async function getUsersByIds(ids: string[]) {
  return await prisma.user.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      keyId: true,
      secretId: true,
    },
  });
}

export async function getAlpacaAccount(keyId: string, secretId: string) {
  const res = await fetch("https://paper-api.alpaca.markets/v2/account", {
    method: "GET",
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": decrypt(keyId),
      "APCA-API-SECRET-KEY": decrypt(secretId),
    },
  });

  return res.json();
}

export async function putUserDataById(id: string, portfolioValue: number) {
  await prisma.snapshot.upsert({
    where: {
      userId_createdAt: {
        userId: id,
        createdAt: getDay(new Date()),
      },
    },
    update: { portfolioValue: portfolioValue },
    create: {
      userId: id,
      portfolioValue: portfolioValue,
      createdAt: getDay(new Date()),
    },
  });
}
