import "dotenv/config"
import Fastify from "fastify"
import fastifyCors from "@fastify/cors"
import { authRoutes } from "./routes/auth.js"
import { alpacaRoutes } from "./routes/alpaca.js"

const app = Fastify({
  logger: true,
})

app.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
})

app.get("/health", async () => {
  return { status: "ok" }
})

await app.register(authRoutes, { prefix: "/api/auth" });

await app.register(alpacaRoutes, { prefix: "/api/alpaca"})

await app.listen({
  port: Number(process.env.PORT ?? 8001),
  host: process.env.HOST ?? "0.0.0.0",
})