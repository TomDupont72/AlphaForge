import { getAllUsers } from "@/db/scheduler.db.js";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/get-all-users",
    { preHandler: [] },
    async function (request: FastifyRequest, reply: FastifyReply) {
      const data = await getAllUsers();

      return reply.send({ data });
    },
  );
}
