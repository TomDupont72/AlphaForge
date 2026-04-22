import { z } from "zod";

const AlpacaSchema = z.object({
    keyId: z.string().trim().min(1, "La clé ne doit pas être vide."),
    secretId: z.string().trim().min(1, "La clé ne doit pas être vide.")
})

export const AlpacaUpdateSecretsSchema = AlpacaSchema.pick({
    keyId: true,
    secretId: true
})

export type AlpacaUpdateSecretsData = z.infer<typeof AlpacaUpdateSecretsSchema>