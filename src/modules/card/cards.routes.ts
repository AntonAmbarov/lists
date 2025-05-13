import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { cardSchema } from "./types/cards.schema";
import ICardService from './types/cards.service.interface';

export const cardRoutes = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    app.get('/cards', {
        schema: cardSchema
    }, async (req, reply) => {
        const service: ICardService = app.diContainer.resolve('cardService');
        const data = service.getCards();
        app.log.info(data);
        reply.send(data);
    })
}