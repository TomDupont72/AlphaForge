import { updateUserSecrets } from "@/db/alpaca.db.js";
import { AlpacaUpdateSecretsData, AlpacaUpdateSecretsSchema } from "@/modules/alpaca.schemas.js";
import { encrypt } from "@/utils/encryption.js";
import type { FastifyInstance } from "fastify";

export async function alpacaRoutes(fastify: FastifyInstance) {
    fastify.get("/account", async() => {
        const res = await fetch("https://paper-api.alpaca.markets/v2/account", {
            method: "GET",
            headers: {
                accept: "application/json",
                "APCA-API-KEY-ID": process.env.ALPACA_CLIENT_ID,
                "APCA-API-SECRET-KEY": process.env.ALPACA_CLIENT_SECRET
            }
        });

        return res.json();
    })
    
    fastify.patch("/update-secrets", { preHandler: [fastify.requireAuth] }, async (request, reply) => {
        const body = request.body as AlpacaUpdateSecretsData 
        const userId = request.user.id

        const formData = {
            keyId: body.keyId,
            secretId: body.secretId
        }

        const result = AlpacaUpdateSecretsSchema.safeParse(formData);

        if(!result.success) {
            return reply.status(400).send({
                error: "Clés invalides",
                details: result.error.issues
            })
        }

        const data = await updateUserSecrets(
            userId,
            encrypt(result.data.keyId),
            encrypt(result.data.secretId)
        )

        return reply.send({ data });
    })
}