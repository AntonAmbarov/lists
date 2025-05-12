import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { cardsSchema } from "./types/cards.schema";
import { UserServices } from "./cards.service";

export const cardRoutes = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    app.get('/cards', {
        schema: cardsSchema
    }, async (req, reply) => {
        const service = new UserServices()
        const data = service.getCards();
        app.log.info(data);
        reply.send(data);
    })
}