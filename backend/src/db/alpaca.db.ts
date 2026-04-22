import { prisma } from "./prisma.js";

export async function updateUserSecrets(id: string, keyId: string, secretId: string) {
    return prisma.user.update({
        where: { id },
        data: { keyId, secretId }
    });
}