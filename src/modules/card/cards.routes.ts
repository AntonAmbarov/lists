import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { cardSchema } from "./types/cards.schema";
import { ICardService } from './types/cards.service.interface';
import { ICard } from "./types/card.dto";

export const cardRoutes = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
    app.get('/cards', {
        schema: cardSchema
    }, async (req, reply) => {
        const service: ICardService = app.diContainer.resolve('cardService');
        const data: Array<ICard> = service.getCards();

        reply.status(200).send(data);
    })
}