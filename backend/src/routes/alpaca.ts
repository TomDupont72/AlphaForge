import { updateUserSecrets } from "@/db/alpaca.db.js";
import { AlpacaUpdateSecretsData, AlpacaUpdateSecretsSchema } from "@/modules/alpaca.schemas.js";
import { decrypt, encrypt } from "@/utils/encryption.js";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function alpacaRoutes(fastify: FastifyInstance) {
    fastify.get("/account",
        { preHandler: [fastify.requireAuth] },
        async(request: FastifyRequest) => {
            const res = await fetch("https://paper-api.alpaca.markets/v2/account", {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "APCA-API-KEY-ID": decrypt(request.user.keyId),
                    "APCA-API-SECRET-KEY": decrypt(request.user.secretId)
                }
            });

            return res.json();
    })
    
    fastify.patch("/update-secrets", { preHandler: [fastify.requireAuth] }, async (request: FastifyRequest, reply: FastifyReply) => {
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