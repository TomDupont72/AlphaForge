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
}

